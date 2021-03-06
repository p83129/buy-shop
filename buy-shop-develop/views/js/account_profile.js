// window.onload=function(){
//     //確認登入狀態
//     checkprofile();  
// }

//記住使用者密碼
let user_password;

//確認登入狀態
window.onload=function(){

    fetch("/api/profile",{
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
        if(data["error"] == null && data[0].auth == '1'){
            //alert("登入中....");   
            signdelete.style.display = "block";
            orders.style.display = "block";
            a_change.setAttribute("href","/account_profile.html");
            img_div.style.display = "block";   

            //接會員資料
            document.getElementById("pid").value = data.id;
            document.getElementById("pemail").value = data[0].email;
            document.getElementById("pname").value = data[0].username;
            document.getElementById("pphone").value = data[0].phone;
            document.getElementById("paddress").value = data[0].address;           
        }
        //賣家登入
        else if(data[0].auth == '999'){
            // alert("賣家登入")            
            signdelete.innerText = '賣家登出';
            orders.innerText = '+新增商品';
            signdelete.style.display = "block";
            orders.style.display = "block";
            orders.setAttribute("onclick","add()");
            a_change.setAttribute("href","/account_profile.html");
            img_div.style.display = "block"; 

            //接會員資料
            document.getElementById("pid").value = data[0].id;
            document.getElementById("pemail").value = data[0].email;
            document.getElementById("pname").value = data[0].username;
            document.getElementById("pphone").value = data[0].phone;
            document.getElementById("paddress").value = data[0].address;
        }
        else{                    
            //alert(data["errmsg"]);
            window.location.href='login.html';
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });       
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
            
            home();
        }
        else{                    
            // alert(data["errmsg"]);
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });
    
}

//修改基本資料
function change(){    
    let pname = document.getElementById("pname").value;
    let pphone = document.getElementById("pphone").value;
    let paddress = document.getElementById("paddress").value;    
    let info = {
        "username": pname,
        "address": paddress,
        "phonenum": pphone
    }

    fetch("/api/profile", {
        method:"POST",   
        body: JSON.stringify(info),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((data)=>{
        if(data["ok"] == true){  
            alert("修改成功");            
        }       
        else{             
            alert("修改失敗");
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
        alert(e,"修改失敗");
    });

}

//修改密碼
function changepw(){   

    //檢查
    beforeSubmit();

    let oldpassword = document.getElementById("old_password").value;
    let newpassword = document.getElementById("new_password").value;

    if(oldpassword == "" || newpassword == ""){
        debugger;
    }
    // }else if(user_password != oldpassword){
    //     alert("舊密碼輸入錯誤!")
    // }
    else{
        let info={
            "oldpassword": oldpassword,
            "newpassword": newpassword
        }
        fetch("/api/profile", {
            method:"PATCH",   
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json"
            } }).then((response)=>{
                return response.json();
        }).then((data)=>{
            if(data["ok"] == true){  
                alert("修改密碼成功");  
                window.location.reload();          
            }       
            else{             
                alert(data["errmsg"]);
            }
        }).catch((e) => {
            console.log(e,"data失敗內容~~~~~~~~~~~")
            alert(e,"修改密碼失敗");
        });
    
    }   
}

//表單不為空判斷
function beforeSubmit(){

    let old_password = document.getElementById('old_password').value;
    let error_old_password = document.getElementById('error_old_password'); 
    let new_password = document.getElementById('new_password').value;
    let error_new_password = document.getElementById('error_new_password');
    let ensure_password = document.getElementById('ensure_password').value;
    let error_ensure_password = document.getElementById('error_ensure_password'); 
    let different_password = document.getElementById('different_password');

    if(old_password=="" || old_password==null){       
        error_old_password.style.display = 'block';
    }else {
        error_old_password.style.display = 'none';
    }
    if(new_password=="" || new_password==null){       
        error_new_password.style.display = 'block';
    }else {
        error_new_password.style.display = 'none';
    }
    if(ensure_password=="" || ensure_password==null){       
        error_ensure_password.style.display = 'block';
    }else {
        error_ensure_password.style.display = 'none';
    }
    if(new_password!=ensure_password){
        alert("新密碼與確認新密碼不一致");
        different_password.style.display = 'block';
    }else{
        different_password.style.display = 'none';
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

//+新增商品
function add(){
    window.location.href='add.html';
}

//回首頁
function home(){
    window.location.href='/'; 
}
//購物車
function cart(){
    window.location.href='cart.html';
}
//立即結帳
function orders(){
    window.location.href='order.html';
}