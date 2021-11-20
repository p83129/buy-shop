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

//加入購物車
router.post('/cart', async function(req,res){
    //console.log("購物車有進來~~~~~~~~~~~~");
    let pno= req.body.pno;  
    let amount= req.body.amount;  
    let type= req.body.type;        
    let email = session.email;
    // console.log("pno", pno);
    // console.log("amount", amount);
    // console.log("type", type);
    // console.log("price", price);
    //console.log("email", email);
    
    let add_cart;
    try{
        //先搜尋此商品在購物車有無存在
        let select_cart = await db.select_cart(email, pno, type);      
        // console.log(select_cart['error']);

        //無存在就insert
        if(select_cart['error'] == true){            
            add_cart = await db.insert_cart(email, pno, amount, type);
        }
        //有存在就update
        else if(select_cart['ok'] == true){            
            add_cart = await db.update_cart(email, pno, "amount+"+amount);
        }   

        res.end(JSON.stringify(add_cart));
    }
    catch(message){
        console.log('cart.js (post)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }

});


//撈出購物車
router.get('/cart', async function(req,res){
    console.log("撈購物車有進來~~~~~~~~~~~~");    
    let email = session.email;    
    console.log("email", email);
    let msg = "";
    let total = 0;
    bigdata =[];
    try{
        let get_cart = await db.select_cart_all(email);       
        
        // console.log('get_cart', get_cart); 
        // console.log('get_cart[error]', get_cart['error']); 
        // console.log('JSON.stringify(get_cart).pno', JSON.stringify(get_cart));
        // console.log('JSON.stringify(get_cart).pno', JSON.stringify(get_cart[0].pno));       

        if(JSON.stringify(get_cart[0].pno) != null)//確定有資料
        {        
            for(var i in get_cart) {           
                console.log('pno', get_cart[i].pno);               
                
                let get_cart_img = await rds.select_rds_img1(get_cart[i].pno); 
                let img = "";
                get_cart_img.forEach(img1 =>{
                    if(img1.pno == get_cart[i].pno){
                        img = img1.img1;
                    }
                });
                total += Number(get_cart[i].pprice)*Number(get_cart[i].amount);
                bigdata.push({'pno':get_cart[i].pno, 'pname':get_cart[i].pname, 'pprice':get_cart[i].pprice,'type':get_cart[i].type, 'amount':get_cart[i].amount, 'image':img});
            
            };
            msg={
                'ok':true,   
                'total':total,         
                'data': bigdata                      
            };
            console.log("msg: ", msg);
            res.end(JSON.stringify(msg)) 
        }
        else res.end(JSON.stringify(get_cart));
    }
    catch(message){
        console.log('cart.js (get)錯誤訊息:' + message);
        res.end(JSON.stringify(message));
    }

});

//刪除購物車商品
router.delete('/cart', async function(req,res){
    console.log('有進來刪除購物車~~');
    try{
        let pno = req.body['pno'];
        let type = req.body['type'];
        let email = session['email'];
        console.log('pno', pno);
        let delete_cart = await db.delete_cart(pno, email, type);  
        
        res.end(JSON.stringify(delete_cart)) 
    }
    catch(message){
        console.log('cart.js (delete)錯誤訊息:' + message);
        res.end(JSON.stringify(message));
    }

});

//更新購物車商品
router.patch('/cart', async function(req,res){
    console.log('有進來更新購物車~~');
    try{
        let pno = req.body['pno'];
        let email = session['email'];
        let amount = req.body['amount'];
        console.log('pno', pno);
        console.log('amount', amount);
        let update_cart = await db.update_cart(email, pno, amount);  
        
        res.end(JSON.stringify(update_cart)) 
    }
    catch(message){
        console.log('cart.js (update)錯誤訊息:' + message);
        res.end(JSON.stringify(message));
    }

});

module.exports = router;