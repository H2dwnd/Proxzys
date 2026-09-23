const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function setupDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS project_stats (
      project_id TEXT PRIMARY KEY,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS user_likes (
      user_id INTEGER,
      project_id TEXT,
      PRIMARY KEY (user_id, project_id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT,
      category TEXT,
      description TEXT,
      tech TEXT,
      revenueData TEXT,
      image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id TEXT,
      user_id INTEGER,
      text TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  console.log('Database setup complete.');
  return db;
}

module.exports = { setupDatabase };

