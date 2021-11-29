window.onload = function () {

    // document.cookie = "price123="+ "price";
    // let price = document.cookie;//getCookie("price");
    // let price = sessionStorage.getItem("price");
    // let aaaa = sessionStorage.getItem("aaaa");
    // alert(price);
    // alert(aaaa);


    //確認登入狀態
    checklogin();

    //購物車步驟狀態
    cart_step();

    // let req = new XMLHttpRequest();
    // fetch("/api/pay/", {
    //     method: "GET",
    //     //body: JSON.stringify(signin_info),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // }).then((response) => {
    //     return response.json();
    // }).then((data) => {
    //     if (data["ok"] == true) {
    //         // cart(data);
    //         //alert("查詢成功");            
    //     }
    //     else {
    //         alert("查詢失敗");
    //     }
    // }).catch((e) => {
    //     console.log(e, "data失敗內容~~~~~~~~~~~")
    //     alert(e, "查詢失敗");
    // });

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

            document.getElementById("user_email").value = data["email"];
            document.getElementById("user_name").value = data["name"];
            document.getElementById("phone").value = data["phone"];
            
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


//信用卡認證
TPDirect.setupSDK(20462, 'app_9wwHhgtaFunjEDO1BbGZh6FcTR0IrpcvuzOQmwxWk6qBCMcVdWjbDmVaryjN', 'sandbox')
    
TPDirect.card.setup({
    fields: {
        number: {
            element: document.getElementById('card-number'),
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: document.getElementById('card-ccv'),
            placeholder: '後三碼'
        }
    },
    styles: {
        'input': {
            'color': 'gray'
        },
        'input.ccv': {
            // 'font-size': '16px'
        },
        ':focus': {
            'color': 'black'
        },
        '.valid': {
            'color': 'green'
        },
        '.invalid': {
            'color': 'red'
        },
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
})

//var form1 = document.forms["myform"];
var btn = document.getElementsByClassName('.text_hello .button');
var cardtype1 = document.getElementById('cardtype');

TPDirect.card.onUpdate(function (update) {
    /* Disable / enable submit button depend on update.canGetPrime  */
    /* ============================================================ */

    // update.canGetPrime === true
    //     --> you can call TPDirect.card.getPrime()
    // const submitButton = document.querySelector('button[type="submit"]')
    if (update.canGetPrime) {
        // submitButton.removeAttribute('disabled')
        btn.prop('disabled',false);
    } else {
        // submitButton.setAttribute('disabled', true)
        btn.setAttribute('disabled', true);
    }


    /* Change card type display when card type change */
    /* ============================================== */

    // cardTypes = ['visa', 'mastercard', ...]
    var newType = update.cardType === 'unknown' ? '' : update.cardType
    cardtype1.text(newType)



    /* Change form-group style when tappay field status change */
    /* ======================================================= */

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        setNumberFormGroupToError('.card-number-group')
    } else if (update.status.number === 0) {
        setNumberFormGroupToSuccess('.card-number-group')
    } else {
        setNumberFormGroupToNormal('.card-number-group')
    }

    if (update.status.expiry === 2) {
        setNumberFormGroupToError('.expiration-date-group')
    } else if (update.status.expiry === 0) {
        setNumberFormGroupToSuccess('.expiration-date-group')
    } else {
        setNumberFormGroupToNormal('.expiration-date-group')
    }

    if (update.status.cvc === 2) {
        setNumberFormGroupToError('.cvc-group')
    } else if (update.status.cvc === 0) {
        setNumberFormGroupToSuccess('.cvc-group')
    } else {
        setNumberFormGroupToNormal('.cvc-group')
    }
})

function finish_order(e) {
    
    //聯絡資訊不為空--->記得開!!!!!HAHAHAHAHA~~@__@
    // let user_name = document.getElementById("user_name").value;
    // let phone = document.getElementById("phone").value;
    // let error_name = document.getElementById("error_name");
    // let error_phone = document.getElementById("error_phone");

    // if(user_name == "" || phone == ""){
    //     alert("請填寫聯絡信箱或手機號碼!");
    //     if(user_name == ""){
    //         error_name.style.display = 'inline-block';
    //     }else{
    //         error_name.style.display = 'none';
    //     }
    //     if(phone == ""){
    //         error_phone.style.display = 'inline-block';
    //     }else{
    //         error_phone.style.display = 'none';
    //     }
    //     return;
    // }
    

    e.preventDefault()

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('請確認信用卡填寫是否正確')
        return;
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            alert('get prime error ' + result.msg)
            return;
        }
        else{
            //alert('get prime 成功，prime: ' + result.card.prime)

            //建立新的訂單，並完成付款程序
            pay(result.card.prime);

        }
        
        // send prime to your server, to pay with Pay by Prime API .
        // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    })
}

function setNumberFormGroupToError(selector) {
    document.getElementsByClassName('selector').addClass('has-error')
    document.getElementsByClassName('selector').removeClass('has-success')
}

function setNumberFormGroupToSuccess(selector) {
    document.getElementsByClassName('selector').removeClass('has-error')
    document.getElementsByClassName('selector').addClass('has-success')
}

function setNumberFormGroupToNormal(selector) {
    document.getElementsByClassName('selector').removeClass('has-error')
    document.getElementsByClassName('selector').removeClass('has-success')
}

function forceBlurIos() {
    if (!isIos()) {
        return
    }
    var input = document.createElement('input')
    input.setAttribute('type', 'text')
    // Insert to active element to ensure scroll lands somewhere relevant
    document.activeElement.prepend(input)
    input.focus()
    input.parentNode.removeChild(input)
}

function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
//信用卡認證------------------------------------------------------------------------------

//orders
function pay(prime){
    // let price = getCookie("price");
    // alert(price);
    let name = document.getElementById("user_name").value;
    let phone = document.getElementById("phone").value;
    let total = sessionStorage.getItem("total");
    let info = {"prime":prime,
                "name":name,
                "phone":phone,
                "total":total}; 

    fetch("/api/pay", {
        method: "POST", 
        body:JSON.stringify(info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["error"] == null) {
            alert(data.msg);
            //訂單完成頁面
            window.location.href = 'finish_order.html?orderpno=' + data.orderpno;
        }
        else {
            alert(data.errmsg);
        }
    }).catch((e) => {
        console.log(e, "data失敗內容~~~~~~~~~~~")
    });
}

//+新增商品
function add(){
    window.location.href='add.html';
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
    let step_panel_step2 = document.querySelector(".step_panel .step_panel_step2");
    step_panel_step2.classList.toggle("action");
}

//登入頁面
function login() {
    window.location.href = 'login.html';
}

//訂單
function search_order() {
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

