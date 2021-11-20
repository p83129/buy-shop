window.onload = function () {

    //確認登入狀態
    checklogin();

    let req = new XMLHttpRequest();
    fetch("/api/orders/", {
        method: "GET",
        //body: JSON.stringify(signin_info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["error"] == null) {
            order(data);          
        }
        else {
            // alert("查詢失敗");
            // 無訂單資料
            let no_order = document.getElementById("no_order");
            no_order.style.display = 'block';
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

            a_change.setAttribute("href", "/login.html")
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

function order(data){

    let center = document.querySelector(".center");
    for(let i = 0 ; i < data.length ; i++){

        let div_order = document.createElement("div");
        let div_orderTitle = document.createElement("div");
        let title_table = document.createElement("table");
        let title_tr = document.createElement("tr");
        let th_day = document.createElement("th");
        let th_pno = document.createElement("th");
        let th_price = document.createElement("th");
        let order_day = document.createTextNode("訂購日期");
        let order_pno = document.createTextNode("訂單編號");
        let order_price = document.createTextNode("應付金額");
        let order_tr = document.createElement("tr");
        let td_day = document.createElement("td");
        let td_pno = document.createElement("td");
        let td_price = document.createElement("td");
        let text_day = document.createTextNode(data[i].day);
        let text_pno = document.createTextNode(data[i].orderpno);
        let text_price = document.createTextNode("NT." + data[i].total);
        //訂單明細
        let a = document.createElement("a");
        let text_a = document.createTextNode("+ 訂單明細");
        let div_orderList = document.createElement("div");
        let h5 = document.createElement("h5");
        let text_h5 = document.createTextNode("訂單編號:"+data[i].orderpno);
        let table = document.createElement("table");
        let tr = document.createElement("tr");
        let th_pname = document.createElement("th");
        let th_no = document.createElement("th");
        let th_type = document.createElement("th");
        let th_amount = document.createElement("th");
        let th_money = document.createElement("th");
        let th_sumprice = document.createElement("th");
        let pno_name = document.createTextNode("商品名稱");
        let pno = document.createTextNode("編號");
        let pno_type = document.createTextNode("口味");
        let pno_amount = document.createTextNode("數量");
        let pno_price = document.createTextNode("單價");
        let pno_sumprice = document.createTextNode("小計");
        //先不要~~~~
        // let detail_price = document.createElement("div");
        // let ul = document.createElement("ul");
        // let li = document.createElement("li");
        // let span = document.createElement("span");
        // let span_pay = document.createTextNode("應付金額");
        // let span_price = document.createElement("span");
        // let sum_price = document.createTextNode("NT." + data[i].total);

        div_order.className = 'div_order';
        div_orderTitle.className = 'div_orderTitle';
        a.className = 'orderDetail';
        div_orderList.className = 'div_orderList';
        // detail_price.className = 'detail_price';

        a.setAttribute("onclick","order_listbtn(" + i + ")");
        div_orderList.setAttribute("id",i);
        th_pname.style.width = '45%';
        // list_a.setAttribute("href","#");


        th_day.appendChild(order_day);
        th_pno.appendChild(order_pno);
        th_price.appendChild(order_price);
        title_tr.appendChild(th_day);
        title_tr.appendChild(th_pno);
        title_tr.appendChild(th_price);
        td_day.appendChild(text_day);
        td_pno.appendChild(text_pno);
        td_price.appendChild(text_price);
        order_tr.appendChild(td_day);
        order_tr.appendChild(td_pno);
        order_tr.appendChild(td_price);
        title_table.appendChild(title_tr);
        title_table.appendChild(order_tr);
        div_orderTitle.appendChild(title_table);
        div_order.appendChild(div_orderTitle);
        a.appendChild(text_a);
        div_order.appendChild(a);
        th_pname.appendChild(pno_name);
        th_no.appendChild(pno);
        th_type.appendChild(pno_type);
        th_amount.appendChild(pno_amount);
        th_money.appendChild(pno_price);
        th_sumprice.appendChild(pno_sumprice);
        tr.appendChild(th_pname);
        tr.appendChild(th_no);
        tr.appendChild(th_type);
        tr.appendChild(th_amount);
        tr.appendChild(th_money);
        tr.appendChild(th_sumprice);
        table.appendChild(tr);
        h5.appendChild(text_h5);
        div_orderList.appendChild(h5);
        // span.appendChild(span_pay);
        // span_price.appendChild(sum_price);

        for(let j = 0 ; j<data[i].detail.length ; j++){
            
            let list_tr = document.createElement("tr");
            let list_pname = document.createElement("td");
            let list_a = document.createElement("a");
            let list_span = document.createElement("span");
            let list_pno = document.createElement("td");
            let list_type = document.createElement("td");
            let list_amount = document.createElement("td");
            let list_price = document.createElement("td");
            let list_sumprice = document.createElement("td");
            let text_pname = document.createTextNode(data[i].detail[j].name);
            let text_no = document.createTextNode(data[i].detail[j].pno);
            let text_type = document.createTextNode(data[i].detail[j].type);
            let text_amount = document.createTextNode(data[i].detail[j].amount);
            let text_money = document.createTextNode("NT." + data[i].detail[j].price);
            let text_sumprice = document.createTextNode("NT." + data[i].detail[j].amount*data[0].detail[j].price);

            list_a.setAttribute("href","#");

            list_span.appendChild(text_pname);
            list_a.appendChild(list_span);
            list_pname.appendChild(list_a);
            list_pno.appendChild(text_no);
            list_type.appendChild(text_type);
            list_amount.appendChild(text_amount);
            list_price.appendChild(text_money);
            list_sumprice.appendChild(text_sumprice);
            list_tr.appendChild(list_pname);
            list_tr.appendChild(list_pno);
            list_tr.appendChild(list_type);
            list_tr.appendChild(list_amount);
            list_tr.appendChild(list_price);
            list_tr.appendChild(list_sumprice);
            table.appendChild(list_tr);
            div_orderList.appendChild(table);
            // div_orderList.appendChild(detail_price);
            div_order.appendChild(div_orderList);
            center.appendChild(div_order);
            
        }
        
    }    

}

// + 訂單明細
function order_listbtn(id){
    let div_orderList = document.getElementsByClassName("div_orderList");
    div_orderList[id].classList.toggle("action");
    
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