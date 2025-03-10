const db = require("../config/database");

const User = {
  create: (name, email, hashedPassword, callback) => {
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      callback
    );
  },
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },
};

module.exports = User;
