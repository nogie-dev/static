var express = require('express');
const query=require('../db/mysql_query')
const app = require('../app');
var router = express.Router();

router.get('/',async(req,res)=>{
    console.log(req.session.user)
    if(!req.session.user){
        res.render('main',{isLogin:false})
    }else{
        res.render('main',{
            isLogin:true,
            isAdmin:await query.adminCheck(req.session.user.id)['is_admin'],
            username:req.session.user.id
        })
    }
})

// router.post('/login',(req.res)=>{

// })

module.exports = router;