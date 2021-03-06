//登入/註冊
function change(num){
    let login = document.getElementById("login");
    let register = document.getElementById("register");

    let signin_btn = document.getElementById("signin_btn");
    let register_btn = document.getElementById("register_btn");

    if(num == 1){
        login.style.display = "block";
        register.style.display = "none";
        signin_btn.style.color = '#fa8072';
        register_btn.style.color = 'black';
    }
    else{
        login.style.display = "none";
        register.style.display = "block";
        signin_btn.style.color = 'black';
        register_btn.style.color = '#fa8072';
    }
}


// 註冊會員
function register(){
   
    let email = document.getElementById("sign_email").value;
    let password = document.getElementById("sign_password").value;
    let password2 = document.getElementById("sign_password2").value;
    let account_email = document.getElementById('account_email');
    let account_email_error = document.getElementById('account_email_error');
    let set_password = document.getElementById('set_password');
    let ensure_password = document.getElementById('ensure_password');
    if (email == "" || password=="" || password2=="")
    {
        alert("欄位尚未填寫完畢");
        if(email==""){       
            account_email.style.display = 'block';
        }else {
            account_email.style.display = 'none';
        }
        if(password==""){       
            set_password.style.display = 'block';
        }else {
            set_password.style.display = 'none';
        }if(password2==""){       
            ensure_password.style.display = 'block';
            different_password.style.display = 'none';
        }else {
            ensure_password.style.display = 'none';
        }if(password!=password2){
            different_password.style.display = 'block';
        }else{
            different_password.style.display = 'none';
        }
    }
    else
    {
        if(email.includes("@") && password == password2)
        {            
            let register_info ={"email":email,"password":password};
            console.log(register_info)
            fetch("/api/user",{
                method:"POST",   
                body: JSON.stringify(register_info),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data["ok"] == true){
                    alert("註冊成功！")  
                    //重新導向登入頁面
                    window.location.reload();                  
                }
                else{                    
                    alert(data["errmsg"])
                }
            }).catch((e) => {
                console.log(e,"data失敗內容~~~~~~~~~~~")
            });
        }
        else if(!email.includes("@")){            
            alert("信箱格式錯誤!")
            account_email_error.style.display = 'block';
        }
        if(password!=password2){
            alert("新密碼與確認新密碼不一致");
            different_password.style.display = 'block';
            ensure_password.style.display = 'none';
        }else{
            different_password.style.display = 'none';
        }
    }
}

//signin_info
function signin_info(email,password){

    // let email = document.getElementById("signin_email").value;
    // let password = document.getElementById("signin_password").value;
    let signin_info ={"email":email,"password":password};
        console.log(signin_info)
        fetch("/api/user",{
            method:"PATCH",   
            body: JSON.stringify(signin_info),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data["error"] == null){
                //alert("登入成功");
                if(data.auth == "999") window.location.href='/add.html'; 
                else window.location.href='/'; 
            }
            else{                    
                alert(data["errmsg"]);
            }
        }).catch((e) => {
            console.log(e,"data失敗內容~~~~~~~~~~~")
        });
}

// 登入會員
function signin(){

    let email = document.getElementById("signin_email").value;
    let password = document.getElementById("signin_password").value;
    let account_id = document.getElementById('account_id');
    let password_id = document.getElementById('password_id');

    if (email == "" || password=="")
    {        
        alert("欄位尚未填寫完畢");
        if (email == "" && password==""){
            account_id.style.display = 'block';
            password_id.style.display = 'block';
        }
        else if(email == ""){
            account_id.style.display = 'block';
            password_id.style.display = 'none';
        }else {
            account_id.style.display = 'none';
            password_id.style.display = 'block';
        }
    }
    else
    {                   
        signin_info(email,password);
               
    }
}

// 忘記密碼小視窗-->目前還未完成
function forget_password(){
    let forget_password = document.getElementById('forget_password');
    let hidebg = document.getElementById('hidebg');

    forget_password.style.display = 'block';
    hidebg.style.display = 'block';
    hidebg.style.height=document.body.scrollHeight+"px";  //設置隱藏層的高度為當前頁面高度

    //點擊空白處消失
    hidebg.onclick = function () {   
        forget_password.style.display = 'none';
        hidebg.style.display = "none";        
    }
}
//取消
function cancel(){
    let forget_password = document.getElementById('forget_password');
    let hidebg = document.getElementById('hidebg');
    forget_password.style.display = 'none';
    hidebg.style.display = 'none';
}
//提交
function submit(){
    let forget_password = document.getElementById('forget_password');
    let hidebg = document.getElementById('hidebg');
    forget_password.style.display = 'none';
    hidebg.style.display = 'none';
}

//賣家登入小視窗
function seller_singin(){
    
    let seller_singin = document.getElementById("seller_singin");
    let hidebg = document.getElementById('hidebg');

    seller_singin.style.display = 'block';
    hidebg.style.display = 'block';
    hidebg.style.height=document.body.scrollHeight+"px";

    //點擊空白處消失
    hidebg.onclick = function () {   
        seller_singin.style.display = 'none';
        hidebg.style.display = "none";        
    }
    
}

function seller_btn(){

    let email = document.getElementById("seller_email").value;
    let password = document.getElementById("seller_password").value;
    let seller_singin = document.getElementById("seller_singin");
    let hidebg = document.getElementById('hidebg');
    
    seller_singin.style.display = 'none';
    hidebg.style.display = 'none';
   
    signin_info(email,password);
}

//登入/註冊/賣家登入ENTER鍵
document.getElementById("login").addEventListener("keyup",function(event){
    // Make sure the form isn't submitted
    event.preventDefault();
    if(event.which === 13) {
        document.getElementById("singin_enter").click(); 
    }
});
document.getElementById("register").addEventListener("keyup",function(event){
    event.preventDefault();
    if(event.which === 13) {
        document.getElementById("register_enter").click(); 
    }
});
document.getElementById("seller_singin").addEventListener("keyup",function(event){
    event.preventDefault();
    if(event.which === 13) {
        document.getElementById("seller_login").click(); 
    }
});

//搜尋ENTER鍵
document.getElementById("search_word").addEventListener("keyup",function(event){
    event.preventDefault();
    if(event.which === 13) {
        document.getElementById("search_btn").click(); 
    }
});

//搜尋按鈕
function search(){
    let word = document.getElementById("search_word").value;  
    if(word == ''){
        alert("請輸入搜尋項目!")
    }else{
        window.location.href='/product:'+ word;
    }
}

//回首頁
function home(){
    window.location.href='/'; 
}

//立即結帳
function cart(){
    window.location.href='cart.html';
}