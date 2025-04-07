const db = require('../config/database');

const Post = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // 단일 게시글 리턴
      });
    });
  },

  create: (title, content, author) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
        [title, content, author],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  update: (id, title, content, author) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?',
        [title, content, id, author],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  delete: (id, author) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM posts WHERE id = ? AND user_id = ?',
        [id, author],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
};

module.exports = Post;