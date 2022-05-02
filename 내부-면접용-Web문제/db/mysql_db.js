const mysql=require('mysql2/promise')
const conn={
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'root',
    database:'test'
};

// const testFunc=async()=>{

//     var connection=await mysql.createConnection(conn);
//     connection.connect();

//     let[rows,field]=await connection.execute("select * from board");

//     connection.end();
// }

module.exports={
    init:async function(){
        return await mysql.createConnection(conn);
    },
    connect:function(conn){
        conn.connect(function(err){
            if(err) console.log('err')
            else console.log('connection success') 
        });
    }
};