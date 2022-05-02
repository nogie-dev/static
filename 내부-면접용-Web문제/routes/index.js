var express = require('express');
const app = require('../app');
var router = express.Router();

router.get('/',(req,res)=>{
    const sessionJudge=false
    if(!req.session.user){
        //console.log(req.session.user)
        //console.log(JSON.stringify(sessionJudge))
        res.render('main',{isLogin:sessionJudge})
    }else{
        sessionJudge=true
        JSON.stringify(sessionJudge)
        res.render('main',{isLogin:sessionJudge})
    }
})

// router.post('/login',(req.res)=>{

// })

module.exports = router;