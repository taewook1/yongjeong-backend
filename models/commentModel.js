const db = require('../config/database');

const Comment = {
  getByPostId: async (postId) => {
    const [rows] = await db.query('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC', [postId]);
    return rows;
  },

  create: async (postId, author, content) => {
    const [result] = await db.query('INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)', [postId, author, content]);
    return result.insertId;
  },

  delete: async (commentId) => {
    const [result] = await db.query('DELETE FROM comments WHERE id = ?', [commentId]);
    return result;
  }
};

module.exports = Comment;