let id = location.pathname.substr(9);


window.onload=function(){    
    //抓商品
    call(id); 

    //確認登入狀態
    checklogin();
}
//呼叫後端
function call(id){
    // window.location.reload();
    let req = new XMLHttpRequest();   
    fetch("/api/product/" + id,{
        method:"GET",   
        //body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["ok"] == true){
            products(data);           

            //alert("查詢成功");
            
        }
        else{ 
            let proot = document.getElementById("proot");
            let pbranch = document.getElementById("pbranch"); 
            let product = document.getElementById("product");
            let location_href = location.href.split("/");

            if(id.substr(0,1) == "1"){
                proot.innerHTML = "國家";
                if(id.substr(3,1) == "1") pbranch.innerHTML = "台灣";
                else if(id.substr(3,1) == "2") pbranch.innerHTML = "日韓";
                else if(id.substr(3,1) == "3") pbranch.innerHTML = "歐美";
                else if(id.substr(3,1) == "4") pbranch.innerHTML = "東南亞";
                else if(id.length == 3) pbranch.innerHTML = "ALL所有";
            }
            else if(id.substr(0,1) == "2"){
                proot.innerHTML = "素食";
                if(id.substr(3,1) == "1") pbranch.innerHTML = "純素/全素";
                else if(id.substr(3,1) == "2") pbranch.innerHTML = "奶蛋素";
                else if(id.substr(3,1) == "3") pbranch.innerHTML = "植物五辛素";
                else if(id.length == 3) pbranch.innerHTML = "ALL所有";
            }     
            else{
                proot.innerHTML = "口味";
                if(id.substr(3,1) == "1") pbranch.innerHTML = "鹹";
                else if(id.substr(3,1) == "2") pbranch.innerHTML = "甜";
                else if(id.substr(3,1) == "3") pbranch.innerHTML = "辣";
                else if(id.length == 3) pbranch.innerHTML = "ALL所有";
            }     
            
            // let product_none = document.getElementById('product_none');
            // product_none.style.display = "block";
            // product_none.style.fontWeight="bold";
            // product_none.style.fontSize="16px";
            // alert("查詢失敗");

            proot.setAttribute("onclick","searchtext_btn()");
            proot.innerHTML = "搜尋";
            pbranch.innerHTML = decodeURI(location_href[3].substring(8));
            product.innerHTML = "查無相關商品...";
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
        //alert(e,"查詢失敗");
    });
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
        let signdelete = document.getElementById("signdelete");
        let orders = document.getElementById("orders");
        let a_change = document.getElementById("a_change");
        let img_div = document.querySelector(".img_div");
        //一般會員登入
        if(data["error"] == null && data.auth == '1'){
            //alert("登入中....");
            
            signdelete.style.display = "block";
            orders.style.display = "block";
            a_change.setAttribute("href","/account_profile.html");
            img_div.style.display = "block";   
            
        }
        //賣家登入
        else if(data.auth == '999'){
            
            signdelete.innerText = '賣家登出';
            orders.innerText = '+新增商品';
            signdelete.style.display = "block";
            orders.style.display = "block";
            orders.setAttribute("onclick","add()");
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

//商品
function products(data){
    for(let i=0; i<data["data"].length; i++){        
        let bigdiv= document.getElementById("product");
        let boxdiv= document.createElement("div");
        boxdiv.className="product_box"
        bigdiv.appendChild(boxdiv);
        
        let image=document.createElement("img");
        image.className="product_img";
        image.setAttribute("src", data["data"][i]["image"]);

        //圖片超連結
        let a = document.createElement("a");
        a.href="/detail:" + data["data"][i]["pno"];
        a.appendChild(image);
        boxdiv.appendChild(a);

        let adddiv2=document.createElement("div");
        adddiv2.className= "product_text";
        boxdiv.appendChild(adddiv2);
        let div2txt= document.createTextNode(data["data"][i]["pname"]);
        adddiv2.appendChild(div2txt);
        

        let adddiv3=document.createElement("div");
        let table = document.createElement("table");
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td1txt= document.createTextNode("NT$" + data["data"][i]["pprice"]);
        let td2txt= document.createTextNode("");

        // 收藏Image
        let img= document.createElement("img");
        img.className="like_img";

        //判斷有無愛心收藏
            if(data['data'][i].likeproduct != ''){
                img.setAttribute("src", "image/redlike_img.png");
            }else{
                img.setAttribute("src", "image/like_img.png");
            }
        

        img.setAttribute("id", i+1);
        img.setAttribute("onclick", "like(" + data["data"][i]["pno"] + "," + (i+1) + ")");

        tr.appendChild(td1);
        td1.className= "td1"
        td1.appendChild(td1txt);
        tr.appendChild(td2);
        td2.className= "td2"
        td2.appendChild(td2txt);
        td2.appendChild(img);
        table.style= "width:100%;"
        table.appendChild(tr);
        adddiv3.appendChild(table);
        boxdiv.appendChild(adddiv3);
    }
    // 商品件數與根目錄
    let title_div = document.querySelector(".title_div");
    let p = document.createElement("p");
    let proot = document.getElementById("proot");
    let pbranch = document.getElementById("pbranch");
    // let location_href = decodeURI(location.href);
    let location_href = location.href.split("/");
    // alert(url[3].substring(8))

    //判斷純文字
    let reg = /^[\u4E00-\u9FA5]+$/ ;
    if (reg.test(decodeURI(location_href[3].substring(8)))) {
        proot.setAttribute("onclick","searchtext_btn()");
        proot.innerHTML = "搜尋";
        if(id.length == 3) pbranch.innerHTML = decodeURI(location_href[3].substring(8));
        else pbranch.innerHTML = decodeURI(location_href[3].substring(8));
	
    }else{
        proot.innerHTML = data['proot'];
        if(id.length == 3) pbranch.innerHTML = "ALL所有";
        else pbranch.innerHTML = data['pbranch'];
    }	
    p.innerText = '共' + data["data"].length + '件商品';
    title_div.appendChild(p);
}

//saerch_btn
function searchtext_btn(){
    let searchtext_div = document.querySelector(".searchtext_div");
    // searchtext_div.classList.toggle("action");
    searchtext_div.style.opacity = '1';
}


//收藏按鈕
function like(pno, i){    
    let img = document.getElementById(i).getAttribute("src");
    if (img!="image/like_img.png"){      
        document.getElementById(i).src="image/like_img.png";
        like_api(pno, 2);
    }
    else{
        document.getElementById(i).src="image/redlike_img.png";
        like_api(pno, 1);
    }
}

function like_api(pno ,status){
    let info={'pno': pno};

    let met = "";

    if(status == 1) met ="post";    
    else met = "delete"; 

    fetch("/api/like",{
        method: met,
        body: JSON.stringify(info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["error"] == null){
        }
        else{                    
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });
    
}

//+新增商品
function add(){
    window.location.href='add.html';
}

//回首頁
function home(){
    window.location.href='/'; 
}
//回大分類
function proot(){
    let id = location.pathname.substr(9, 3);
    window.location.href='/product:'+id;
}
//登入頁面
function login(){
    window.location.href='login.html';
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
            
            let signdelete = document.getElementById("signdelete")
            let orders = document.getElementById("orders")

            let a_change = document.getElementById("a_change")
            let img_div = document.querySelector(".img_div")
            
            signdelete.style.display = "none";
            orders.style.display = "none";

            a_change.setAttribute("href","/login.html")
            img_div.style.display = "none";  

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
//小搜尋按鈕
function search_text(){
    let word = document.getElementById("search_text").value;  
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
//小搜尋ENTER鍵
document.getElementById("search_text").addEventListener("keyup",function(event){
    event.preventDefault();
    if(event.which === 13) {
        document.getElementById("smallsear_btn").click(); 
    }
});