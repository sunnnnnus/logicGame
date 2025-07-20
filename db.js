const mysql = require('mysql2');
//require('dotenv').config();

console.log("🚧 資料庫連線資訊：", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "（有填）" : "（未填）",
  database: process.env.DB_NAME
});


const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // 加這行
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.getConnection((err, connection) => {
  if (err) {
    console.error('連線失敗：', err);
  } else {
    console.log('連線成功！');
    connection.release();
  }
});

module.exports = db;
