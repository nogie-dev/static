var express = require('express');
const query=require('../db/mysql_query')
var router = express.Router();

router.get('/register',(req,res)=>{
  res.render('users/register_form')
})

router.post('/register', (req, res, next)=>{
  let {id,password,nickname}=req.body

  query.userRegister(id,password,nickname)
  .then((queryRes)=>{
    res.json(queryRes)
  })
});

router.get('/login',(req,res)=>{
  res.render('users/login_form')
})

router.post('/login', (req, res, next)=>{
  let {id,password}=req.body

  if(req.session.user){
    res.json({"status":"tmp","msg":"already exist your session"})
  }else{
    query.userLogin(id,password)
    .then((queryRes)=>{
      if(queryRes==true){ 
        req.session.user={
          id:id,
          authorized:true
        }
        res.redirect('../')
      }else{ 
        res.redirect('../')
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
