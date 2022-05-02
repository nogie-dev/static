var express = require('express');
const app = require('../app');
var router = express.Router();

// const account=require('./account.js')
// const user=require('./users.js')

//app.use(express.static(__dirname, "../public"));

// default
// router.use('/account',account);
// router.use('/users',user);

// router.all('/',(req,res)=>{
//     res.json({
//         "status":res.statusCode,
//         "msg":"welcometo crud api server"
//     })
// })

router.get('/',(req,res)=>{
    console.log(req.query)
    res.render('main',req.query)
})

module.exports = router;