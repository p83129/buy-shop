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


//商品
router.get('/product/:type', async function(req,res){
    console.log("相關商品~~~~~~~~~~~~~~~~~~");
    let type = req.params.type.trim();
    console.log(type);
    let msg = ""; 
    let email = ""; 
    console.log(session["email"]);
    if(session["email"] != undefined) email= session["email"];
    console.log(email);

    //會員有無收藏   
    let templikeproduct = "";

    let bigdata = [];  
    let pno_all = [];  
    try{
        
        //撈pno為type的商品              
        let products = await db.select_product(type);
        products.forEach(values =>{
            pno_all.push(values.pno);

            console.log("pno_all: ", pno_all);
        });
        

        //console.log("products", products);

        if(products['error'] == null)//確定有資料
        {
            if(!isNaN(type)){            
                let product_img = await rds.select_rds_img1(type);
                console.log("product_img", product_img);
                for(let i = 0; i < products.length; i++){
                    
                    let img = "";
                    product_img.forEach(img1 =>{
                        if(img1.pno == products[0].pno){
                            img = img1.img1;
                        }
                    });

                    if(email != ""){
                        let likeproduct = await db.select_product_like(email, products[i].pno);
                        if(likeproduct[0].likeproduct != undefined) templikeproduct = likeproduct[0].likeproduct;

                        // templikeproduct = get_likeproduct(email, element.pno);
                        // //.then(console.log).catch(console.error);
                        // console.log("111111111111111111111", templikeproduct);

                        // (async () => {
                        //     let likeproduct = await db.select_product_like(email, element.pno);
                        //     // templikeproduct =  await Promise.all(get_likeproduct(email, element.pno));
                        //     // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa",  await get_likeproduct(email, element.pno))
                        //     console.log("22222222222222222222222", likeproduct[0].likeproduct);
                        //     bigdata.push({'pno':element.pno, 'pname':element.pname, 'pprice':element.pprice, 'image':img, 'likeproduct':templikeproduct});
                        // })()

                        console.log("templikeproduct123 ", templikeproduct);
                    }

                    
                    
                    bigdata.push({'pno':products[i].pno, 'pname':products[i].pname, 'pprice':products[i].pprice, 'image':img, 'likeproduct':templikeproduct});
                            
                   
                }
                
            }
            else{
                for(let i = 0; i < pno_all.length; i++){
                    console.log("次數:", pno_all.length);
                    let product_img = await rds.select_rds_img1(pno_all[i]);
                    console.log("product_img_pno", product_img);
                //     products.forEach(element => {  
                                      
                //         let img = "";
                //         product_img.forEach(img1 =>{
                //             if(img1.pno == element.pno){
                //                 img = img1.img1;
                //             }
                //         });
                        
                //         bigdata.push({'pno':element.pno, 'pname':element.pname, 'pprice':element.pprice, 'image':img});
                //         console.log("bigdata:" , bigdata);
                // });
                    if(email != ""){
                        // templikeproduct = get_likeproduct(email, products[i].pno);
                        // console.log("templikeproduct ", templikeproduct);
                        let likeproduct = await db.select_product_like(email, products[i].pno);
                        if(likeproduct[0].likeproduct != undefined) templikeproduct = likeproduct[0].likeproduct;
                    }

                    let img = product_img[0].img1;
                    bigdata.push({'pno':products[i].pno, 'pname':products[i].pname, 'pprice':products[i].pprice, 'image':img, 'likeproduct':templikeproduct});
                    console.log("bigdata:" , bigdata);
                }
                
            }            
            
        // for(var i in products) {  
        // }    

        let rds_img;
        msg={
            'ok':true,
            'proot': products[0].proot,
            'pbranch':products[0].pbranch,
            'data': bigdata                      
        };
        console.log("msg: ", msg);
        res.end(JSON.stringify(msg)) 
    
        }else{            
            res.end(JSON.stringify(products));
        }    
    }
    catch(message){
        console.log('product.js (get)錯誤訊息:' + message)
        res.end(JSON.stringify(message)) 
    }
});

async function get_likeproduct(email, pno){
    let likeproduct = await db.select_product_like(email, pno); 
    if(likeproduct['error'] == null){
        // console.log("likeproduct", likeproduct);
        // console.log("likeproduct['likeproduct']", likeproduct['likeproduct']);
        // console.log("likeproduct.likeproduct", likeproduct.likeproduct);
        console.log("likeproduct[0].likeproduct", likeproduct[0].likeproduct);
        // let msg ={
        //     'likeproduct':likeproduct[0].likeproduct
        // }
        // return JSON.stringify(msg);
        return likeproduct[0].likeproduct;
    }
    
}








module.exports = router;