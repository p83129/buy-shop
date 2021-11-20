const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const router = express.Router();
const db = require('../mysql_database.js');
const rds = require('../mysql_rds.js');
const app = express();
app.use(express.json()); 

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}));

//抓會員資料
router.get('/profile', async function(req,res){
    try{
        let msg = "";
        console.log("session: " + session.email);
        if(session.email != undefined){
            let profile = await db.select_member(session.email);
            // msg={
            //     'ok': true
            // };
            res.end(JSON.stringify(profile))
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
        console.log('profile.js (get)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});

//修改會員資料
router.post('/profile', async function(req,res){
    try{
        console.log("修改資料~~~~");
        let msg = "";
        let email = session.email;
        let username = req.body.username;
        let address = req.body.address;
        let phonenum = req.body.phonenum;
        console.log("username", username);
        console.log("address", address);
        console.log("phonenum", phonenum);
        //console.log("session: " + session.email);
        
        let profile = await db.update_member(email, username, address, phonenum);
            
        res.end(JSON.stringify(profile))
        
        
    }
    catch(message){
        console.log('profile.js (post))錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});

//修改會員資料-密碼
router.patch('/profile', async function(req,res){
    try{
        let msg = "";
        let email = session.email;
        let oldpassword = req.body.oldpassword;
        let newpassword = req.body.newpassword;       

        console.log("session: " + session.email);
        
        let profile = await db.update_memberpw(email, oldpassword, newpassword);
            
        res.end(JSON.stringify(profile))
        
        
    }
    catch(message){
        console.log('profile.js (patch))錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});


module.exports = router;