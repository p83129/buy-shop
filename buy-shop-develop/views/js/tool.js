/*
 * 創建一個可以執行簡單動畫的函數
 * 參數：
 *  obj:要執行動畫的對象
 *  attr:要執行動畫的樣式，比如：left top width height
 *  target:執行動畫的目標位置
 *  speed:移動的速度(正數向右移動，負數向左移動)
 *  callback:回調函數，這個函數將會在動畫執行完畢以後執行
 */
function move(obj, attr, target, speed, callback) {
    // 關閉上一個定時器
    clearInterval(obj.timer);
   
    // 獲取元素目前的位置
    var current = parseInt(getStyle(obj, attr));
   
    // 判斷速度的正負值
    // 如果從0 向 800移動，則speed為正
    // 如果從800向0移動，則speed為負
    if (current > target) {
     //此時速度應為負值
     speed = -speed;
    }
   
    // 開啟一個定時器，用來執行動畫效果
    // 向執行動畫的對象中添加一個timer屬性，用來保存它自己的定時器的標識
    obj.timer = setInterval(function() {
     // 獲取box1的原來的left值
     var oldValue = parseInt(getStyle(obj, attr));
   
     // 在舊值的基礎上增加
     var newValue = oldValue + speed;
   
     // 判斷newValue是否大於800
     // 從800 向 0移動
     // 向左移動時，需要判斷newValue是否小於target
     // 向右移動時，需要判斷newValue是否大於target
     if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
      newValue = target;
     }
   
     // 將新值設置給box1
     obj.style[attr] = newValue + "px";
   
     // 當元素移動到0px時，使其停止執行動畫
     if (newValue == target) {
      // 達到目標，關閉定時器
      clearInterval(obj.timer);
      // 動畫執行完畢，調用回調函數
      callback && callback();
     }
   
    }, 30);
   }
   
   /*
    * 定義一個函數，用來獲取指定元素的當前的樣式
    * 參數：
    *   obj 要獲取樣式的元素
    *   name 要獲取的樣式名
    */
   function getStyle(obj, name) {
    if (window.getComputedStyle) {
     // 正常瀏覽器的方式，具有getComputedStyle()方法
     return getComputedStyle(obj, null)[name];
    } else {
     // IE8的方式，沒有getComputedStyle()方法
     return obj.currentStyle[name];
    }
   }
   
   /*
    * 定義一個函數，用來向一個元素中添加指定的class屬性值
    * 參數:
    *  obj 要添加class屬性的元素
    *  cn 要添加的class值
    */
   function addClass(obj, cn) {
    // 檢查obj中是否含有cn
    if (!hasClass(obj, cn)) {
     obj.className += " " + cn;
    }
   }
   
   /*
    * 判斷一個元素中是否含有指定的class屬性值，
    *  如果有該class，則返回true，沒有則返回false。
    */
   function hasClass(obj, cn) {
    // 判斷obj中有沒有cn class
    // 創建一個正則表達式
    var reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
   }
   
   /*
    * 刪除一個元素中的指定的class屬性
    */
   function removeClass(obj, cn) {
    // 創建一個正則表達式
    var reg = new RegExp("\\b" + cn + "\\b");
    // 刪除class
    obj.className = obj.className.replace(reg, "");
   }
   
   /*
    * toggleClass可以用來切換一個類
    *  如果元素中具有該類，則刪除
    *  如果元素中沒有該類，則添加
    */
   function toggleClass(obj, cn) {
    //判斷obj中是否含有cn
    if (hasClass(obj, cn)) {
     //有，則刪除
     removeClass(obj, cn);
    } else {
     //沒有，則添加
     addClass(obj, cn);
    }
   }