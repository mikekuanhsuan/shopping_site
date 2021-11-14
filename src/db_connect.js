require('dotenv').config();
const mysql = require('mysql2')


// ===========================================
// 連線模組 -資料庫連線
// ===========================================

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',    //主機
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,                    // waitForConnections 沒有連線時做一個等待
    connectionLimit: 10,                         // 允許幾個連線
    queueLimit: 0                                // 排隊連線   0為無限制
});

module.exports =pool.promise()                   // 匯出promise 包裝的連線module




