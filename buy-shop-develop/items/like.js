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

//加入收藏
router.post('/like', async function(req,res){
    try{
        console.log('新增收藏有進來~~~~~~~~~~~~');
        let pno = req.body['pno'];
        let type = req.body['type'];
        let email = session['email'];

        console.log('pno', pno);
        console.log('type', type);

        let insert_like = await db.insert_like(email, pno, type);
        res.end(JSON.stringify(insert_like));

    }
    catch(message){
        console.log('like.js (post)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});

//刪除收藏
router.delete('/like', async function(req,res){
    try{
        console.log('刪除收藏有進錸~~~~~~~~~~~~');
        let pno = req.body['pno'];
        let type = req.body['type'];
        let email = session['email'];

        let delete_like = await db.delete_like(email, pno, type);
        res.end(JSON.stringify(delete_like));

    }
    catch(message){
        console.log('like.js (delete)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});

//會員收藏
router.get('/like', async function(req,res){
    try{
        console.log('會員收藏有進來~~~~~~~~~~~~');  
        bigdata =[];      
        let email = session['email'];

        let get_like = await db.get_like(email);

        if(JSON.stringify(get_like[0].pno) != null)//確定有資料
        {        
            for(var i in get_like) {           
                console.log('pno', get_like[i].pno);               
                
                let get_like_img = await rds.select_rds_img1(get_like[i].pno); 
                let img = "";
                get_like_img.forEach(img1 =>{
                    if(img1.pno == get_like[i].pno){
                        img = img1.img1;
                    }
                });
                
                bigdata.push({'pno':get_like[i].pno, 'pname':get_like[i].pname, 'pprice':get_like[i].pprice, 'image':img});
            
            };
            msg={
                'ok':true,                      
                'data': bigdata                      
            };
            console.log("msg: ", msg);
            res.end(JSON.stringify(msg)) 
        }
        else res.end(JSON.stringify(get_like));

    }
    catch(message){
        console.log('like.js (get)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});


module.exports = router;