const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function alterDb() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  try {
    await db.exec('ALTER TABLE projects ADD COLUMN image_url TEXT');
    console.log("Added image_url");
  } catch (e) {
    console.log("Column probably already exists", e.message);
  }
}

alterDb();

