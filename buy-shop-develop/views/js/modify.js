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

          // let signdelete = document.getElementById("signdelete")
          // let orders = document.getElementById("orders")

          // let a_change = document.getElementById("a_change")
          // let img_div = document.querySelector(".img_div")

          // signdelete.style.display = "none";
          // orders.style.display = "none";

          // a_change.setAttribute("href","/login.html")
          // img_div.style.display = "none";

          home();
      }
      else{
          // alert(data["errmsg"]);
      }
  }).catch((e) => {
      console.log(e,"data失敗內容~~~~~~~~~~~")
  });

}

//觸發登出
function Text1(){
  let a_change = document.getElementById("a_change");
  a_change.classList = '';
  a_change.innerHTML = 'LOG OUT';
}
function Text_Image(){
  let a_change = document.getElementById("a_change");
  a_change.classList = 'far fa-user';
  a_change.innerHTML = '';
}

//下拉是選單按鈕
let item_title = document.querySelector("#item_title");
let item_title1 = document.querySelector("#item_title1");
//隱藏選單內容
let item_list = document.querySelector("#item_list");
let item_list1 = document.querySelector("#item_list1");
//選轉按鈕
let down_btn = document.querySelector("#down_btn");
let down_btn1 = document.querySelector("#down_btn1");

item_title.onclick = function(){
  down_btn.classList.toggle("rotate");
}
item_title1.onclick = function(){
  down_btn1.classList.toggle("rotate");
}

//開合選單內容
let slideToggleTrans = function(element, display) { //display顯示還是影藏狀態
    element.addEventListener("click", function() {

        display = !display;

        if(element.id == 'item_title'){
          eleMore = item_list;
        }else{
          eleMore = item_list1;
        }

        eleMore && (eleMore.style.height = display? (function() {
            let height = 0;
            Array.prototype.slice.call(eleMore.childNodes).forEach(function(child) {
                if (child.nodeType == 0) {
                    let oStyle = window.getComputedStyle(child);
                    height = child.clientHeight + (parseInt(oStyle.borderTopWidth) || 0) + (parseInt(oStyle.borderBottomWidth) || 0);
                }
            });
            return height;
        })() + "px": "140px");
    });
};
slideToggleTrans(item_title);
slideToggleTrans(item_title1);
//回首頁
function home(){
  window.location.href='/';
}
