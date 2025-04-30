const db = require('../config/database'); // mysql2/promise 기반 연결

const Post = {
  // 전체 조회
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
      return rows;
    } catch (err) {
      console.error('❗getAll 쿼리 실패:', err);
      throw err;
    }
  },

  // 단일 조회
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
      console.error('❗getById 쿼리 실패:', err);
      throw err;
    }
  },

  // 생성
  create: async (title, content, author) => {
    try {
      const [result] = await db.query(
        'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
        [title, content, author]
      );
      return result.insertId;
    } catch (err) {
      console.error('❗create 쿼리 실패:', err);
      throw err;
    }
  },

  // 수정
  update: async (id, title, content, author) => {
    try {
      const [result] = await db.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ? AND author = ?',
        [title, content, id, author]
      );
      return result;
    } catch (err) {
      console.error('❗update 쿼리 실패:', err);
      throw err;
    }
  },

  // 삭제
  delete: async (id, author) => {
    try {
      const [result] = await db.query(
        'DELETE FROM posts WHERE id = ? AND author = ?',
        [id, author]
      );
      return result;
    } catch (err) {
      console.error('❗delete 쿼리 실패:', err);
      throw err;
    }
  },
};

module.exports = Post;
