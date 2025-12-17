import { db } from '../config/db.js';

export const createChat = (name, creatorId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO chats (name, created_by) VALUES (?, ?)`;
    db.run(query, [name, creatorId], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, name, created_by: creatorId });
    });
  });
};

export const getAllChats = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM chats ORDER BY created_at DESC`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getChatMessages = (chatId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT m.*, u.username 
      FROM messages m 
      JOIN users u ON m.user_id = u.id 
      WHERE m.chat_id = ? 
      ORDER BY m.created_at ASC
    `;
    db.all(query, [chatId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};