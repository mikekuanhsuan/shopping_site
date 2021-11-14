const express = require('express');
const session = require('express-session');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();

// ===========================================
// 接收到前端路由/cart ; render env 並  req.session.cart
// ===========================================

router.get('/cart', async (req, res)=> {
    if(! req.session.cart) {                               // 在/products 加入購物車時獲取session
        req.session.cart = [];
    }
    // res.json(req.session.cart);
    res.render('cart', {cart: req.session.cart});         // session 紀錄的 丟給/cart
    // res.json( {cart: req.session.cart});  
});


// ===========================================
// 刪除不要的項目
// ===========================================

router.get('/cart/delete/:id', (req, res)=>{
    if(! req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart = req.session.cart.filter(el=>el.sid!=req.params.id);

    const output = {
        cart: req.session.cart,
        success: true,
    };
    // res.json(output);
    res.redirect('/cart');
});


// ===========================================
// 確定購買
// ===========================================

router.post('/order', async (req, res)=>{
    const output = {
        success: false,
        postData: req.body,                                 // 丟回 client 以方便除錯
        error: '',
        code: 0,
    };
    let total = 0;


    req.session.cart.forEach(el=>{
        total += el.quantity*el.price;
    });

    req.session.cart.forEach(el=>{
        ssid = el.sid;
    });

    if(!req.session.orders ){                               // 如果客戶端沒有帳號或密碼
        output.error = '帳戶未登入';
        return res.json(output);                            // 回應json  output success false
    }
    
    // 添加至資料庫orders
    const orders = `INSERT INTO \`orders\`(\`member_sid\`, \`amount\`, \`order_date\`) VALUES ( ?,?,NOW())`;
 
    const [result] = await db.query(orders, [ 
        req.session.orders.sid,
        total
        ]);

    // 添加至資料庫 order_details  每筆訂單購買細項
    const order_details = `INSERT INTO \`order_details\`( \`order_sid\`, \`product_sid\`, \`price\`, \`quantity\`) VALUES (?,?,?,?)`;
    
   
    for (let c of req.session.cart){
        await db.query(order_details, [ 
        result.insertId,
        c.sid,
        c.price,
        c.quantity
        ]);
    }
   
    req.session.cart = [];

    output.result = req.session.cart;
    if(req.session.cart=[]){
        output.success = true;
    }
    res.json(output);
});

// =========== END =================
module.exports = router;