// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


//復原
// const express = require("express");
// const app = express();

// app.set('view engine', 'ejs'); 
// app.use(express.static(__dirname + '/views'));

//test
  
const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const app = express();
let engine = require('ejs-locals');

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json()); 
//app.use(express.json({limit : "2100000kb"}));
var multer  = require('multer');
var modifydata = multer();
app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'goodday',
    resave:false,
    saveUninitialized:true
}))


app.get("/", function(req, res){
    res.render('index');
});
app.get("/product:type", function(req, res){
    res.render('product');
});
app.get("/detail:id", function(req, res){
    res.render('detail');
});




const user = require('./items/member');
app.use('/api',user);

const newproduct = require('./items/upproduct');
app.use('/api',newproduct);

const product = require('./items/product');
app.use('/api',product);

const product_detail = require('./items/product_detail');
app.use('/api',product_detail);

const cart = require('./items/cart');
app.use('/api',cart);

const profile = require('./items/profile');
app.use('/api',profile);

const like = require('./items/like');
app.use('/api',like);

const pay = require('./items/pay');
app.use('/api',pay);

const orders = require('./items/orders');
app.use('/api',orders);

const comment = require('./items/comment');
app.use('/api',comment);










// app.listen(3000, function(err)
// {
//     if (err) console.log(err); 
//     console.log("Server listening on PORT", 3000); 
// });
app.listen(5000, function(){
    console.log('Example app listening at http://localhost:5000')
  });