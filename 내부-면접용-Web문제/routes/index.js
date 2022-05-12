var express = require('express');
const query=require('../db/mysql_query')
const app = require('../app');
const { adminCheck } = require('../db/mysql_query');
var router = express.Router();

router.get('/',(req,res)=>{
    //console.log(req.session.user)
    if(!req.session.user){
        res.render('main',{isLogin:false})
    }else{
       let adminCheck = query.adminCheck(req.session.user.id).then((adminCheck)=>{
            res.render('main',{
                isLogin:true,
                isAdmin:adminCheck['is_admin'],
                username:req.session.user.id
            })
        })
    }
})

// router.post('/login',(req.res)=>{

// })

module.exports = router;