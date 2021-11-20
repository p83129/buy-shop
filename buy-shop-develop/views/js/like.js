window.onload = function () {

    //確認登入狀態
    checklogin();

    let req = new XMLHttpRequest();
    fetch("/api/like/", {
        method: "GET",
        //body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["ok"] == true) {
            like_html(data); 
            let like_empty = document.getElementById("like_empty");
            like_empty.style.display = 'none'; 

            // let lblCartCount = document.getElementById("lblCartCount");
            // lblCartCount.innerHTML= data["data"].length;
            // let total_price = document.getElementById("total_price");
            // total_price.innerHTML= data.total;
        }
        else {
            // alert("沒有相關收藏商品");
            let like_empty = document.getElementById("like_empty");
            like_empty.style.display = 'block';

        }
    }).catch((e) => {
        console.log(e, "data失敗內容~~~~~~~~~~~")
        alert(e, "查詢失敗");
    });

}

//確認登入狀態
function checklogin() {
    let req = new XMLHttpRequest();
    fetch("/api/user", {
        method: "GET",
        // body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["error"] == null) {
            //alert("登入中....");

            let signdelete = document.getElementById("signdelete")
            let orders = document.getElementById("orders")

            let a_change = document.getElementById("a_change")
            let img_div = document.querySelector(".img_div")

            signdelete.style.display = "block";
            orders.style.display = "block";

            a_change.setAttribute("href","/account_profile.html")
            img_div.style.display = "block";

        }
        else {
            alert(data["errmsg"]);
            window.location.href = 'login.html';
        }
    }).catch((e) => {
        console.log(e, "data失敗內容~~~~~~~~~~~")
    });

}
//登出
function signdelete() {
    let req = new XMLHttpRequest();
    fetch("/api/user", {
        method: "DELETE",
        // body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["error"] == null) {
            //alert("登出成功");

            home();

        }
        else {
            // alert(data["errmsg"]);
        }
    }).catch((e) => {
        console.log(e, "data失敗內容~~~~~~~~~~~")
    });

}

//收藏頁面
function like_html(data){

    for(let n=0 ; n<data['data'].length ; n++){
        //創元素
        let div_center = document.getElementById("center");
        let div_wishList = document.createElement("div");
        let img_a = document.createElement("a");
        let img = document.createElement("img");
        let div_flex = document.createElement("div");
        let div_flex1 = document.createElement("div");
        let a_name = document.createElement("a");
        let div_Name = document.createElement("div");
        let div_pName_delBtn = document.createElement("div");
        let a = document.createElement("a");
        let i = document.createElement("i");
        let div_price_cart = document.createElement("div");
        let p_price = document.createElement("p");
        
        //新增classname
        div_wishList.className = 'div_wishList';
        div_flex.className = 'div_flex';
        div_flex1.className = 'div_flex1';
        div_Name.className = 'div_Name';
        a_name.className = 'div_Name';
        div_pName_delBtn.className = 'div_pName_delBtn';
        i.className = 'fas fa-times';
        div_price_cart.className = 'div_price_cart';

        //新增屬性
        img_a.setAttribute("href","/detail:" + data['data'][n].pno);
        img.setAttribute("src",data['data'][n].image);
        a_name.setAttribute("href","/detail:" + data['data'][n].pno);
        let p_name= document.createTextNode(data['data'][n].pname);
        a.setAttribute("href","#");
        i.setAttribute("onclick","delete_btn('" + data['data'][n].pno + "')");
        p_txt = document.createTextNode("NT$" + data['data'][n].pprice);

        //串接元素
        div_Name.appendChild(p_name);
        a.appendChild(i);
        div_pName_delBtn.appendChild(a);
        a_name.appendChild(div_Name);
        div_flex1.appendChild(a_name);
        div_flex1.appendChild(div_pName_delBtn);
        p_price.appendChild(p_txt);
        div_price_cart.appendChild(p_price);
        div_flex.appendChild(div_flex1);
        div_flex.appendChild(div_price_cart);
        img_a.appendChild(img);  
        div_wishList.appendChild(img_a);
        div_wishList.appendChild(div_flex);  
        div_center.appendChild(div_wishList);    
    }
}

//刪除收藏
function delete_btn(value){
    // alert(value);
    let info ={"pno":value};    
    fetch("/api/like", {
        method: "DELETE",       
        body: JSON.stringify(info), 
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["error"] == null) {
            alert('刪除成功');
            window.location.reload();
        }
        else {
           alert('刪除失敗');
        }
    }).catch((e) => {
        console.log(e, "data失敗內容~~~~~~~~~~~")
    });

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

//登入頁面
function login() {
    window.location.href = 'login.html';
}

//訂單
function orders() {
    window.location.href = 'order.html';
}

//回首頁
function home() {
    window.location.href = '/';
}

//立即結帳
function cart() {
    window.location.href = 'cart.html';
}