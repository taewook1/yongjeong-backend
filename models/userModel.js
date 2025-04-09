const db = require("../config/database");

const User = {
  // 회원 등록
  create: (name, username, birth, phone, email, hashedPassword, callback) => {
    const sql = `
      INSERT INTO users (name, username, birth, phone, email, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [name, username, birth, phone, email, hashedPassword];
    db.query(sql, values, callback);
  },

  // 이메일로 조회 (중복 확인 및 로그인용)
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  // username으로 조회 (아이디 중복확인용)
  findByUsername: (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], callback);
  }
};

module.exports = User;
