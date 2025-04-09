const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;