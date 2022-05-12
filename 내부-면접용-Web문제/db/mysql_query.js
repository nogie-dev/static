var db=require('./mysql_db')
const conn=db.init()

module.exports={
    checkDupId:async function(id){
        try{
            let judge=false
            let [rows,fields]=await conn.then((connection)=>connection.query("select id from users where id=?",[id]))
            
            if(rows[0]){judge=true} //rows[0]에 값이 있을 경우(중복) judge true 그렇지 않으면 false
            return judge
        }catch(error){
            console.log(error)
            //return {"status":"400","msg":"bad request"}
        }
    },

    checkDupName:async function(name){
        try{
            let judge=false
            let [rows,fields]=await conn.then((connection)=>connection.query("select nickname from users where nickname=?",[name]))
            
            if(rows[0]){judge=true}
            return judge
        }catch(error){
            console.log(error)
            //return {"status":"400","msg":"bad request"}
        }
    },

    userRegister:async function(id,password,nickname){
        try{
            let checkId=false
            checkId=await this.checkDupId(id).then((result)=>result)
            console.log(checkId)

            let checkName=false
            checkName=await this.checkDupName(nickname).then((result)=>result)
            console.log(checkName)

            if(checkId==false&&checkName==false){
                await conn.then((connection)=>connection.execute("insert into users(nickname,id,password) values(?,?,?)",[nickname,id,password]))
                return {"status":"200", "msg":"success registered user infomation"}
            }else{
                return {"status":'Duplicated', "msg":"there is a duplicated with either"}
            }
            //관리자 권한을 부여받아야 할 경우 mysql console로 직접 계정 추가해야함
            
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    userLogin:async function(id,password){
        try{
           let judge=false
           let [rows,fields] = await conn.then((connection)=>connection.query("select id,password from users where id=? and password=?",[id,password]))
           
           if(rows[0]){judge=true}
           return judge
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    adminCheck:async function(id){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("select is_admin from users where id=?",[id]));
            return rows[0]
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    getBoardList:async function(){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("select * from board"));
            console.log(rows)
            return rows
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    createBoard:async function(name,title,context){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("insert into board(name,title,context) values(?,?,?)",[name,title,context]))
            //return rows; 현재 필요 없음
            return {"status":"200", "msg":"success appended content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
        //.catch((error)=>console.log(error));
    },

    deleteBoard:async function(number){
        try{
            await conn.then((connection)=>connection.execute("delete from board where no=?",[number]))
            return {"status":"200", "msg":"success deleted content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },
    
    detailViewBoard:async function(number){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("select * from board where no=?",[number]))
            return rows
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    updateBoard:async function(number,name,title,context){ //update 하려는 colum값이 동일 할 경우 시간이 소요되지 않음
        try{
            await conn.then((connection)=>connection.execute("update board set name=?, title=?, context=? where no=?",[name,title,context,number]))
            return {"status":"200", "msg":"success updated content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    getBoardWriterName:async function(number){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("select name from board where no=?",[number]))
            return rows[0]
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    }
}