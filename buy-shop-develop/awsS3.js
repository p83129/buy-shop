const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const router = express.Router();

const app = express();
app.use(express.json()); 

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}));

const ACCESS_KEY = 'AKIA4Y23VAHZ32B7QG5O'
const SECRET_KEY = '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'

const AWS = require("aws-sdk");
const fs = require("fs");

const aws = {
  accessKeyId: "AKIA4Y23VAHZ32B7QG5O",
  secretAccessKey: "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",
  bucket: "s3mytestbucket2021",
  acl: "private",
};

AWS.config.credentials = {
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
};
AWS.config.region = "ap-northeast-1";
const s3Client = new AWS.S3();

// //上傳圖片
// exports.S3update = function(req)
// {
//     return new Promise(function(resolve,reject){
//         console.log("近來S3");
//         let result = null;
//         try {
//             console.log("tempPath", req["tempPath"]);
//             console.log("fileName", req["fileName"]);

//           result = saveToS3(req["tempPath"], req["fileName"]);
//         } catch (error) {
//             msg = {
//                 'ok':true
//             };
//             resolve(JSON.stringify(msg))
//         } finally {
//           console.dir(result);         
//         }
//     }
// )};









// async function upload(tempPath, fileName) {
//     let result = null;
//     try {
//       result = await saveToS3(tempPath, fileName);
//     } catch (error) {
//       result = error;
//     } finally {
//       console.dir(result);
//     }
// }








// //S3
// const ACCESS_KEY = 'AKIA4Y23VAHZ32B7QG5O'
// const SECRET_KEY = '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'

// const AWS = require("aws-sdk");
// AWS.config.update({region: 'ap-northeast-1'});
// const fs = require("fs");

// const aws = {
//   accessKeyId: "AKIA4Y23VAHZ32B7QG5O",
//   secretAccessKey: "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",
//   bucket: "s3mytestbucket2021",
//   acl: "private",
// };

// AWS.config.credentials = {
//   accessKeyId: aws.accessKeyId,
//   secretAccessKey: aws.secretAccessKey,
// };
// AWS.config.region = "ap-northeast-1";
// const s3Client = new AWS.S3();

// //上傳圖片
// exports.S3update = function(req)
// {
//     return new Promise(function(resolve,reject){
//         console.log("近來S3");
//         let result = null;
//         try {
//             console.log("tempPath", req["tempPath"]);
//             console.log("fileName", req["fileName"]);

//           result = saveToS3(req["tempPath"], req["fileName"]);
//         } catch (error) {
//             let msg = {
//                 'ok':true
//             };
//             resolve(JSON.stringify(msg))
//         } finally {
//           console.dir(result);         
//         }
//     }
// )};





// const fs = require("fs");
// // var s3 = require('s3');
// //var s3 = new AWS.S3({signatureVersion: 'v4', region:'ap-northeast-1'});
// // const s3 = new AWS.S3();
// const S3 = require('aws-sdk/clients/s3');

// var client = s3.createClient({
//     maxAsyncS3: 20,     // this is the default
//     s3RetryCount: 3,    // this is the default
//     s3RetryDelay: 1000, // this is the default
//     multipartUploadThreshold: 20971520, // this is the default (20 MB)
//     multipartUploadSize: 15728640, // this is the default (15 MB)
//     s3Options: {
//         accessKeyId: 'AKIA4Y23VAHZ32B7QG5O',
//         secretAccessKey: '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',
//         region: 'ap-northeast-1',
//     },
// });
 






 
// var AWS = require('aws-sdk');
// // AWS.config.loadFromPath('./config/config.json');
// //加载访问密匙 密匙在AWS后台用户管理中得到
// var s3client = new AWS.S3({region:'ap-northeast-1'});
// //初始化SDK S3操作对象
// //关于AWS服务区可参见：https://blog.csdn.net/m0_37263637/article/details/79226121
 
// exports.upload = function(file,path){
//     return new Promise(function (resolve, reject) {
//         var params = {
//             localFile: file.path,
//             s3Params: {
//                 Bucket: 's3mytestbucket2021',
//                 Key: path,  
//             },
//         };
//         var uploader = client.uploadFile(params);
//         uploader.on('error', function(err) {
//             console.log("unable to upload", err.stac)
//             reject(false);
//         });
//         uploader.on('progress', function() {
//             console.log("progress", uploader.progressMd5Amount,uploader.progressAmount, uploader.progressTotal);
//         });
//         uploader.on('end', function() {   
//             console.log("done uploading");
//             resolve(true);
//         });
 
//     });
    
// }

module.exports = router;
  