const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const router = express.Router();
const db = require('../mysql_database.js');
const rds = require('../mysql_rds.js');
const app = express();
app.use(express.json()); 

//taypay
const axios = require('axios')

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}));

//商品付款資訊
router.post('/pay',async function(req, res){

    try{
        console.log("pay money~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        let prime = req.body.prime;
        let name = req.body.name;
        let phone = req.body.phone;
        let email = session["email"];
        let total = req.body.total;
        let timenow = new Date();
        let orderpno = timenow.getFullYear().toString() + (timenow.getMonth() + 1).toString() + timenow.getDate().toString() + timenow.getHours().toString() + timenow.getMinutes().toString() + timenow.getSeconds().toString() + timenow.getMilliseconds().toString();
        //console.log("orderpno: ", orderpno);
        let status = 0;
        let msg = "";


        //TapPay
        let tappay_json={
            'prime':prime,
            'partner_key':"partner_hN0LQnBJwfXVeKxxAsiNLUg6ZqaKOmqnZlngMFucyEOIBmTy0Un0rEGg",
            'merchant_id':"p83120911_TAISHIN",
            'details':"TapPay Test",
            'amount':total,
            'order_number':orderpno,
            'cardholder':{
                'phone_number':phone,
                'name':name,
                'email':email									
            },
            'remember':true
        };
        //console.log("tappay_json", tappay_json);

                const url = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime';
        const options = {
            host: 'sandbox.tappaysdk.com',
            method : 'POST',
            headers: {
                'Content-Type':'application/json',
                'x-api-key':'partner_hN0LQnBJwfXVeKxxAsiNLUg6ZqaKOmqnZlngMFucyEOIBmTy0Un0rEGg'
            },
            data : JSON.stringify(tappay_json),
            url : url       
        };
       
        axios(options).then((response) => {
            status = response.data.status;
            msg = response.data.msg;                                   
        }).then(async function(){
            //console.log("insert~~~~~~",status,msg,email, orderpno);
            if(status == 0 && msg == "Success"){
                let insert_pay = await db.insert_pay(email, orderpno);
                if(insert_pay["error"] == null){

                    let delete_cartAll = await db.delete_cartAll(email);
                    
                    if(delete_cartAll["error"] == null){
                        msg = {
                            "ok":true,
                            "msg":'付款成功',
                            "orderpno":orderpno
                        }
                        return res.json(msg);
                    }
                    else{
                        return res.json(delete_cartAll);
                    }
                }
                else{
                    return res.json(insert_pay);
                }
                //console.log("insert_pay1", insert_pay);
                
            }
            else{
                let errormsg = {'error': true,
                                'errmsg':'付款失敗'};
                return res.json(errormsg);
            }
        }).catch((e) => {
            console.log(e, "data失敗內容~~~~~~~~~~~")
        });               
        
    }
    catch(message){
        console.log('pay.js (post)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }    



});




module.exports = router;