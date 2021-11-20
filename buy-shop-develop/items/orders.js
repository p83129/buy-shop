const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const router = express.Router();
const db = require('../mysql_database.js');
const rds = require('../mysql_rds.js');
const app = express();
app.use(express.json()); 

const SimpleDateFormat = require('@riversun/simple-date-format');
const format = require('format-package');

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}));

//商品付款資訊
router.get('/orders',async function(req, res){
    let email = session["email"];
    let data = [];
    let detail = [];

    let orders = await db.orders(email);
    // console.log("orders!!!!!!", orders);
    if(orders["error"] == null){
        
        for(let i in orders){
            let total = 0;
            let sdf = new SimpleDateFormat("yyyy-MM-dd");
            let day = sdf.format(orders[i].updatetime);            
            //console.log("day!!!!!!!!!!!!!!! ", orders[i].updatetime);

            let orders_detail = await db.orders_detail(email, orders[i].order_id);
            //console.log("orders_detail", orders_detail);
            for(let j in orders_detail){
                //console.log(orders[i].order_id, j);
                
                let temp_num = parseInt(orders_detail[j].amount)*parseInt(orders_detail[j].price);
                
                total += temp_num;
                detail.push({'name': orders_detail[j].pname, 'pno': orders_detail[j].pno, 'amount': orders_detail[j].amount, 'price': orders_detail[j].price, 'type': orders_detail[j].type});

            }
            data.push({'day': day, 'orderpno': orders[i].order_id, 'total': total, 'detail': detail});
            detail = [];
        }
        res.end(JSON.stringify(data)) 
    }
    else{
        res.end(JSON.stringify(data));
    }
    
    

});


module.exports = router;