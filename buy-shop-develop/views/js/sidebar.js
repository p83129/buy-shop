// side_bar
let sub_btn = document.querySelector("#sub_btn");
let sub_btn1 = document.querySelector("#sub_btn1");
let sub_btn2 = document.querySelector("#sub_btn2");
let sub_btn3 = document.querySelector("#sub_btn3");

let sub_menu = document.querySelector("#sub_menu");
let sub_menu1 = document.querySelector("#sub_menu1");
let sub_menu2 = document.querySelector("#sub_menu2");
let sub_menu3 = document.querySelector("#sub_menu3");

let down_btn = document.querySelector("#down_btn");
let down_btn1 = document.querySelector("#down_btn1");
let down_btn2 = document.querySelector("#down_btn2");
let down_btn3 = document.querySelector("#down_btn3");

let close_btn = document.querySelector(".close_btn");
let side_bar = document.querySelector(".side_bar");
let menu_btn = document.querySelector(".menu_btn");

// 標頭樣式
let header = document.querySelector("#header");
let header_div_a = document.querySelectorAll(".header_div a");

//Top_Button
let top_btn = document.querySelector("#top_btn");

// close_btn
menu_btn.onclick = function(){
  side_bar.classList.toggle("active");
  // alert("++++");
}
close_btn.onclick = function(){
  side_bar.classList.remove("active");
}
sub_btn.onclick = function(){
  down_btn.classList.toggle("rotate");
}
sub_btn1.onclick = function(){
  down_btn1.classList.toggle("rotate");
}
sub_btn2.onclick = function(){
  down_btn2.classList.toggle("rotate");
}
sub_btn3.onclick = function(){
  down_btn3.classList.toggle("rotate");
}

// 螢幕高度
window.onscroll = function (){
  scrollHeader();
}
function scrollHeader(){
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // alert(scrollTop);
  if(scrollTop < 100){
    header.style.display = 'none';
  }else{
    header.style.display = 'block';
  }if(scrollTop < 300){
    top_btn.style.opacity = '0';
  }else{
    top_btn.style.opacity = '1';
  } 
}

// scroll back to top
top_btn.addEventListener('click', function (e) {
  if (window.scrollTo) {
    e.preventDefault()
    window.scrollTo({'behavior': 'smooth', 'top': 0})
  }
})

let slideToggleTrans = function(element, display) { //display顯示還是影藏狀態
    element.addEventListener("click", function() {

        display = !display;

        if(element.id == 'sub_btn'){
          eleMore = sub_menu;
        }else if (element.id == 'sub_btn1') {
          eleMore = sub_menu1;
        }else if (element.id == 'sub_btn2') {
          eleMore = sub_menu2;;
        }else{
          eleMore = sub_menu3;
        }

        eleMore && (eleMore.style.height = display? (function() {
            let height = 0;
            Array.prototype.slice.call(eleMore.childNodes).forEach(function(child) {
                if (child.nodeType === 1) {
                    let oStyle = window.getComputedStyle(child);
                    height = child.clientHeight + (parseInt(oStyle.borderTopWidth) || 0) + (parseInt(oStyle.borderBottomWidth) || 0);
                }
            });
            return height;
        })() + "px": "0px");
    });
};
slideToggleTrans(sub_btn);
slideToggleTrans(sub_btn1);
slideToggleTrans(sub_btn2);
slideToggleTrans(sub_btn3);

