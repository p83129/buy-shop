const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const router = express.Router();
const db = require('../mysql_database.js');
const app = express();
app.use(express.json()); 

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}));

//會員註冊
router.post('/user',async function(req,res){
   try{      
        console.log("註冊2222222222222222222222222222222222");
        let email= req.body.email;  
        let password= req.body.password;      
        console.log(email);
        console.log(password);
        
        let info = {
            "email":email,
            "password":password
        }

        let result = await db.singup_member(info);
        console.log(result,"11111111111111111111111111111111111111")
        result = await JSON.parse(result);
        if(result["ok"] == true)
        {
            console.log(result["error"],"2222222222222222222222222")
           // response={'error':"NoError"};            
            res.end(JSON.stringify(result))
        }
        else{
            console.log(result["error"],"33333333333333333333333333")
            res.end(JSON.stringify(result))
        }
    }
   catch(message){
       //message = await JSON.parse(message);
       console.log('member.js (post)錯誤訊息:' + message)
       res.end(JSON.stringify(message)) 
       
   }

});

//會員登入
router.patch('/user', async function(req,res){
   try{
        console.log("patch  2222222222222222222222222222222222");
        let email= req.body.email;  
        let password= req.body.password;  
        // console.log("登入 " + email);
        // console.log("登入 " + password);

        let info = {
            "email":email,
            "password":password
        }

        let result = await db.singin_member(info);    
        console.log(result,"11111111111111111111111111111111111111")
        result = await JSON.parse(result);
        if(result["error"] == null)
        {
            //紀錄登入帳號           
            session.email = email;
            console.log(session.email ,"44444444444444444444444444")
        }
        // else if(result["error"] == true){
        //     console.log(result["error"],"2222222222222222222222222")            
        //     res.end(JSON.stringify(result))
        // }

        res.end(JSON.stringify(result))
   }
   catch(message){
        //message = await JSON.parse(message);
        console.log('member.js (patch)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
   }
});

//確認登入狀態
router.get('/user', async function(req,res){
    try{
        let msg = "";
        console.log("session: " + session.email);
        if(session.email != undefined){
            let select_member = await db.select_member(session.email);
            
            msg={
                'ok': true,
                'email':select_member[0].email,
                'name':select_member[0].username,
                'phone':select_member[0].phone,
                'auth':select_member[0].auth
            };
            res.end(JSON.stringify(msg))
        }
        else{
            msg={
                'error': true,
                'errmsg':"尚未登入"
            };
            res.end(JSON.stringify(msg))
        }
    }
    catch(message){
        console.log('member.js (get)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});

//登出
router.delete('/user', async function(req,res){
    try{
        //把session清掉
        session.email = undefined;
        return res.json({ 'ok': true });
    }
    catch(message){
        console.log('member.js (delete)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});


module.exports = router;