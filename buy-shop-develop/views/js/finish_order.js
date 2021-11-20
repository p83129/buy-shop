window.onload = function () {

    //確認登入狀態
    checklogin();

    //購物車步驟狀態
    cart_step();

    //訂單編號
    let orderpno = window.location.href.substr(49);
    document.getElementById("order_number").innerText = orderpno;   

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

            let signdelete = document.getElementById("signdelete")
            let orders = document.getElementById("orders")

            let a_change = document.getElementById("a_change")
            let img_div = document.querySelector(".img_div")
            
            signdelete.style.display = "none";
            orders.style.display = "none";

            a_change.setAttribute("href","/login.html")
            img_div.style.display = "none";

            home();

        }
        else {
            // alert(data["errmsg"]);
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

//購物車步驟
function cart_step() {
    let step_panel_step3 = document.querySelector(".step_panel .step_panel_step3");
    step_panel_step3.classList.toggle("action");
}

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