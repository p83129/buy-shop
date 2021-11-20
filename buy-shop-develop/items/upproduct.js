const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const router = express.Router();
const db = require('../mysql_database.js');
const rds = require('../mysql_rds.js');
const app = express();
app.use(express.json()); 
// app.use(express.json({limit : "2100000kb"}));
const multer  = require('multer');
const upload = multer({dest:'uploads/'});

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}));
// let asd = upload.array('photos',6);
// let zxc = upload.single('file');
// let qwe = upload.fields('files');
let any = upload.any();

router.post('/upproduct', any, async function(req, res){
    try{  
        console.log("upproduct: 33333333333333333");        
        let file = req.files;//圖片

        let product_name = req.body["product_name"];
        let choose_1 = req.body["choose_1"];
        let choose_2 = req.body["choose_2"];
        let text_amount = req.body["text_amount"];//商品描述
        let contents = req.body["contents"];
        let weight = req.body["weight"];
        let area = req.body["area"];
        let price = req.body["price"];
        let num = req.body["num"];
        let status = req.body["status"];

        let proot = 0;
        let pbranch = 0;
        if(choose_1.includes("國家")) proot = 1000000;
        else if(choose_1.includes("素食")) proot = 2000000;

        if(choose_2.includes("台灣")) pbranch = 1001;
        else if(choose_2.includes("日韓")) pbranch = 2001;
        else if(choose_2.includes("歐美")) pbranch = 3001;
        else if(choose_2.includes("東南亞")) pbranch = 4001;
        else if(choose_2.includes("純素/全素")) pbranch = 1001;
        else if(choose_2.includes("蛋奶素")) pbranch = 2001;
        else if(choose_2.includes("植物五辛素")) pbranch = 3001;
        

        //console.log("product_name", product_name);  
             
        //insert product to db
        // console.log("choose_1", choose_1);
        // console.log("choose_2", choose_2);
        // console.log("proot", proot);
        // console.log("pbranch", pbranch);
        // console.log("product_name", product_name);
        // console.log("text_amount", text_amount);
        // console.log("contents", contents);
        // console.log("weight", weight);
        // console.log("area", area);
        // console.log("price", price);
        // console.log("num", num);
        // console.log("status", status);

        let sql_result = await db.insert_product(choose_1, choose_2, proot, pbranch, product_name, text_amount, contents, weight, area, price, num, status);
        console.log(sql_result,"11111111111111111111111111111111111111")
        
        // var aa = JSON.stringify(sql_result);
        // console.log("aa",aa);
        if(sql_result["error"] == null){
            // console.log("成功新增商品11111111111111111111111111111111111111")
            console.log("此商品pno", session.insertpno);
            // console.log("此商品pno", sql_result.pno);
            // console.log("此商品pno", sql_result['pno']);
            // console.log("此商品pno", aa['pno']);
            // console.log("此商品pno", sql_result["pno"]);
            // console.log("此商品pno", aa["pno"]);


            // let file123 = req.body["filename1"];
            // let filename123 = req.body["filename"];
            // console.log("多筆 ", file);        
            // console.log("數量", file.length);

            for(i=0 ; i < file.length ; i++ ){ 
                console.log("開始跑S3");        
                let aa = await db.upload(file[i]);      
                console.log("上傳成功");                
            }     

            //inser img to rds                 
            let bb = await rds.insert_rds(session.insertpno, file);
            console.log("rds上傳成功~~");                 
        }

        res.end(JSON.stringify(sql_result));    
       
    } 
    catch(message){
        console.log('upproduct.js (post)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
   }   


});







module.exports = router;