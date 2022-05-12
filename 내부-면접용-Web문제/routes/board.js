var express = require('express');
const query=require('../db/mysql_query')
var router = express.Router();

router.get('/',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        query.getBoardList()
        .then((queryRes)=>{
            res.render('board/board_list',{board_list:queryRes})
        })
    }
})

router.get('/view/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        query.detailViewBoard(number)
        .then((queryRes)=>{
            res.render('board/board_view',{info:queryRes})
        })
    }
})

router.post('/preview',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        let tmp=req.body
        res.render('board/board_preview',tmp)
    }
})

router.get('/write',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        res.render('board/board_write',{username:req.session.user.id})
    }
})

router.post('/write',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const {name,title,context}=req.body

        if(title!=''&&context!=''){
            query.createBoard(name,title,context)
            .then((queryRes)=>{
                res.redirect('/board')
            })
        }else{
            res.render('board/board_write',{empty:true})
        }
    }
})

router.get('/mod/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no

        query.getBoardWriterName(number).then((name)=>{
            if(req.session.user.id==name){
                const number=req.params.no
                query.detailViewBoard(number)
                .then((queryRes)=>{
                    res.render('board/board_mod',{info:queryRes})
                })
            }else{
                res.json({"msg":"you are not writer"})
            }
        })
    }
})

router.post('/mod/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        const {name,title,context}=req.body

        query.getBoardWriterName(number).then((name)=>{
            if(req.session.user.id==name){
                query.updateBoard(number,name,title,context)
                    .then((queryRes)=>{
                    res.redirect(`/board/view/${number}`)
                })
            }else{
                res.json({"msg":"you are not writer"})
            }
        })
    }
})

router.get('/del/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no

        query.getBoardWriterName(number).then((name)=>{
            if(req.session.user.id==name){
                query.deleteBoard(number)
                .then((queryRes)=>{
                    res.redirect('/board')
                })
            }else{
                res.json({"msg":"you are not writer"})
            }
        })
    }
})

module.exports = router;