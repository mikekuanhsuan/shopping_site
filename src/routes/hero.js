const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();




// ===========================================
// 接收到前端路由 /products 給出 render products env
// ===========================================

router.get('/PK030004', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/PK030004', {rs});                      // rs 資料庫data輸出給前端 products.env
});



router.get('/CL060004', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/CL060004', {rs});                      // rs 資料庫data輸出給前端 products.env
});

router.get('/SP010003', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/SP010003', {rs});                      // rs 資料庫data輸出給前端 products.env
});


router.get('/PK030001', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('products/PK030001', {rs});                      // rs 資料庫data輸出給前端 products.env
});

module.exports = router;