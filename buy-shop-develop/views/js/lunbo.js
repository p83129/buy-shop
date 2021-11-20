window.onload = function() {
    // 獲取圖片列表
    var imgList = document.getElementById("img-list");
    // 獲取頁面中所有的img標簽
    var imgArr = document.getElementsByTagName("img");
    // 設置imgList的寬度
    imgList.style.width = 1500 * imgArr.length + "px";
   
    // 設置導航按鈕居中
    // 獲取導航按鈕
    var navBtns = document.getElementById("nav-btns");
    // 獲取outer
    var outer = document.getElementById("outer");
    // 設置navBtns的left值
    navBtns.style.left = (outer.offsetWidth - navBtns.offsetWidth) / 2 + "px";
   
    // 默認顯示圖片的索引
    var index = 0;
    // 獲取所有的a
    var allA = document.getElementsByTagName("a");
    // 設置默認選中的效果
    allA[index].style.backgroundColor = "black";
   
    /*
     * 點擊超鏈接切換到指定的圖片
     *  點擊第一個超鏈接，顯示第一個圖片
     *  點擊第二個超鏈接，顯示第二個圖片
     * */
   
    // 為所有的超鏈接都綁定單擊響應函數
    for (var i = 0; i < allA.length; i++) {
     // 為每一個超鏈接都添加一個num屬性
     allA[i].num = i;
   
     // 為超鏈接綁定單擊響應函數
     allA[i].onclick = function() {
      // 關閉自動切換的定時器
      clearInterval(timer);
      
      // 獲取點擊超鏈接的索引,並將其設置為index
      index = this.num;
   
      // 設置選中的a
      setA();
   
      // 使用move函數來切換圖片
      move(imgList, "left", -1500 * index, 20, function() {
       // 動畫執行完畢，開啟自動切換
       autoChange();
      });
     };
    }
   
    // 開啟自動切換圖片
    autoChange();
   
    // 設置選中的a
    function setA() {
     // 判斷當前索引是否是最後一張圖片
     if (index >= imgArr.length - 1) {
      // 則將index設置為0
      index = 0;
   
      // 此時顯示的最後一張圖片，而最後一張圖片和第一張是一摸一樣
      // 通過CSS將最後一張切換成第一張
      imgList.style.left = 0;
     }
   
     // 遍歷所有a，並將它們的背景顏色設置為紅色
     for (var i = 0; i < allA.length; i++) {
      allA[i].style.backgroundColor = "";
     }
   
     // 將選中的a設置為黑色
     allA[index].style.backgroundColor = "black";
    };
   
    // 定義一個自動切換的定時器的標識
    var timer;
    // 創建一個函數，用來開啟自動切換圖片
    function autoChange() {
     // 開啟一個定時器，用來定時去切換圖片
     timer = setInterval(function() {
      // 使索引自增
      index++;
   
      // 判斷index的值
      index %= imgArr.length;
   
      // 執行動畫，切換圖片
      move(imgList, "left", -1500 * index, 20, function() {
       // 修改導航按鈕
       setA();
      });
     }, 3000);
    }
   
   };