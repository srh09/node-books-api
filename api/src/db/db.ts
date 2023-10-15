import sqlite from 'better-sqlite3';

const db = sqlite('./src/db/storage.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      isbn TEXT,
      name TEXT,
      text TEXT
    )
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      isbn TEXT,
      name TEXT,
      rating INTEGER
    )
  `);

export default db;
