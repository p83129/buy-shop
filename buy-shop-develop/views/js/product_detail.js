
let temp_type="";
// let member ="";

window.onload=function(){
    let id = location.pathname.substr(8);
    //alert(id);  
    fetch("/api/detail/" + id,{
        method:"GET",   
        //body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["ok"] == true){
            detail(data);
            // member = data.email;
            //alert("查詢成功");       
        }
        else{             
            alert("查詢失敗");
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
        //alert(e,"查詢失敗");
    });

    //確認登入狀態
    checklogin()

}

//商品詳細
function detail(data){
    let proot = document.getElementById("proot");
    let pbranch = document.getElementById("pbranch"); 
    let img1 = document.getElementById("img1");
    let pname = document.getElementById("pname");
    let price = document.getElementById("price");
    let ptype = document.getElementById("ptype");
    let imgall = document.getElementById("imgall");
    let product_info = document.getElementById("product_info");
  

    proot.innerHTML = data["proot"];
    pbranch.innerHTML = data["pbranch"];
    img1.src = data["data"][0].image[0];
    pname.innerHTML = data["data"][0].pname;
    price.innerHTML = "NT$" + data["data"][0].pprice;
    product_info.innerHTML = data["data"][0].pcontent;
    
    //口味按鈕
    for(let i = 0; i< data["data"][0].ptype.length; i++){
        let li = document.createElement("button");
        li.className = "input_button ";
        li.textContent = data["data"][0].ptype[i];

        li.setAttribute("id",i+1);
        li.setAttribute("value",this.disabled=false);
        li.setAttribute("onclick","type_num("+(i+1)+")");
        ptype.appendChild(li);
    }   

    //商品圖片
    for(let i = 0; i< data["data"][0].image.length; i++){
        let image=document.createElement("img");
        image.className= "img_style";

        image.setAttribute("src", data["data"][0].image[i]);
        imgall.appendChild(image);
    }

    //收藏愛心
    let img = document.getElementById("like_btn");
    if(data["data"][0].likeproduct == ''){
        img.setAttribute("src", "image/like_img.png");
        
    }else{
        img.setAttribute("src", "image/redlike_img.png");
    }
}

//收藏按鈕
function like(){    
    let pno = decodeURI(location.href).substring(29);
    let img = document.getElementById("like_btn").getAttribute("src");
    if (img!="image/like_img.png"){      
        document.getElementById("like_btn").src="image/like_img.png";
        like_api(pno, 2);
    }
    else{
        document.getElementById("like_btn").src="image/redlike_img.png";
        like_api(pno, 1);
    }
}

// 口味按鈕
function type_num(i){

    let type_id = document.getElementById(i);
    let input_button = document.getElementsByClassName("input_button");
    
    for(let n=1 ; n<=input_button.length ; n++){
        let type_id1 = document.getElementById(n);
        type_id1.classList.remove("active");
    }
          
    type_id.classList.toggle("active");
    temp_type= document.getElementById(i).innerHTML;
    // alert(temp_type);
}


//----------------------------評論區----------------------------
//數量按鈕--數量上限配合庫存
function setQuantity(num){
    let amount = document.getElementById("amount");
    if(amount.value > 1){
        if(num == 'up'){
            amount.innerText = ++amount.value;
        }else if(num == 'down'){
            amount.innerText = --amount.value;
        }       
    }
    if(amount.value == 1){
        if(num == 'up'){
            amount.innerText = ++amount.value;
        }else{
            amount.innerText = '1';
        }
    }
}

//製作一個星星評分
let divStars = document.getElementById("stars");
let divComment = document.getElementById("comment");
divComment.className = 'star_width';
// let attitude = ["差", "較差", "一般", "好", "很好"];
let starNum = -1; //記錄當前第幾顆星星被點擊
let starArray = Array.from(divStars.children); //星星數組

//滑鼠移入
divStars.onmouseover = function (e) {
    if (e.target.tagName === "IMG") { //事件源是圖片
        //把滑鼠移動到的星星替換圖片
        e.target.src = "./image/shiny.png";
        //把滑鼠移動到的星星之前的星星替換圖片
        let prev = e.target.previousElementSibling;
        while (prev) {
            prev.src = "./image/shiny.png";
            prev = prev.previousElementSibling;
        }
        //把滑鼠移動到的星星之後的星星替換圖片
        let next = e.target.nextElementSibling;
        while (next) { //把滑鼠移動到的星星之後的星星替換圖片
            next.src = "./image/star.png";
            next = next.nextElementSibling;
        }

        let index = starArray.indexOf(e.target); //找到滑鼠移動到的星星的序號
        // divComment.innerHTML = attitude[index]; //顯示對應的評論
    }
}


//滑鼠點擊
divStars.onclick = function (e) {
    if (e.target.tagName === "IMG") {
        //記錄當前點擊的星星序號
        starNum = starArray.indexOf(e.target);       
    }
}

//滑鼠移出
divStars.onmouseout = function (e) {
    if (starNum !== -1) { //滑鼠點擊事件發生，將評分固定在點擊的星星上
        for (let i = 0; i < divStars.children.length; i++) {
            if (i <= starNum) {
                divStars.children[i].src = "./image/shiny.png";
                
            } else {
                divStars.children[i].src = "./image/star.png";
            }
        }
        // divComment.innerHTML = attitude[starNum]; //顯示對應的評論
    } else {
        for (let i = 0; i < divStars.children.length; i++) {
            divStars.children[i].src = "./image/star.png";
        }
        divComment.innerHTML = ""; //不顯示評論
    }
}

//限制字數
let maxl=300; //總長度
function sizecontrol(){
    let size=document.getElementById("text_amount").value.length;
    if(size>maxl)document.getElementById("text_amount").value=document.getElementById("text_amount").value.substr(0,maxl)
    else document.getElementById("count").innerHTML=size+"/"+maxl
}


//留言板
function message(e){

    let message_txt = document.getElementById("message_txt");
    let cancel = document.getElementById("cancel");
    let submit = document.getElementById("submit");
    let write = document.getElementById("write");
    let text_amount = document.getElementById("text_amount").value;

    let tr = document.createElement('tr');
    let th_menber = document.createElement('td');
    let th_message = document.createElement('td');

    let pno = location.href.substr(29, 7);

    if(e == '1'){
        message_txt.style.display = 'block';
        cancel.style.display = 'inline-block';
        submit.style.display = 'inline-block';
        write.style.display = 'none';
        
    }else if(e == '3'){
        message_txt.style.display = 'none';
        cancel.style.display = 'none';
        submit.style.display = 'none';
        write.style.display = 'inline-block';

        if(text_amount == "" || text_amount == null){
            alert("請寫下您的感想 @_@");
            message_txt.style.display = 'block';
            cancel.style.display = 'inline-block';
            submit.style.display = 'inline-block';
            write.style.display = 'none';

        }else{
            let warn = confirm("送出以後便無法更改留言，請問確定送出嗎？");

            if(warn == false){
                message_txt.style.display = 'block';
                cancel.style.display = 'inline-block';
                submit.style.display = 'inline-block';
                write.style.display = 'none';
            }
            else{               
                //新增留言
                //會員
                th_menber.className = 'border_style txt_thin';
                // th_menber.innerText = member;
                tr.appendChild(th_menber);
                //留言
                th_message.className = 'border_style txt_thin';
                th_message.setAttribute("value" ,text_amount);
                th_message.innerText = text_amount;
                tr.appendChild(th_message);

                //星星
                let td_star = document.createElement('td');
                let div = document.createElement('div');           
                let count = starNum + 1;
            
                imageObj = new Image();
                images = new Array();
                for(let i=0 ; i<5 ; i++){
                    if(i<count){ 
                        images[i]="image/shiny.png";
                    }else{
                        images[i] = "image/star.png";
                    }
                }
            
                td_star.className = 'border_style txt_thin';
                div.setAttribute("id" , "stars");
                div.className = 'left';
                
                for(let j=0 ; j<5 ; j++){
                    imageObj.src = images[j];
                    // console.log(imageObj.src);
                    let img = document.createElement('img');
                    img.className = 'star_width';
                    img.setAttribute("id" ,j+1);
                    
                    img.setAttribute('src',imageObj.src);
                    div.appendChild(img);
                }
            
                td_star.appendChild(div);
                tr.appendChild(td_star);
                table_content.appendChild(tr);

                //新增評論
                let info ={"pno":pno,
                            "star": count,
                            "comment":text_amount};   
                fetch("/api/comment" ,{
                    method:"POST",
                    body: JSON.stringify(info),               
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    if(data["ok"] == true){                
                        alert("新增成功");  
                        write.style.display = 'none';                
                    }
                    else{             
                        alert(data["errmsg"]);
                    }
                }).catch((e) => {
                    console.log(e,"data失敗內容~~~~~~~~~~~")
                    //alert(e,"檢查失敗");
                });

            }
        } 
    }else{
        message_txt.style.display = 'none';
        cancel.style.display = 'none';
        submit.style.display = 'none';
        write.style.display = 'block';
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

//回首頁
function home(){
    window.location.href='/'; 
}
//回大分類
function proot(){
    let id = location.pathname.substr(8, 3);
    window.location.href='/product:'+id;
}

//確認登入狀態
function checklogin(){
    fetch("/api/user",{
        method:"GET",   
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

            getcomment();
            
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
            
            //未登入 不顯示評論按鈕
            document.getElementById("write").style.display = "none";
            getcomment();

        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });
    
}

//put_comment
function put_comment(){
    let pno = location.href.substr(29, 7);  
    let write = document.getElementById("write"); 
        fetch("/api/comment/" +pno ,{
            method:"PUT",               
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data["ok"] == true){ 
                //有購買商品但沒有評論紀錄               
                alert("檢查成功");                                  
                write.style.display = 'block';     
            }
            else{             
                //(data["msg"]);
                write.style.display = 'none';
            }
        }).catch((e) => {
            console.log(e,"data失敗內容~~~~~~~~~~~")
            //alert(e,"檢查失敗");
        });
}

//get comment
function getcomment(){
    let pno = location.href.substr(29, 7); 
    fetch("/api/comment/" + pno,{
        method:"GET",    
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["error"] == null){
        //    alert("get success");
           comment_content(data);
           put_comment();
        }
        else{                    
            //alert(data["errmsg"]);
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });
}

//留言內容
function comment_content(data){

    let table_content = document.getElementById("table_content");
    for(let n = 0 ; n < data.length ; n++){
        let tr = document.createElement('tr');
        let td_menber = document.createElement('td');
        let td_message = document.createElement('td');
        //星星
        let td_star = document.createElement('td');
        let div = document.createElement('div');
        let count = data[n].star;

        imageObj = new Image();
        images = new Array();
        for(let i=0 ; i<5 ; i++){
            if(i<count){ 
                images[i]="image/shiny.png";
            }else{
                images[i] = "image/star.png";
            }
        }

        div.setAttribute("id" , "stars");
        div.className = 'left';
        
        for(let j=0 ; j<5 ; j++){
            // let imageObj = new Image();
            imageObj.src = images[j];
            let img = document.createElement('img');
            img.className = 'star_width';
            img.setAttribute("id" ,j+1);
            
            img.setAttribute('src',imageObj.src);
            div.appendChild(img);
        }

        td_menber.innerText = data[n].email;
        td_message.innerText = data[n].comment;

        td_menber.className = 'border_style txt_thin';
        td_message.className = 'border_style txt_thin';
        td_star.className = 'border_style txt_thin';

        tr.appendChild(td_menber);
        tr.appendChild(td_message);
        td_star.appendChild(div);
        tr.appendChild(td_star);
        table_content.appendChild(tr);
    }

}

//登出
function signdelete(){
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

//+新增商品
function add(){
    window.location.href='add.html';
}

//登入頁面
function login(){
    window.location.href='login.html';
}

//訂單
function orders(){
    window.location.href='order.html';
}

//加入購物車
function add_cart(){
    let pno = location.pathname.substr(8);
    let amount = Number(document.getElementById("amount").value);  

    //口味
    let add_cart ={
        'pno':pno,
        'amount':amount,
        'type':temp_type
    };
    if(temp_type == ''){
        alert("請選擇食品口味!");
    }else{
        fetch("/api/cart",{
            method:"POST",   
            body: JSON.stringify(add_cart),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data["error"] == null){
                alert("加入成功");  
            }
            else{                    
                //(data["errmsg"]);
            }
        }).catch((e) => {
            console.log(e,"data失敗內容~~~~~~~~~~~")
        });
    }
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

//訂單查詢
function order(){
    window.location.href='order.html';
}
//立即結帳
function cart(){
    window.location.href='cart.html';
}