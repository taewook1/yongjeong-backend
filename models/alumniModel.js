const db = require('../config/database');

// 동문 동정 관련 DB 처리 로직
const AlumniNews = {
  // 전체 동문 동정 목록 불러오기
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM alumni_news ORDER BY created_at DESC', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // 최근 4개의 동문 동정만 가져오기 (메인 페이지용)
  getLatest: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM alumni_news ORDER BY created_at DESC LIMIT 4', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // 새 동문 동정 작성
  create: (title, content, author) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO alumni_news (title, content, author) VALUES (?, ?, ?)', [title, content, author], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  }
};

module.exports = AlumniNews;