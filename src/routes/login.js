const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();
const bcrypt = require('bcryptjs');





// ===========================================
// 修改個人資料
// ===========================================

router.get('/set', async (req, res)=>{

    const sql = `SELECT * FROM admins WHERE sid = ${req.session.orders.sid} `;
    const [rs] = await db.query(sql);                  
    const firstname = rs[0].firstname
    const lastname = rs[0].lastname
    const email = rs[0].account
    // const password = rs[0].password_hash
    const password = req.session.orders.password;         // 顯示user 密碼  不要用hash 
    const year = rs[0].birth_year
    const month = rs[0].birth_month
    const day = rs[0].birth_day
    const address = rs[0].address

    res.render('set', {
        firstname,
        lastname,
        email,
        password,
        year,
        month,
        day,
        address
    });                                            // rs 資料庫data輸出給前端 products.env
});


router.post('/set', async (req, res)=>{
    const output = {
        success: false,
        postData: req.body,                        // 丟回 client 以方便除錯
        error: '',
        code: 0,
    };

    const sql_user = `SELECT * FROM admins WHERE sid = ${req.session.orders.sid} `;
    const [user] = await db.query(sql_user);                  // 取得資料 宣告rs
    const firstname_user = user[0].firstname;
    const lastname_user = user[0].lastname;
    const email_user = user[0].account;
    const password_user = user[0].password_hash;
    const year_user = user[0].birth_year;
    const month_user = user[0].birth_month;
    const day_user = user[0].birth_day;
    const address_user = user[0].address;
    const sid = user[0].sid

    let {firstname , lastname , email , password , birth_year, birth_month,birth_day, address } = req.body;
    const hash = await bcrypt.hash(password, 8);
    
    if(password.length <= 5){
        output.error = '密碼需要超過五個數字';
        return res.json(output);
    }

    const sql_adr = `UPDATE \`admins\` SET \`firstname\` = ?, \`lastname\` = ?, \`account\` = ?, \`password_hash\` = ?, \`birth_year\` = ?, \`birth_month\` = ?, \`birth_day\` = ?, \`address\` = ? WHERE \`admins\`.\`sid\` = ?`;
    // const [result] = await db.query(sql_adr, [address,sid]);
    const [result] = await db.query(sql_adr, [firstname , lastname , email , hash , birth_year, birth_month,birth_day, address,sid]);
    
    output.result = result;
    if(result.affectedRows){
        output.success = true;
    }
    res.json( output );           
     });
        

// ===========================================
// login 接收form  & 顯示/login
// ===========================================

router.get('/login', (req, res)   =>{
    res.locals.title = 'Home - ' + res.locals.title;
    res.render('login', {name: 'Shinder'});
});

router.post('/login', async (req, res)=>{
    const output = {                                            // 定義輸出要有的資訊
        success: false,
        error: '',
        postData: req.body,
    };

    // =================防呆沒做完
    // if(!req.body.account || !req.body.password){            // 如果客戶端沒有帳號或密碼
    //     output.error = '欄位資料不足';
    //     return res.json(output);                            //回應json  output success false
    // }
    // =================防呆沒做完

    const sql = "SELECT * FROM admins WHERE account=?";        // sql 指令空出account
    const [rs] = await db.query(sql, [req.body.email]);        // 拿到客戶端給的email 丟給sql

    if(!rs.length){
        output.error = '帳號錯誤';
        return res.json(output);
    }

    const result = await bcrypt.compare(req.body.password, rs[0].password_hash);
    if(result){
        req.session.orders = {
            sid: rs[0].sid,
            email: rs[0].account,
            firstname: rs[0].firstname,
            lastname: rs[0].lastname,
            password: req.body.password
        };
        output.success = true;
    } else {
        output.error = '密碼錯誤';
    }
    res.json(output);
});


module.exports = router;