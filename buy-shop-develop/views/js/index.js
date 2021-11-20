window.onload=function(){
    let req = new XMLHttpRequest();   
    fetch("/api/user/" ,{
        method:"GET",   
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["ok"] == true){
            //購物車數量
            let lblCartCount = document.getElementById("lblCartCount");
            lblCartCount.outerHTML= data["data"].length;
            //alert("查詢成功");            
        }
        else{             
            // alert("查詢失敗");
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
        // alert(e,"查詢失敗");
    });

    //確認登入狀態
    checklogin();
}

//圖片輪播
lunBo("slide","lbbtn");

//輪播圖函數
function lunBo(slide,lbbtn){
    let slides = document.getElementsByClassName("slide");
    let lbbtns = document.getElementsByClassName("lbbtn");

    //圖片及標識鍵設置函數（輪播到當前頁面設置透明度爲1，標識按鈕設置爲紅色，其他頁面隱藏）
    function initSet(index){
    for(let i = 0 ; i < slides.length ; i++){
        slides[i].style.opacity = '0';
        lbbtns[i].style.backgroundColor = 'gray';
    }
    slides[index].style.opacity = '1';
    lbbtns[index].style.backgroundColor = '#ffc107';
    }
    //第一張圖片初始化。（最開始時輪播到第一張圖）
    initSet(0);

    //自動輪播函數
    let count = 1; //從第二張圖開始輪播
    function autoMove(){
        if(count == slides.length){
            count = 0;
        }
        initSet(count);
        count ++;
    }
    //設置自動輪播時間
    let scollMove = setInterval(autoMove,3000);

    //監聽按鈕控制跳轉當前圖片函數
    let lbbtn2 = document.querySelector(".lbbtn");
    for(let j = 0 ; j < slides.length ; j++){
        lbbtns[j].onclick = function(){
        clearInterval(scollMove);
        count = j;
        initSet(count);
        scollMove = setInterval(autoMove,3000);
        }
    }
}

// window.onload =function(){
//     pic_count=4;

//     // for(var i=0; i<4; i++){
//     //     var divlist = document.getElementById('list');					
//     //     var img = document.createElement('img');					
//     //     img.className = 'imgsize';
//     //     img.setAttribute("src", 'image/人氣零食.png');
//     //     divlist.appendChild(img);				

//     // }	

//     // 暫時暫時暫時暫時暫時暫時暫時暫時暫時暫時暫時暫時
//     var divlist = document.getElementById('list');					
//     var img = document.createElement('img');					
//     img.className = 'imgsize';
//     img.setAttribute("src", 'image/人氣零食.png');
//     divlist.appendChild(img);	
//     var divlist = document.getElementById('list');					
//     var img = document.createElement('img');					
//     img.className = 'imgsize';
//     img.setAttribute("src", 'image/外國零食.png');
//     divlist.appendChild(img);
//     var divlist = document.getElementById('list');					
//     var img = document.createElement('img');					
//     img.className = 'imgsize';
//     img.setAttribute("src", 'image/素食零食.png');
//     divlist.appendChild(img);
//     var divlist = document.getElementById('list');					
//     var img = document.createElement('img');					
//     img.className = 'imgsize';
//     img.setAttribute("src", 'image/口味零食.png');
//     divlist.appendChild(img);
//     // 暫時暫時暫時暫時暫時暫時暫時暫時暫時暫時暫時暫時

//     var divlist = document.getElementById('list');					
//     var img = document.createElement('img');					
//     img.className = 'imgsize';
//     img.setAttribute("src", 'image/人氣零食.png');
//     divlist.appendChild(img);	
    
    
//     //var allBoxs = ulimg.children;
//     var list = document.getElementById('list');
//     var next = document.getElementById('next');
//     var prev = document.getElementById('prev');
//     var imgdiv = document.getElementById("imgdiv").offsetWidth;
//     //alert(imgdiv);
//     //顯示第一張圖片
//     list.style.left = 0 + 'px';
//     function animate(offset){
//         var newLeft = parseInt(list.style.left) + offset;
//         list.style.left = newLeft + 'px';
//         //滾動判斷
        
//         if (newLeft > -1200) {
//             list.style.left = -1200 * (pic_count) + 'px';
//         }
//         if (newLeft < -1200 * (pic_count)) {
//             list.style.left = -1200 + 'px';
//         }				
//     }	
    
//     next.onclick = function(){
//         animate(1200);
//     }
//     prev.onclick = function(){
//         animate(-1200);
//     }

//     //確認登入狀態
//     checklogin();

// }

// 導入會員登入或註冊新會員
function login(){
    window.location.href='login.html';
}

//確認登入狀態
function checklogin(){
    let req = new XMLHttpRequest(); 
    fetch("/api/user",{
        method:"GET",   
        // body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["error"] == null){
            //alert("登入中....");
            
            let signdelete = document.getElementById("signdelete");
            let orders = document.getElementById("orders");

            let a_change = document.getElementById("a_change");
            let img_div = document.querySelector(".img_div");
            
            signdelete.style.display = "block";
            orders.style.display = "block";

            a_change.setAttribute("href","/account_profile.html");
            img_div.style.display = "block";   
            
        }
        else{                    
            // alert(data["errmsg"]);
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });
    
}

//登出
function signdelete(){
    let req = new XMLHttpRequest(); 
    fetch("/api/user",{
        method:"DELETE",   
        // body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["error"] == null){
            //alert("登出成功");
            
            let signdelete = document.getElementById("signdelete");
            let orders = document.getElementById("orders");

            let a_change = document.getElementById("a_change");
            let img_div = document.querySelector(".img_div");
            
            signdelete.style.display = "none";
            orders.style.display = "none";

            a_change.setAttribute("href","/login.html")
            img_div.style.display = "none";  
 
            home();
        }
        else{                    
            // alert(data["errmsg"]);
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });
    
}

//訂單
function orders(){
    window.location.href='order.html';
}

//回首頁
function home(){
    window.location.href='/'; 
}

//立即結帳
function cart(){
    window.location.href='cart.html';
}

//搜尋按鈕
function search(){
    let word = document.getElementById("search_word").value;  
    if(word == ''){
        alert("請輸入搜尋項目!")
    }else{
        window.location.href='/product:'+ word;
    }
}

//搜尋ENTER鍵
document.getElementById("search_word").addEventListener("keyup",function(event){
    event.preventDefault();
    if(event.which === 13) {
        document.getElementById("search_btn").click(); 
    }
});

