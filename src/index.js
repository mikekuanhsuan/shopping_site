require('dotenv').config();
const express = require('express');
const session = require('express-session');          //session 模組
const moment = require('moment-timezone');           // moment-timezone 模組
const app = express();                               // 建立伺服器個體
const bcrypt = require('bcryptjs');                  // 加密
const db = require(__dirname + '/db_connect');       // mysql資料庫 模組




// ===========================================
// ejs樣版引擎
// ===========================================

app.set('view engine', 'ejs');                       // 指定樣版引擎   // app.set('views', __dirname + '/../views');        // 指定樣版檔案的資料夾
app.use(require('cors')());                          // 跨來源資源共用 Ajax

// ===========================================
// .use()定義框架處理器(middleware)
// ===========================================

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.use(express.static('public'));
app.use(express.static(__dirname+'/../public'));     // 須放在所有路由設定的前面  伺服器可以直接讀public內的html

app.use(session({                                    // -----網站客戶的識別證 session
    saveUninitialized: false,                        // -----還沒有資料時，要不要存?
    resave: false,                                   // -----沒有變更，要不要存?
    secret: 'ksdfhkjdfsdigdogipog495734905',
    cookie: {
        maxAge: 1200000                              // -----存活時間20分鐘  毫秒+000
    }
}));

// ===========================================
// 自訂的全域 middleware
// ===========================================

app.use((req, res, next)=>{                           
    res.locals.title = '小新的網站';
    res.locals.dateToDateString = d => moment(d).format('YYYY-MM-DD');
    // res.locals.dateToDateTimeString = d => moment(d).format('YYYY-MM-DD hh:mm:ss');
    res.locals.dateToDateTimeString = function (d) {
        return moment(d).format('YYYY-MM-DD hh:mm:ss');
    };
    res.locals.session = req.session;
    next();
});

// ===========================================
// 路由模組化
// ===========================================

app.use(require(__dirname + '/routes/products') );      // -----所有產品
app.use(require(__dirname + '/routes/signup') );        // -----加入會員
app.use(require(__dirname + '/routes/hero') );          // -----英雄刊板
app.use(require(__dirname + '/routes/class') );         // -----細項分類
app.use(require(__dirname + '/routes/cart') );          // -----購物車
app.use(require(__dirname + '/routes/login') );         // -----登入

// 定義路由 routes


// ===========================================
// 根目錄index
// ===========================================

app.get('/', async (req, res)=>{
  
    const sql = "SELECT * FROM products";             // 讀取資料庫products
    const [rs] = await db.query(sql);                 // 取得資料 宣告rs
    
    res.render( 'index',  {rs});                      // rs 資料庫data輸出給前端 products.env
    // res.json({rs});                                // 用json 看看 rs 有什麼
    
});

// ===========================================
// 使用者頁面
// ===========================================

app.get('/mypage', async (req, res)   =>{
    const sql = "SELECT * FROM orders";                      // 讀取資料庫products
    const sql2 = "SELECT * FROM order_details";              // 讀取資料庫products
    const sql3 = "SELECT * FROM products";                   // 讀取資料庫products
    const [orders_sql] = await db.query(sql);                // 取得資料 宣告rs
    const [order_details_sql] = await db.query(sql2);        // 取得資料 宣告rs
    const [products_sql] = await db.query(sql3);             // 取得資料 宣告rs

    // ======= 檢查
    // res.locals.title = 'Home - ' + res.locals.title;
    // res.render('mypage', {rs , session_sid }); 

    res.render('mypage', {orders: req.session.orders  ,cart: req.session.cart ,orders_sql ,order_details_sql,products_sql} );                   // session 紀錄的 丟給/cart
    // res.json( {orders: req.session.orders  ,cart: req.session.cart ,orders_sql ,order_details_sql,products_sql} ); 

});


// ===========================================
// 登出  用delete 刪除 session.admin
// ===========================================

app.get('/logout', (req, res)=>{
    delete req.session.orders;
    res.redirect('/');
});

// ===========================================
// 小工具  測試 session 模擬
// ===========================================

app.get('/try-session', (req, res)=>{
    req.session.my_var = req.session.my_var || 0;              //如果原本沒有參數，預設0
    req.session.my_var++;
    res.json({
        my_var: req.session.my_var,
        session: req.session
    });
});

// ===========================================
// 小工具  moment模組調整format  格式"2021-08-19 08:47:46"
// ===========================================

app.get('/try-moment', (req, res)=>{
    const now = new Date();
    const t1 = req.session.cookie.expires;
    const fm = 'YYYY-MM-DD hh:mm:ss';
    res.json({
        now: moment(now).format(fm),
        t1: moment(t1).format(fm),
        now2: moment().tz('Europe/London').format(fm),
    })
});

// ===========================================
// 404 處理要放在 路由定義的最後面
// ===========================================

app.use((req, res)=>{
    res.type('text/html').status(404).send(`
    <link rel="stylesheet" href="/fontawesome/css/all.css">
    <h1>404   <i class="fab fa-expeditedssl"></i> 維修,敬請期待</h1>
    `);
});
// console.log('3:', process.env.PORT);     
const port = process.env.PORT || 3000;
// console.log('4:', port);
app.listen(port, ()=>{
    console.log('Web Server 啟動: ' + port);
});