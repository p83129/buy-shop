const express = require('express');
const app = express();
const router = express.Router();

//上傳S3
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
const session=require('express-session');
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}));

const mysql = require("mysql2");
var conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'qaz4545112',
    database:'buyshop'
});

//註冊會員
exports.singup_member = function(req)
{
    return new Promise(function(resolve,reject)
    {
        let msg="";
        let select_sql= "select email from member where email = '" + req["email"] + "'";
        conn.query(select_sql, function(err, results, fields)
        {      
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length != 0) 
                { 
                    console.log("select: " + results.length);
                    msg={
                        'error': true,
                        'errmsg':"帳號已註冊過!!!"
                    };
                    resolve(JSON.stringify(msg))
                }
                else
                {
                    
                    let insert_sql = "insert into member(email,password, auth) values (?, ?, ?)";
                    let insert_val = [req["email"], req["password"], "1"];
                    console.log("insert_sql: " + insert_sql);
                    conn.query(insert_sql,insert_val, function(err, results, fields)
                    {      
                        if (err) 
                        { 
                            msg={
                                'error': true,
                                'errmsg':err
                            };
                            resolve(JSON.stringify(msg))
                        }
                        else if(results.affectedRows == 1)
                        {
                            console.log("insert成功 ");
                            msg = {
                                'ok':true
                            };
                            resolve(JSON.stringify(msg))
                        }
                    });
                  
                }
            }
          
        });

    });
};

//登入會員
exports.singin_member = function(req)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let select_sql= "select email from member where email = '" + req["email"] + "'";
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {      
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length == 1) 
                { 
                    let select1_sql = "select email, auth from member where email = '" + req["email"] + "'and password = '" + req["password"] + "'";
                    conn.query(select1_sql, function(error, results, fields){
                        
                        console.log(select1_sql)
                        if(results.length == 1){
                            msg = {
                                'ok':true,
                                'auth':results[0].auth                                
                            };
                            session.auth = results[0].auth;                            
                            //console.log("撈出auth:" , results[0].auth)
                            resolve(JSON.stringify(msg))
                        }
                        else{
                            msg={
                                'error': true,
                                'errmsg':"密碼輸入錯誤"
                            };
                            resolve(JSON.stringify(msg))
                        }

                    });
             
                }
                else 
                {                    
                    msg={
                        'error': true,
                        'errmsg':"查無此帳號"
                    };
                    resolve(JSON.stringify(msg))
                }
            }
          
        });

    });
};

//會員資料
exports.select_member = function(email)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let select_sql= "select * from member where email = '" + email + "'";
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {      
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length == 1)                
                {                     
                    resolve(results);
                }
                else{
                    msg={
                        'error': true,
                        'errmsg':"查無此帳號"
                    };
                    resolve(JSON.stringify(msg))
                }
            }
          
        });

    });
};

//update member
exports.update_member = function(email, username, address, phonenum)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";    
        // console.log("email", email);
        // console.log("username", username);
        // console.log("address", address);
        // console.log("phonenum", phonenum);    
        let update_sql = "update member SET username='"+ username +"', address = '"+ address +"', phone='"+ phonenum +"' where email = '" + email+"'";
        //let update_val = [email, pno, amount, type];
        console.log("update_sql: " + update_sql);
        // console.log("insert_val_2: " + insert_val);
        conn.query(update_sql, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows == 1)
            {
                //console.log("修改成功 ");
                msg = {
                    "ok":true
                };                
                resolve(JSON.stringify(msg))
            }
        });
       
    });
}

//update memberpw
exports.update_memberpw = function(email, oldpassword, newpassword)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";    
        // console.log("email", email);
        // console.log("username", oldpassword);
        // console.log("address", newpassword);
           
        let update_sql = "update member SET password='"+ newpassword +"'" + "where email = '" + email+"' And password = '"+ oldpassword + "'";
        //let update_val = [email, pno, amount, type];
        console.log("update_sql: " + update_sql);
        // console.log("insert_val_2: " + insert_val);
        conn.query(update_sql, function(err, results, fields){
            if (err) 
            {         
                console.log("1");        
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows == 1)
            {
                console.log("results.affectedRows: ", results.affectedRows);
                console.log("修改密碼成功 ");
                msg = {
                    "ok":true
                };                
                resolve(JSON.stringify(msg))
            }
            else{
                msg = {
                    "error":true,
                    "errmsg":"舊密碼輸入錯誤"
                }; 
                resolve(JSON.stringify(msg))  
            }
        });
       
    });
}

//新增產品
exports.insert_product = function(choose_1, choose_2, proot, pbranch, product_name, text_amount, contents, weight, area, price, num, status)
{
    return new Promise(function(resolve,reject)
    {
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

        let pno = "";
        let msg = "";        
        let select_sql= "select pno from product where proot = '" + choose_1 + "' and pbranch = '" + choose_2 + "' ORDER BY updatetime DESC LIMIT 0,1";
        // console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length == 1) {
                    //取出pno+1
                    pno = String(Number(results[0].pno)+1);
                    console.log("pno",pno);
                    let insert_sql = "insert into product(pno, proot, pbranch, ptype, pname, pstatus, pcontent, pmaterial, pweight, parea, pprice, pcount) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    let insert_val = [pno, choose_1, choose_2, contents, product_name, status, text_amount, '', weight, area, price, num];
                    // console.log("insert_sql_1: " + insert_sql);
                    // console.log("insert_val_1: " + insert_val);
                    conn.query(insert_sql,insert_val, function(err, results, fields)
                    {      
                        if (err) 
                        { 
                            msg={
                                'error': true,
                                'errmsg':err
                            };
                            resolve(JSON.stringify(msg))
                        }
                        else if(results.affectedRows == 1)
                        {
                            // console.log("insert成功 ");
                            msg = {
                                "ok":true,
                                "pno":pno
                            };
                            session.insertpno = pno;
                            resolve(JSON.stringify(msg))
                        }
                    });
                }
                else{
                    let first_pno = proot + pbranch;
                    console.log("firsy_pno", first_pno);
                    let insert_sql = "insert into product(pno, proot, pbranch, ptype, pname, pstatus, pcontent, pmaterial, pweight, parea, pprice, pcount) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    let insert_val = [first_pno, choose_1, choose_2, contents, product_name, status, text_amount, '', weight, area, price, num];
                    // console.log("insert_sql_2: " + insert_sql);
                    // console.log("insert_val_2: " + insert_val);
                    conn.query(insert_sql,insert_val, function(err, results, fields)
                    {      
                        if (err) 
                        { 
                            msg={
                                'error': true,
                                'errmsg':err
                            };
                            resolve(JSON.stringify(msg))
                        }
                        else if(results.affectedRows == 1)
                        {
                            // console.log("insert成功 ");
                            msg = {
                                "ok":true,
                                "pno":first_pno
                            };
                            session.insertpno = first_pno;
                            resolve(JSON.stringify(msg))
                        }
                    });

                }
            }
        });
    });
}


//select product
exports.select_product = function(id)
{
    return new Promise(function(resolve,reject)
    {        
        // let email = ""; 
        // console.log(session["email"]);
        // if(session["email"] != undefined) email= session["email"];
        // console.log(email);
        let select_sql = ""; 
        if(!isNaN(id)){      
            select_sql = "select pno, proot , pbranch, pname, pprice " +   
                         "from product " +                            
                         "where pno like '"+ id +"%' And pstatus = '1' order by updatetime DESC;";
        }else{
            select_sql = "select pno, proot , pbranch, pname, pprice " +
                         "from product " +                           
                         "where proot like '%" + id + "%' or pbranch like '%" + id + "%' or ptype like '%" + id + "%' or pname like '%" + id + "%' or pcontent like '%" + id + "%' And pstatus = '1' order by updatetime DESC; ";
        }
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    resolve(results);
                }
                else{
                    let msg ={
                        'error':true,
                        'errmsg':"沒有資料"
                    }
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};

//select product_detail
exports.select_product_detail = function(id)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let select_sql= "select pno, proot, pbranch, ptype, pname, pcontent, pmaterial, pweight, parea, pprice, pcount from product where pno = '" + id + "'";
        //console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length == 1) {
                    resolve(results);
                }
                else{
                    let msg ={
                        'error':true,
                        'errmsg':"沒有撈到資料"
                    }
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};

exports.select_product_like = function(email, pno)
{
    return new Promise(function(resolve,reject)
    {     
        let select_sql = "select pno As likeproduct from favorites where email = '" + email + "' And pno = '" + pno + "'";
        //console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length == 1) {
                    resolve(results);
                }
                else{
                    let msg ={
                        'error':true,
                        'errmsg':"沒有撈到資料"
                    }
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};

//inser cart
exports.insert_cart = function(email, pno, amount, type)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let insert_sql = "insert into shopcart(email, pno, amount, type) values (?, ?, ?, ?)";
        let insert_val = [email, pno, amount, type];
        // console.log("insert_sql_2: " + insert_sql);
        // console.log("insert_val_2: " + insert_val);
        conn.query(insert_sql,insert_val, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows == 1)
            {
                //console.log("insert成功 ");
                msg = {
                    "ok":true
                };                
                resolve(JSON.stringify(msg))
                
            }
        });
       
    });
}

//select cart
exports.select_cart = function(email, pno, type)
{
    return new Promise(function(resolve,reject)    {
             
        let msg = "";
        let select_sql= "select * from shopcart where email= '" + email + "' And pno= '" + pno + "'And type= '" + type  + "'";
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    msg ={
                        'ok':true                        
                    }
                    // resolve(JSON.stringify(msg));
                    resolve(msg);
                }
                else{
                    msg ={
                        'error':true,
                        'errmsg': "此會員(" + email + ") 購物車沒有此商品(" + pno + ")"
                    }
                    // resolve(JSON.stringify(msg));
                    resolve(msg);
                }
            }
        });
    });
};

//select cart all
exports.select_cart_all = function(email)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let select_sql= "select A1.pno, A1.type, SUM(A1.amount) as amount, B2.pname ,B2.pprice " +
                        "from shopcart A1 " + 
                            "left join product B2 on(A1.pno = B2.pno) " + 
                        "where A1.email = '" + email + "'" + 
                        "group by A1.type, B2.pname ,B2.pprice "+
                        "order by A1.updatetime Desc"
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    //console.log(results);
                    resolve(results);
                }
                else{
                    let msg ={
                        'error':true,
                        'errmsg':"目前購物車沒有商品喔~"
                    }
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};

//delete cart
exports.delete_cart = function(pno, email, type)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let delete_sql = "delete from shopcart where email = '"+ email + "' And pno = '"+ pno +"' And type='" + type + "'";
        console.log('delete_sql', delete_sql);
        conn.query(delete_sql, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows > 0)
            {
                
                msg = {
                    "ok":true
                };                
                resolve(JSON.stringify(msg))
                
            }
        });
       
    });
}

//insert like
exports.insert_like = function(email, pno, type)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let insert_sql = "insert into favorites(email, pno, type) values (?, ?, ?)";
        let insert_val = [email, pno, type];
        console.log("insert_sql: " + insert_sql);
        console.log("insert_val: " + insert_val);
        conn.query(insert_sql,insert_val, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows == 1)
            {
                //console.log("insert成功 ");
                msg = {
                    "ok":true
                };                
                resolve(JSON.stringify(msg))
                
            }
        });
       
    });
}

//delete like
exports.delete_like = function(email, pno, type)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let delete_sql = "delete from favorites where email = '"+ email + "' And pno = '"+ pno +"'";
        console.log('delete_sql', delete_sql);
        conn.query(delete_sql, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows > 0)
            {
                
                msg = {
                    "ok":true
                };                
                resolve(JSON.stringify(msg))
                
            }
        });
       
    });
}

//update cart
exports.update_cart = function(email, pno, amount)
{
    return new Promise(function(resolve,reject)
    {
        let msg = ""; 
        let update_sql = "update shopcart SET amount="+ amount +" where email = '" + email + "' And pno= '" + pno +"'";
        //let update_val = [email, pno, amount, type];
        console.log("update_sql: " + update_sql);
        // console.log("insert_val_2: " + insert_val);
        conn.query(update_sql, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows == 1)
            {
                //console.log("修改成功 ");
                msg = {
                    "ok":true
                };                
                resolve(JSON.stringify(msg))
            }
        });
       
    });
}

//get like
exports.get_like = function(email)
{
    return new Promise(function(resolve,reject)    {
             
        let msg = "";
        let select_sql= "select A1.pno, B2.pname, B2.pprice " +
                        "from favorites A1 " +
                            "left join product B2 on(A1.pno = B2.pno) " +
                        "where A1.email ='"+ email +"' " ;
                        //"order by A1.updatetime Desc";
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    console.log("會員收藏 資料庫有資料~~");
                    // resolve(JSON.stringify(msg));
                    resolve(results);
                }
                else{
                    console.log("會員收藏 資料庫無資料~~");
                    msg ={
                        'error':true,
                        'errmsg': "此會員(" + email + ") 收藏沒有相關商品"
                    }
                    // resolve(JSON.stringify(msg));
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};


//insert pay
exports.insert_pay = function(email, orderpno)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let insert_sql = "insert into orders(email, order_id, pno, type, amount, price) " + 
                                "select A1.email, '" + orderpno + "' As orderpno, A1.pno, A1.type, A1.amount, B2.pprice " + 
                                    "from shopcart As A1 " +
                                        "left join product B2 on(A1.pno = B2.pno) " + 
                                    "where A1.email = '" + email + "' And A1.amount >0 ;" ;
        
        console.log("insert_sql: " + insert_sql);        
        conn.query(insert_sql, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err

                };
                resolve(msg)
            }
            else if(results.affectedRows > 1)
            {
                console.log("insert成功: ", results.affectedRows);
                msg = {
                    "ok":true,
                    "msg":'付款成功',
                    "orderpno":orderpno
                };                
                resolve(msg)
                
            }
        });
       
    });
}


//select orders
exports.orders = function(email)
{
    return new Promise(function(resolve,reject)    {
             
        let msg = "";
        let select_sql= "select updatetime, order_id from orders where email = '" + email + "' group by order_id;" ;
        
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    //console.log("訂單有資料");                   
                    resolve(results);
                }
                else{
                    //console.log("訂單無資料");
                    msg ={
                        'error':true,
                        'errmsg': "此會員(" + email + ") 沒有訂單紀錄"
                    }                    
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};

//select orders_detail
exports.orders_detail = function(email, orderpno)
{
    return new Promise(function(resolve,reject)    {
             
        let msg = "";
        let select_sql= "select A1.pno, A1.amount, A1.price, A1.type, B2.pname " +
                        "from orders As A1 " +
                                "left join product B2 on(A1.pno = B2.pno) " + 
                        "where A1.email = '" + email + "' And A1.order_id = '" + orderpno + "'" ;
        
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    //console.log("訂單明細有資料");                   
                    resolve(results);
                }
                else{
                    //console.log("訂單明細無資料");
                    msg ={
                        'error':true,
                        'errmsg': "沒有" + orderpno + "的相關資料"
                    }                    
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};

//delete cartAll(訂單完成後刪除購物車的商品)
exports.delete_cartAll = function(email)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let delete_sql = "delete from shopcart where email = '"+ email + "'";
        console.log('delete_sql', delete_sql);
        conn.query(delete_sql, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg':err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows > 0)
           {                
                msg = {
                    "ok":true,
                    "msg":"購物車刪除成功"
                };                
                resolve(JSON.stringify(msg))
                
           }
        });
       
    });
};

//select comment_all
exports.getcomment = function(pno)
{
    return new Promise(function(resolve,reject)    {
             
        let msg = "";
        let select_sql= "select * from comment where pno = '" + pno + "'" ;
        
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    console.log("有評論");                   
                    resolve(results);
                }
                else{
                    console.log("沒有" + pno + "的相關評論");
                    msg ={
                        'error': true,
                        'errmsg': "沒有" + pno + "的相關評論"
                    }                    
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
};

//insert comment
exports.insertcomment = function(email, pno, star, comment)
{
    return new Promise(function(resolve,reject)
    {
        let msg = "";        
        let insert_sql = "insert into comment(email, pno, star, comment) values (?, ?, ?, ?)";
        let insert_val = [email, pno, star, comment];
        console.log("insert_sql: " + insert_sql);
        console.log("insert_val: " + insert_val);
        conn.query(insert_sql,insert_val, function(err, results, fields){
            if (err) 
            {                 
                msg={
                    'error': true,
                    'errmsg': err
                };
                resolve(JSON.stringify(msg))
            }
            else if(results.affectedRows == 1)
            {
                //console.log("insert成功 ");
                msg = {
                    "ok": true
                };                
                resolve(JSON.stringify(msg))
                
            }
        });
       
    });
};

//select buy product
exports.buy_product = function(email, pno)
{
    return new Promise(function(resolve,reject)    {
             
        let msg = "";
        let select_sql= "select * from orders where email = '" + email + "' and pno = '" + pno + "';" ;
        
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length > 0) {
                    console.log("有購買商品"); 
                    msg ={
                        'ok': true                        
                    }                      
                    resolve(msg);
                }
                else{
                    console.log("沒有購買");
                    msg ={
                        'error': true,
                        'errmsg': "沒有購買"
                    }                    
                    resolve(msg);
                }
            }
        });
    });
};

//select comment product
exports.comment_product = function(email, pno)
{
    return new Promise(function(resolve,reject)    {
             
        let msg = "";
        let select_sql= "select * from comment where email = '" + email + "' and pno = '" + pno + "';" ;
        
        console.log(select_sql);
        conn.query(select_sql, function(err, results, fields)
        {   
            // console.log("查詢後");
            if (err) 
            {
                throw err;
            }
            else
            {
                if (results.length == 0) {
                    console.log("沒有評論商品"); 
                    msg ={
                        'ok': true                        
                    }                      
                    resolve(msg);
                }
                else{
                    console.log("有評論過商品"); 
                    msg ={
                        'error': true,
                        'errmsg': "有評論過商品"
                    }                    
                    resolve(msg);
                }
            }
        });
    });
};









const fs = require("fs");
const S3 = require('aws-sdk/clients/s3')

const bucketName = 's3mytestbucket2021';
const region = 'ap-northeast-1';
const accessKeyId = 'AKIA4Y23VAHZ32B7QG5O';
const secretAccessKey = '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';

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

// uploads a file to s3
exports.upload = function(file){
    return new Promise(function (resolve, reject) {

        const fileStream = fs.createReadStream(file.path)

        const uploadParams = {
            Bucket: 's3mytestbucket2021',
            Body: fileStream,
            Key: file.originalname
        };
        s3.upload(uploadParams).promise();
        let msg = {
            'ok':true
        };
        resolve(JSON.stringify(msg))
    });
}



