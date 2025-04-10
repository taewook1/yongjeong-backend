const db = require("../config/database");

const User = {
  // 회원 등록
  create: async (name, username, birth, phone, hashedPassword, generation) => {
    const sql = `
      INSERT INTO users (name, username, birth, phone, password, generation)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [name, username, birth, phone, hashedPassword, generation];
    const [result] = await db.query(sql, values);
    return result;
  },

  // username으로 조회 (아이디 중복확인용)
  findByUsername: async (username) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows;
  }
};

module.exports = User;
