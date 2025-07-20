const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // 加這行
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.connect(err => {
  if (err) {
    console.error('連線失敗：', err);
  } else {
    console.log('連線成功！');
  }
});

module.exports = pool;
