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

//取得評論
router.get('/comment/:pno',async function(req, res){
    let pno = req.params.pno;
    console.log("pnopno : ",pno);
    try{
        let getcomment = await db.getcomment(pno);
        console.log("getcomment",getcomment);
        if(getcomment.length > 0 ){
            for(let i = 0; i < getcomment.length; i++){
                let name = getcomment[i].email;
                getcomment[i].email = plusXing(name, 3, 1);
        
                console.log("getcomment",getcomment);    
                
            }
        }
        res.end(JSON.stringify(getcomment));
    }
    catch(message){
        console.log('comment.js (get)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }   

});

//新增評論
router.post('/comment',async function(req, res){
    let email = session["email"];
    let pno = req.body.pno;
    let star = req.body.star;
    let comment = req.body.comment;
    
    console.log("email",email);
    console.log("pno",pno);
    console.log("star",star);
    console.log("comment",comment);

    try{        
        //新增評論
        let insertcomment = await db.insertcomment(email, pno, star, comment);
        if(insertcomment['error'] == true){
            console.log("insertcomment",insertcomment);
            res.end(insertcomment);
            
        }
        console.log("insertcomment：",JSON.stringify(insertcomment))
        res.end(insertcomment);
           
    }
    catch(message){
        console.log('comment.js (post)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }   

});

//檢查評論
router.put('/comment/:pno',async function(req, res){
    console.log("檢查評論!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    let email = session["email"];
    let pno = req.params.pno;    
    let msg = "";

    console.log("email",email);
    console.log("pno",pno);  

    try{
        //是否購買過商品
        let buy_product = await db.buy_product(email, pno);
        console.log("buy_product", buy_product);
        if(JSON.stringify(buy_product["error"]) == null){
            console.log("buy_product[error])", JSON.stringify(buy_product["error"]));
            //是否有評論過此商品
            let comment_product = await db.comment_product(email, pno);

            console.log("comment_product", comment_product);
            // console.log("JSON.parse(comment_product[error])", JSON.stringify(comment_product["error"]));
            // console.log("comment_product[errmsg]", JSON.stringify(comment_product["errmsg"]));
            // console.log("comment_product.error", JSON.stringify(comment_product.error));
            // console.log("comment_product.errmsg", JSON.stringify(comment_product.errmsg));
            // console.log("", );

            if(JSON.stringify(comment_product["error"]) == null){
                res.end(JSON.stringify(comment_product));
            }
            else{
                msg = {
                    'error':true,
                    'msg':"已經評論過，不得重複"
                }
                res.end(JSON.stringify(msg));
            }
        }
        else{
            msg = {
                'error':true,
                'msg':"沒有購買此商品，無法評論"
            }
            res.end(JSON.stringify(msg));
        }        
    }
    catch(message){
        console.log('comment.js (put))錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }   

});



//使用者姓名中加*
function plusXing (str,frontLen,endLen) { 
    let len = str.length-frontLen-endLen;
    let xing = '';
    for (let i = 0 ; i < len ; i++) {
        xing+='*';
    }
    return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}



module.exports = router;