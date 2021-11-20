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


//商品詳細
router.get('/detail/:id', async function(req,res){
    let id = req.params.id;
    console.log(id);

    let email = "";
    if(session["email"] != undefined) email = session["email"];

    let msg = ""; 
    // let data = {};
    let bigdata = [];
    
    try{
        console.log("detail~~~~~~~~");
        // 撈商品詳細
        let detail = await db.select_product_detail(id);

        //會員有無收藏
        let likeproduct;
        let templikeproduct = "";
        
        //先判斷登入狀態
        if(email != "") {
            likeproduct= await db.select_product_like(email, id);  
            
            console.log("likeproduct", likeproduct);
            
            if(likeproduct[0].likeproduct != null) {
                templikeproduct = likeproduct[0].likeproduct;
                console.log("有進來~~~~~~~~~~~~~~");
            }
            console.log("測試likeproduct是否正確 ", templikeproduct);
        }

        
        //console.log("detail", detail);

        if(detail['error'] == null)//確定有資料
        {
            let detail_img = await rds.select_rds_imgall(id);
            // console.log("detail_img", detail_img);
            detail.forEach(element => {
                // console.log(element.pno);
                // console.log(element.pname);
                // console.log(element.pprice);
                // console.log("~~~~~~~~~~~~~~~~分隔");
                
                // data["pno"] = element.pno;  
                // data["pname"] = element.pname;  
                // data["pprice"] = element.pprice;  
                let img = [];
                let type;
                detail_img.forEach(imgall =>{
                    if(imgall.pno == element.pno){
                        if(imgall.img1 != null && imgall.img1 != "") img.push(imgall.img1);
                        if(imgall.img2 != null && imgall.img2 != "") img.push(imgall.img2);
                        if(imgall.img3 != null && imgall.img3 != "") img.push(imgall.img3);
                        if(imgall.img4 != null && imgall.img4 != "") img.push(imgall.img4);
                        if(imgall.img5 != null && imgall.img5 != "") img.push(imgall.img5);
                        if(imgall.img6 != null && imgall.img6 != "") img.push(imgall.img6);  
                        console.log(element.ptype);
                        type = element.ptype.split('、');
                    }
                });
                console.log("img[]", img);
                bigdata.push({'pno':element.pno, 'pname':element.pname, 'pprice':element.pprice, 'pcontent': element.pcontent, 'ptype':type, 'image':img , 'likeproduct':templikeproduct});
                
            });

            // for(var i in products) {           
                
            // }
            

            let rds_img;
            msg={
                'ok':true,
                'proot': detail[0].proot,
                'pbranch':detail[0].pbranch,
                'data': bigdata,
                'email':session["email"]                      
            };
            console.log("msg: ", msg);
            res.end(JSON.stringify(msg)) 
        }else{            
            res.end(JSON.stringify(detail));
        }
        
    }
    catch(message){
        console.log('product_detail.js (get)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});




module.exports = router;