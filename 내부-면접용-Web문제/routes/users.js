var express = require('express');
const query=require('../db/mysql_query')
var router = express.Router();

router.post('/register', (req, res, next)=>{
  let {id,password,nickname}=req.body

  query.userRegister(id,password,nickname)
  .then((queryRes)=>{
    res.json(queryRes)
  })
});

router.post('/login', (req, res, next)=>{
  let {id,password}=req.body

  if(req.session.user){
    res.json({"status":"tmp","msg":"already exist your session"})
  }else{
    query.userLogin(id,password)
    .then((queryRes)=>{
      if(queryRes==true){ 
        //로그인 성공 시

        req.session.user={
          id:id,
          authorized:true
        }
        //res.json({'loginResult':queryRes})
        res.json({"status":"tmp","msg":"success login"})
      }else{ 
        //로그인 실패 시
        
        //res.json({'loginResult':queryRes})
        res.json({"status":"tmp","msg":"failed logout"})
      }
    })
  }
});

router.get('/logout', (req, res, next)=>{
  req.session.destroy(function(err){
    if(err) throw err
  })
  res.json({"status":"tmp","msg":"success logout"})
})

module.exports = router;
