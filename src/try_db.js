
const mysql = require('mysql2')
// 連線模組 -資料庫連線
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aa99405Mike012@',
    database: 'proj57',
});

//call back 有3個參數 error results fields
connection.query('SELECT * FROM address_book LIMIT 5',
    (error, results, fields)=>{
    if(error){
        console.log('錯誤拉',error);
    } else {
        console.log(results);
        }
    });

