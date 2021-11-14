// 新增帳戶進資料庫

const bcrypt = require('bcryptjs');
const db = require(__dirname + '/db_connect2');

(async ()=>{               // async 宣告非同步處理
    const sql = "INSERT INTO `admins`(`account`, `password_hash`, `nickname`) VALUES (?, ?, ?)";

    const hash = await bcrypt.hash('123456', 8);

    const [result] = await db.query(sql, ['shin', hash, '小新']);
    console.log(result);
})().catch(error=>{
    console.log(error);
});
