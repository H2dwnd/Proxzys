const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { setupDatabase } = require('./database');

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const JWT_SECRET = 'super-secret-key-for-proxzy'; // In production, use process.env.JWT_SECRET

let db;

setupDatabase().then(database => {
  db = database;
  
  app.listen(3001, () => {
    console.log('Backend server running on http://localhost:3001');
  });
}).catch(err => {
  console.error('Failed to start database', err);
});

// Middleware to authenticate JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// 1. REGISTER
app.post('/api/register', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ error: 'Name and password required' });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.run(
      'INSERT INTO users (name, password) VALUES (?, ?)',
      [name, hashedPassword]
    );

    const token = jwt.sign({ id: result.lastID, name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.lastID, name } });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;
  
  try {
    const user = await db.get('SELECT * FROM users WHERE name = ?', [name]);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. GET PROJECT STATS
app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    let stats = await db.get('SELECT * FROM project_stats WHERE project_id = ?', [id]);
    if (!stats) {
      await db.run('INSERT INTO project_stats (project_id, views, likes) VALUES (?, 0, 0)', [id]);
      stats = { project_id: id, views: 0, likes: 0 };
    }
    
    // Check if current user liked it
    let likedByMe = false;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      try {
        const verified = jwt.verify(token, JWT_SECRET);
        const like = await db.get('SELECT * FROM user_likes WHERE user_id = ? AND project_id = ?', [verified.id, id]);
        if (like) likedByMe = true;
      } catch (e) {
        // invalid token, just ignore
      }
    }

    res.json({ views: stats.views, likes: stats.likes, likedByMe });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. VIEW PROJECT
app.post('/api/projects/:id/view', async (req, res) => {
  const { id } = req.params;
  
  try {
    await db.run(`
      INSERT INTO project_stats (project_id, views, likes) 
      VALUES (?, 1, 0) 
      ON CONFLICT(project_id) 
      DO UPDATE SET views = views + 1
    `, [id]);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 5. LIKE PROJECT
app.post('/api/projects/:id/like', authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  try {
    // Check if already liked
    const existingLike = await db.get('SELECT * FROM user_likes WHERE user_id = ? AND project_id = ?', [userId, id]);
    
    if (existingLike) {
      // Unlike
      await db.run('DELETE FROM user_likes WHERE user_id = ? AND project_id = ?', [userId, id]);
      await db.run('UPDATE project_stats SET likes = likes - 1 WHERE project_id = ?', [id]);
      res.json({ liked: false });
    } else {
      // Like
      await db.run('INSERT INTO user_likes (user_id, project_id) VALUES (?, ?)', [userId, id]);
      await db.run(`
        INSERT INTO project_stats (project_id, views, likes) 
        VALUES (?, 0, 1) 
        ON CONFLICT(project_id) 
        DO UPDATE SET likes = likes + 1
      `, [id]);
      res.json({ liked: true });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ADMIN: GET DYNAMIC PROJECTS
app.get('/api/admin/projects', async (req, res) => { 
  try { 
    const projs = await db.all('SELECT * FROM projects'); 
    res.json(projs.map(p => ({
      ...p, 
      tech: JSON.parse(p.tech), 
      revenueData: JSON.parse(p.revenueData)
    }))); 
  } catch (error) { 
    res.status(500).json({ error: 'Server error' }); 
  } 
});  

// ADMIN: ADD PROJECT
app.post('/api/admin/projects', authenticate, upload.single('image'), async (req, res) => { 
  if (req.user.name !== 'ilyxasuper' && req.user.name !== 'Proxzy') return res.status(403).json({ error: 'Admin only' }); 
  
  const { id, title, category, description, tech, revenueData } = req.body; 
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  try { 
    await db.run('INSERT INTO projects (id, title, category, description, tech, revenueData, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [id, title, category, description, tech, revenueData, imageUrl]); 
    res.json({ success: true }); 
  } catch (error) { 
    res.status(500).json({ error: 'Server error' }); 
  } 
});  

// ADMIN: DELETE PROJECT
app.delete('/api/admin/projects/:id', authenticate, async (req, res) => { 
  if (req.user.name !== 'ilyxasuper' && req.user.name !== 'Proxzy') return res.status(403).json({ error: 'Admin only' }); 
  
  const { id } = req.params; 
  try { 
    const proj = await db.get('SELECT image_url FROM projects WHERE id = ?', [id]);
    if (proj && proj.image_url) {
      const filePath = path.join(__dirname, proj.image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.run('DELETE FROM projects WHERE id = ?', [id]); 
    res.json({ success: true }); 
  } catch (error) { 
    res.status(500).json({ error: 'Server error' }); 
  } 
});  

// GET COMMENTS
app.get('/api/projects/:id/comments', async (req, res) => { 
  const { id } = req.params; 
  try { 
    const comments = await db.all('SELECT c.id, c.text, c.created_at, u.name as user_name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.project_id = ? ORDER BY c.created_at DESC', [id]); 
    res.json(comments); 
  } catch (error) { 
    res.status(500).json({ error: 'Server error' }); 
  } 
});  

// ADD COMMENT
app.post('/api/projects/:id/comments', authenticate, async (req, res) => { 
  const { id } = req.params; 
  const { text } = req.body; 
  const userId = req.user.id; 
  if (!text) return res.status(400).json({ error: 'Text required' }); 
  try { 
    await db.run('INSERT INTO comments (project_id, user_id, text) VALUES (?, ?, ?)', [id, userId, text]); 
    res.json({ success: true }); 
  } catch (error) { 
    res.status(500).json({ error: 'Server error' }); 
  } 
});

// Serve React App
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
