require('dotenv').config();
const mysql = require('mysql2');

// console.log("🚧 資料庫連線資訊：", {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD ? "（有填）" : "（未填）",
//   database: process.env.DB_NAME
// });

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });


// db.getConnection((err, connection) => {
//   if (err) {
//     console.error('連線失敗：', err);
//   } else {
//     console.log('連線成功！');
//     connection.release();
//   }
// });

// module.exports = db;

const db = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
// const connection = mysql.createConnection({
//   host: process.env.MYSQL_ADDON_HOST,
//   user: process.env.MYSQL_ADDON_USER,
//   password: process.env.MYSQL_ADDON_PASSWORD,
//   database: process.env.MYSQL_ADDON_DB,
//   port: 3306
// });

connection.connect((err) => {
  if (err) {
    console.error('連線失敗：', err);
    return;
  }
  console.log('成功連線');
});

//module.exports = connection;