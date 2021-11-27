window.onload = function () {

    //確認登入狀態
    checklogin();

    let req = new XMLHttpRequest();
    fetch("/api/cart/", {
        method: "GET",
        //body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["ok"] == true) {
            cart(data);
            // let product = document.getElementById("product");  
            // product.outerHTML = "共" + data["data"].length + "項商品";
            //alert("查詢成功");  
            //購物車數量
            // let lblCartCount = document.getElementById("lblCartCount");
            // lblCartCount.innerHTML= data["data"].length;
            let total_price = document.getElementById("total_price");
            total_price.innerHTML= data.total;

            let cart_content = document.getElementById("cart");
            let cart_empty = document.getElementById("cart_empty");
            cart_content.style.display = 'block';
            cart_empty.style.display = 'none';  

        }
        else if(JSON.parse(data).error == true){
            //alert(data["errmsg"]);
            // 判斷目前有無購物車
            let cart_content = document.getElementById("cart");
            let cart_empty = document.getElementById("cart_empty");
            cart_content.style.display = 'none';
            cart_empty.style.display = 'block';
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


//訂單
function cart(data){

    //購物車步驟
    let step_panel_step1 = document.querySelector(".step_panel .step_panel_step1");
    step_panel_step1.classList.toggle("action");

    for(let i=0; i<data["data"].length; i++){    
        let product = document.getElementById("product");     
        let div = document.createElement("div");
        let a_img = document.createElement("a");
        let img = document.createElement("img");
        let a_div1 = document.createElement("a");
        let div1 = document.createElement("div");
        //delete_btn
        let div_del_btn = document.createElement("div");
        let a = document.createElement("a");
        let icon = document.createElement("i");
        //
        let p_name = document.createElement("p");
        let p_name_txt = document.createTextNode(data['data'][i].pname);        
        let p_taste = document.createElement("p");
        let p_taste_txt = document.createTextNode(data['data'][i].type);
        let div2 = document.createElement("div");
        let button_cut = document.createElement("button");
        let input = document.createElement("input");
        let button_add = document.createElement("button");
        let span = document.createElement("span");
        let span_txt = document.createTextNode("NT$" + Number(data["data"][i].amount)*Number(data['data'][i].pprice));

        div.className = 'product_size';
        img.className = 'product_img';
        div1.className = 'product_content';
        div_del_btn.className = 'delete_btn';
        icon.className ='fas fa-times';
        p_taste.className = 'product_color';
        div2.className = 'product_num';
        button_cut.className = 'decrease';
        input.className = 'qty';
        button_add.className = 'increase';
        span.className = 'product_price';

        a_img.setAttribute("href","/detail:" + data['data'][i].pno);
        img.setAttribute("src",data["data"][i].image);
        a_div1.setAttribute("href","/detail:" + data['data'][i].pno);
        button_cut.setAttribute("onclick","setQuantity('down',"+i+",'" + data['data'][i].pprice +"','"+ data['data'][i].pno + "','"+data['data'].length+"')");
        button_cut.textContent = "一";
        input.setAttribute("id",i);
        input.setAttribute("disabled","disabled");
        input.setAttribute("value",data["data"][i].amount);
        button_add.setAttribute("onclick","setQuantity('up',"+i+",'" + data['data'][i].pprice +"','"+ data['data'][i].pno +"','"+data['data'].length+"')");
        p_taste.setAttribute("id","taste_"+i);
        span.setAttribute("id",'price' + i);
        
        
        div_del_btn.setAttribute("onclick","delete_btn('" + data['data'][i].pno +"','" + data['data'][i].type + "')");
        
        button_add.textContent = "十";

        
        p_name.appendChild(p_name_txt);
        p_taste.appendChild(p_taste_txt);
        div1.appendChild(p_name);
        div1.appendChild(p_taste);
        a_div1.appendChild(div1);
        // div_del_btn.appendChild(a);
        div_del_btn.appendChild(icon);
        a_img.appendChild(img);
        div.appendChild(a_img);
        div.appendChild(a_div1);
        div.appendChild(div_del_btn);
        div2.appendChild(button_cut);
        div2.appendChild(input);
        div2.appendChild(button_add);
        span.appendChild(span_txt);
        div2.appendChild(span);
        div.appendChild(div2);
        product.appendChild(div);

    }
    

    let h5_num = document.getElementById("h5_num");
    h5_num.outerHTML="共" + data["data"].length + "項商品";

    let h4_num = document.getElementById("h4_num");
    h4_num.innerHTML = "共" + data["data"].length + "項商品";

    let total = document.getElementById("total");
    total.innerHTML =  data.total;  

}


//數量按鈕--數量上限配合庫存
function setQuantity(num,i,price, pno, product_count){
    let amount = document.getElementById(i);
    let product_price = document.getElementById("price"+i);
    let amount_num = amount.value;   

    if(amount.value >= 1){

        if(num == 'up'){
            amount_num = ++amount_num;

            //呼叫更新API
            let req = updatecart(pno, amount_num);
            
        }else if(num == 'down' && amount.value!=1){
            amount_num = --amount_num;

            //呼叫更新API
            let req = updatecart(pno, amount_num);
        } 
        else{
            amount.innerText = '1';
        }
        //即時更新商品數量與金額
        amount.value = amount_num;        
        product_price.innerText = "NT$" + (amount_num * Number(price)); 
        
        //總計
        let total_price = document.getElementById("total");
        let total_sum = 0;
        for(let n=0 ; n<product_count ; n++){

            let product_price = document.getElementById("price"+n);
            let total = product_price.innerText.substr(3,10);
            total_sum += Number(total);   
        }
        total_price.innerHTML =  total_sum;  

    }
}

//更新購物車
function updatecart(value, amount){
    let info ={"pno": value,
                "amount": amount};    
    fetch("/api/cart", {
        method: "PATCH",       
        body: JSON.stringify(info), 
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["error"] == null) {
            //alert('成功');
        }
        else {
           alert('更新失敗，請再試一次~');
        }
    }).catch((e) => {
        console.log(e, "data失敗內容~~~~~~~~~~~")
    });

};

//移除商品
function delete_btn(value, type){
    alert(type);
    alert(value);
    let info ={"pno":value,
                "type":type};    
    fetch("/api/cart", {
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

//回首頁
function home(){
    window.location.href='/'; 
}

//登入
function login(){
    window.location.href='login.html';
}

//立即結帳
function orders(){
    window.location.href='order.html';
}
//結帳
function pay(){
    let total = document.getElementById("total").innerHTML;

    sessionStorage.setItem("total", total);
    
    window.location.href='pay.html';
}