const db = require('../config/database');

// 공지사항 관련 DB 처리 로직
const Notice = {
  // 전체 공지사항 불러오기
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM notices ORDER BY created_at DESC', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // 🔥 최근 공지사항 limit개 불러오기 (메인 페이지용)
  getLatest: (limit = 4) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM notices ORDER BY created_at DESC LIMIT ?', [limit], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // 공지사항 등록
  create: (title, content) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO notices (title, content) VALUES (?, ?)',
        [title, content],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
};

module.exports = Notice;