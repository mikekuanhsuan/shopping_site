const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();


// ===========================================
// 接收到前端路由 /products 給出 render products env
// ===========================================

router.get('/sp01', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/sp01', {rs});                    // rs 資料庫data輸出給前端 products.env
});

router.get('/jp02', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/jp02', {rs});                    // rs 資料庫data輸出給前端 products.env
});

router.get('/pk03', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/pk03', {rs});                    // rs 資料庫data輸出給前端 products.env
});

router.get('/od04', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/od04', {rs});                    // rs 資料庫data輸出給前端 products.env
});

router.get('/hp05', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/hp05', {rs});                    // rs 資料庫data輸出給前端 products.env
});

router.get('/cl06', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/cl06', {rs});                    // rs 資料庫data輸出給前端 products.env
});

router.get('/rs07', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/rs07', {rs});                    // rs 資料庫data輸出給前端 products.env
});

router.get('/ev08', async (req, res)=>{
    const sql = "SELECT * FROM products";              // 讀取資料庫products
    const [rs] = await db.query(sql);                  // 取得資料 宣告rs
    res.render('class/ev08', {rs});                    // rs 資料庫data輸出給前端 products.env
});


module.exports = router;