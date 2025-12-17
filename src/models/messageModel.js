import { db } from '../config/db.js';

export const createMessage = (chatId, userId, content, type = 'text', fileUrl = null) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO messages (chat_id, user_id, content, type, file_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [chatId, userId, content, type, fileUrl], function (err) {
      if (err) reject(err);
      else {
        // Возвращаем созданное сообщение сразу с данными автора (для отображения)
        const newMsgId = this.lastID;
        db.get(
          `SELECT m.*, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.id = ?`, 
          [newMsgId], 
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          }
        );
      }
    });
  });
};