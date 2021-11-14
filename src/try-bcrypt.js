var bcrypt = require('bcryptjs');


// hash() 產生很多個編碼 幫123456 編碼
bcrypt.hash('123456', 8, (err, hash)=>console.log(hash) );

// 比對  這個編碼是不是123456
const  hash = '$2a$08$JUsiyT5BoM3qPRPBPnTWyOfXFR/h7mJ3H4ibgMAdY3F9uT4ar6KJy';  // 挑其中一個
bcrypt.compare('123456', hash, function(err, res) {
    // res === true
    console.log(res)
});