const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const bcrypt = require('bcryptjs');
const router = express.Router();



// ===========================================
// 接收到前端路由 /products 給出 render products env
// ===========================================

router.get('/signup', async (req, res)=>{
    res.render('signup');                      // rs 資料庫data輸出給前端 products.env
});


// ===========================================
// 收到前端路由 /register 表單送出 ，拿到資料後建資料庫 
// ===========================================

router.post('/signup', async (req, res)=>{
    const output = {
        success: false,
        postData: req.body,   // 丟回 client 以方便除錯
        error: '',
        code: 0,
    };
    let {firstname , lastname , email , password , birth_year, birth_month,birth_day, address } = req.body;
    if(password.length <= 5){
        output.error = '密碼需要超過五個數字';
        // return res.json(output);
        return res.json(output);
    }

    const hash = await bcrypt.hash(password, 8);
    
    const sql = `INSERT INTO \`admins\` 
                (\`firstname\`,\`lastname\`,\`account\`,\`password_hash\`,\`birth_year\`,\`birth_month\`,\`birth_day\` ,\`address\`,\`create_at\`)
                 VALUES (?, ?, ?, ?, ?,?, ?, ?, NOW())`;

    const [result] = await db.query(sql, [firstname , lastname , email , hash , birth_year , birth_month , birth_day , address ]);

    output.result = result;
    if(result.affectedRows){
        output.success = true;
    }
    res.json(output);
});

module.exports = router;

