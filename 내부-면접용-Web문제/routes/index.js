var express = require('express');
const app = require('../app');
var router = express.Router();

router.get('/',(req,res)=>{
    console.log(req.session.user)
    if(!req.session.user){
        res.render('main',{isLogin:false})
    }else{
        res.render('main',{isLogin:true})
    }
})

// router.post('/login',(req.res)=>{

// })

module.exports = router;