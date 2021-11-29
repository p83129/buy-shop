const express = require('express');
const app = express();
const router = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const mysql = require("mysql2");
var conn = mysql.createPool({
    host: 'database-rds.cadwklykzixp.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'qaz4545112',
    database:'RDSTest'
});
const s3_http = 'https://d3ctywf3vouc7n.cloudfront.net/';

//insert imgs to rds
exports.insert_rds = function(pno, img)
{
    return new Promise(function(resolve,reject)
    {
        console.log("rds有進來~~~");
        let image = "";
        let q = "";
        let val = [];
        console.log("pno", pno);
        val.push(pno);
        console.log("val", val);
        //let insert_sql = "insert into product_imgtest(pno";
        let insert_sql = "insert into product_img(pno";
        for(i= 0; i<img.length; i++){
            image += ",img"+ (i+1);
            q += ",?";
            val.push(s3_http + img[i].originalname);
        }
        insert_sql += image + " ) values (?" + q + ")";
        let insert_val = val;

        console.log("insert_sql: " + insert_sql);
        console.log("insert_val: " + insert_val);
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
            else if(results.affectedRows > 0)
            {
                console.log("insert成功 ");
                msg = {
                    'ok':true
                };
                resolve(JSON.stringify(msg))
            }
        });
    });
}

//select img1 to rds
exports.select_rds_img1 = function(id)
{   
    console.log("指撈出第一張圖",id);
    return new Promise(function(resolve,reject)
    {
        //let select_sql= "select pno, img1 from product_imgtest where pno like '" + id + "%'";
        let select_sql= "select pno, img1 from product_img where pno like '" + id + "%'";
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
                resolve(results);
            }
        });
    });
}

//select imgall to rds
exports.select_rds_imgall = function(id)
{
    return new Promise(function(resolve,reject)
    {
        // let select_sql= "select pno, img1, img2, img3, img4, img5, img6 from product_imgtest where pno = '" + id + "'";
        let select_sql= "select pno, img1, img2, img3, img4, img5, img6 from product_img where pno = '" + id + "'";
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
                        'errmsg':"rds沒有撈到資料"
                    }
                    resolve(JSON.stringify(msg));
                }
            }
        });
    });
}