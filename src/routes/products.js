const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();


router.get('/store', async (req, res)=>{
    // 每頁有幾筆
    const perPage = 6; 
    // 如果req.query.page沒有值.... req.query.page =  1 
    let page = req.query.page ? parseInt(req.query.page) : 1;
    // 算總筆數
    const [r1] = await db.query("SELECT COUNT(1) num FROM `products`");
    // 第一筆欄位名稱設num
    const totalRows = r1[0]['num'];            
    // return res.json({totalRows})                    //.....用json 偷看一下 totalRows

    // 算總頁數
    const totalPages = Math.ceil(totalRows/perPage);   //.....無條件進位
    // return res.json({totalRows,totalPages})         //.....用json 偷看一下 totalRows

    let rows = [];
    if(totalRows>0){         
        if(page<1){
            // page=1;
            return res.redirect('?page=1');           //..... total page 至少要1頁
        }
        if(page>totalPages) {
            // page=totalPages;
            return res.redirect('?page=' + totalPages);
        }
    const sql = `SELECT * FROM products ORDER BY sid DESC LIMIT ${(page-1)*perPage}, ${perPage} `;
    [rows] = await db.query(sql);
    }

    const sql = "SELECT * FROM products";              //..... 讀取資料庫products
    const [rs] = await db.query(sql);                  //..... 取得資料 宣告rs
    const next = page+1;
    const font = page-1;
    res.render('store', {
        totalRows,
        totalPages,
        perPage,
        page,
        rows,
        next,
        font,
        rs
    }) ;

});


// ===========================================
// 購物車項目新增: 接收到前端/cart/add的post
// ===========================================

router.post('/cart/add', async (req, res)=>{
    // 如果req.session.cart沒有值....設[]空值
    if(! req.session.cart) {
        req.session.cart = [];
    }
    
    // Output 參數 成功? 錯誤? 購物車有東西? 接收到的參數?
    const output = {
        success: false,
        error: '',
        code: 0,                            //..... 追踪程式走到哪
        cart: req.session.cart,
        postData: req.body,
    };

    // 接收到的primary key 還有數量qty
    const pk = req.body.pk;                 //..... primary key
    const qty = + req.body.qty;

    // 數量的防錯
    if(!qty || qty<1){
        output.error = '數量不能小於 1';
        output.code = 401;
        return res.json(output);
    }

    // 檢查是否已經有該項商品在購物車內
    const ar = req.session.cart.filter(el=> el.sid==pk );    //..... el.sid==pk  如果有就是true
    if(ar.length){
        output.success = true;
        output.code = 210;
        ar[0].quantity = qty;
        return res.json(output);
    }

    // 用primary key 去資料庫找看看有沒有這東西
    const sql = "SELECT * FROM products WHERE sid=?";
    const [rs] = await db.query(sql, [pk]);
    if(!rs.length){
        output.error = '沒有該項商品';
        return res.json(output);
    }
    const item = rs[0];
    item.quantity = qty;

    // 更新output
    req.session.cart.push(item);             // .....session 拿到加入的商品
    output.cart = req.session.cart;          
    output.success = true;
    output.code = 230;

    res.json(ar);
});


// ===========================================
// 檢查看一下購物車內的東東
// ===========================================

router.get('/cart-content', (req, res)=>{
    if(! req.session.cart) {
        req.session.cart = [];
    }
    const output = {
        cart: req.session.cart,
        success: true,
    };
    res.json(output);
});




// ===========================================
// 產品詳細內容
// ===========================================

router.get('/PK030005', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/PK030005', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/OD040004', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/OD040004', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/CL060005', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/CL060005', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/SP010005', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/SP010005', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/CL060006', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/CL060006', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/JP020004', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/JP020004', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/OD040005', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/OD040005', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/EV080005', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/EV080005', {rs});                      // rs 資料庫data輸出給前端 products.env
});

router.get('/EV080004', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/EV080004', {rs});                      // rs 資料庫data輸出給前端 products.env
});
router.get('/PK030006', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/PK030006', {rs});                      // rs 資料庫data輸出給前端 products.env
});



module.exports = router;