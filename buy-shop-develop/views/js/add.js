//觸發登出
function Text1() {
    let a_change = document.getElementById("a_change");
    a_change.classList = '';
    a_change.innerHTML = '登出';
}
function Text_Image() {
    let a_change = document.getElementById("a_change");
    a_change.classList = 'far fa-user';
    a_change.innerHTML = '';
}

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
            home();
        }
        else{                    
            // alert(data["errmsg"]);
        }
    }).catch((e) => {
        console.log(e,"data失敗內容~~~~~~~~~~~")
    });   
}

//回首頁
function home(){
    window.location.href='/'; 
}

//新增商品
var add_product = document.querySelector('a[href="#add_product"]');
var add_product_1 = document.getElementById('add_product_1');
add_product.addEventListener('click', function (e) {
    if (window.scrollTo) {
        e.preventDefault()
        window.scrollTo({
            'behavior': 'smooth',
            'top': add_product_1.offsetTop
        })
    }
})
//基本資訊
var info = document.querySelector('a[href="#info"]');
var info_1 = document.getElementById('info_1');
info.addEventListener('click', function (e) {
    if (window.scrollTo) {
        e.preventDefault()
        window.scrollTo({
            'behavior': 'smooth',
            'top': info_1.offsetTop
        })
    }
})
//銷售資訊
var sell = document.querySelector('a[href="#sell"]');
var sell_1 = document.getElementById('sell_1');
sell.addEventListener('click', function (e) {
    if (window.scrollTo) {
        e.preventDefault()
        window.scrollTo({
            'behavior': 'smooth',
            'top': sell_1.offsetTop
        })
    }
})

// select choose
department = new Array();
department[0] = ["台灣", "歐美", "日韓", "東南亞"]; // 國家選擇
department[1] = ["純素/全素", "蛋奶素", "植物五辛素"]; // 素食選擇
// department[2]=["鹹", "甜", "辣"];	// 口味選擇

function renew(index) {
    for (var i = 0; i < department[index].length; i++) {
        document.myForm.choose_one.options[i] = new Option(department[index][i], department[index][i]);// 設定新選項
        document.myForm.choose_one.length = department[index].length;	// 刪除多餘的選項
    }
    var choose = document.getElementById("choose").value;
    var empty = " ";

    document.getElementById("choose_1").innerText = empty;
    document.getElementById("choose_2").innerText = empty;
    document.getElementById("choose_1").innerText = choose;
    // document.getElementById("dot").innerText = '>';

}
// root
function renew1() {
    var root = document.getElementById("root").value;
    document.getElementById("choose_2").innerHTML = root;
}

// 限制字數
var maxl = 3000; //總長度
function sizecontrol() {
    var size = document.getElementById("text_amount").value.length;
    if (size > maxl) document.getElementById("text_amount").value = document.getElementById("text_amount").value.substr(0, maxl)
    else document.getElementById("count").innerHTML = size + "/" + maxl
}

// onload Img
function onloadImg(thisimg) {
    var file = thisimg.files[0];
    if (window.FileReader) {
        var fr = new FileReader();
        var showing = document.getElementById('showing');
        var img_style_block = document.getElementById('img_style_block');// 圖片背景樣式

        var A = document.getElementById('A');
        var aa = document.getElementById('aa');

        fr.onloadend = function (e) {
            showing.src = e.target.result;
        };
        fr.readAsDataURL(file);
        showing.style.display = 'inline-block';
        img_style_block.style.display = 'inline-block';

        A.style.display = 'none';
        aa.style.display = 'block';

        //document.querySelector('#upload_input').value = '';
    }
}
//delete img
function deletebox() {
    var deletebox = document.getElementById('showing');
    deletebox.remove();

    // create Img
    var img_style_block = document.getElementById('img_style_block');
    var img = document.createElement('img');
    img.setAttribute('class', 'img_style_show');
    img.setAttribute('id', 'showing');
    img.setAttribute('src', '');
    img_style_block.appendChild(img);
    // hidden 
    var aa = document.getElementById('aa');
    var A = document.getElementById('A');
    aa.style.display = 'none';
    A.style.display = 'block';

}


// onload Img1
function onloadImg1(thisimg) {
    var file = thisimg.files[0];
    if (window.FileReader) {
        var fr = new FileReader();
        var showing = document.getElementById('showing1');
        var img_style_block = document.getElementById('img_style_block1');// 圖片背景樣式

        var B = document.getElementById('B');
        var bb = document.getElementById('bb');

        fr.onloadend = function (e) {
            showing.src = e.target.result;
        };
        fr.readAsDataURL(file);
        showing.style.display = 'inline-block';
        img_style_block.style.display = 'inline-block';

        B.style.display = 'none';
        bb.style.display = 'block';

        //document.querySelector('#upload_input1').value = '';
    }
}

//delete img1
function deletebox1() {
    var deletebox = document.getElementById('showing1');
    deletebox.remove();

    // create Img
    var img_style_block = document.getElementById('img_style_block1');
    var img = document.createElement('img');
    img.setAttribute('class', 'img_style_show');
    img.setAttribute('id', 'showing1');
    img.setAttribute('src', '');
    img_style_block.appendChild(img);
    // hidden 
    var bb = document.getElementById('bb');
    var B = document.getElementById('B');
    bb.style.display = 'none';
    B.style.display = 'block';

}

// onload Img2
function onloadImg2(thisimg) {
    var file = thisimg.files[0];
    if (window.FileReader) {
        var fr = new FileReader();
        var showing = document.getElementById('showing2');
        var img_style_block = document.getElementById('img_style_block2');// 圖片背景樣式

        var C = document.getElementById('C');
        var cc = document.getElementById('cc');

        fr.onloadend = function (e) {
            showing.src = e.target.result;
        };
        fr.readAsDataURL(file);
        showing.style.display = 'inline-block';
        img_style_block.style.display = 'inline-block';

        C.style.display = 'none';
        cc.style.display = 'block';

        //document.querySelector('#upload_input2').value = '';
    }
}
//delete img2
function deletebox2() {
    var deletebox = document.getElementById('showing2');
    deletebox.remove();

    // create Img
    var img_style_block = document.getElementById('img_style_block2');
    var img = document.createElement('img');
    img.setAttribute('class', 'img_style_show');
    img.setAttribute('id', 'showing2');
    img.setAttribute('src', '');
    img_style_block.appendChild(img);
    // hidden 
    var cc = document.getElementById('cc');
    var C = document.getElementById('C');
    cc.style.display = 'none';
    C.style.display = 'block';

}

// onload Img3
function onloadImg3(thisimg) {
    var file = thisimg.files[0];
    if (window.FileReader) {
        var fr = new FileReader();
        var showing = document.getElementById('showing3');
        var img_style_block = document.getElementById('img_style_block3');// 圖片背景樣式

        var D = document.getElementById('D');
        var dd = document.getElementById('dd');

        fr.onloadend = function (e) {
            showing.src = e.target.result;
        };
        fr.readAsDataURL(file);
        showing.style.display = 'inline-block';
        img_style_block.style.display = 'inline-block';

        D.style.display = 'none';
        dd.style.display = 'block';

        //document.querySelector('#upload_input3').value = '';
    }
}
//delete img3
function deletebox3() {
    var deletebox = document.getElementById('showing3');
    deletebox.remove();

    // create Img
    var img_style_block = document.getElementById('img_style_block3');
    var img = document.createElement('img');
    img.setAttribute('class', 'img_style_show');
    img.setAttribute('id', 'showing3');
    img.setAttribute('src', '');
    img_style_block.appendChild(img);
    // hidden 
    var dd = document.getElementById('dd');
    var D = document.getElementById('D');
    dd.style.display = 'none';
    D.style.display = 'block';
}

// onload Img4
function onloadImg4(thisimg) {
    var file = thisimg.files[0];
    if (window.FileReader) {
        var fr = new FileReader();
        var showing = document.getElementById('showing4');
        var img_style_block = document.getElementById('img_style_block4');// 圖片背景樣式

        var E = document.getElementById('E');
        var ee = document.getElementById('ee');

        fr.onloadend = function (e) {
            showing.src = e.target.result;
        };
        fr.readAsDataURL(file);
        showing.style.display = 'inline-block';
        img_style_block.style.display = 'inline-block';

        E.style.display = 'none';
        ee.style.display = 'block';

        //document.querySelector('#upload_input4').value = '';
    }
}
//delete img4
function deletebox4() {
    var deletebox = document.getElementById('showing4');
    deletebox.remove();

    // create Img
    var img_style_block = document.getElementById('img_style_block4');
    var img = document.createElement('img');
    img.setAttribute('class', 'img_style_show');
    img.setAttribute('id', 'showing4');
    img.setAttribute('src', '');
    img_style_block.appendChild(img);
    // hidden 
    var ee = document.getElementById('ee');
    var E = document.getElementById('E');
    ee.style.display = 'none';
    E.style.display = 'block';
}

// onload Img5
function onloadImg5(thisimg) {
    var file = thisimg.files[0];
    if (window.FileReader) {
        var fr = new FileReader();
        var showing = document.getElementById('showing5');
        var img_style_block = document.getElementById('img_style_block5');// 圖片背景樣式

        var F = document.getElementById('F');
        var ff = document.getElementById('ff');

        fr.onloadend = function (e) {
            showing.src = e.target.result;
        };
        fr.readAsDataURL(file);
        showing.style.display = 'inline-block';
        img_style_block.style.display = 'inline-block';

        F.style.display = 'none';
        ff.style.display = 'block';

        //document.querySelector('#upload_input5').value = '';
    }
}
//delete img5
function deletebox5() {
    var deletebox = document.getElementById('showing5');
    deletebox.remove();

    // create Img
    var img_style_block = document.getElementById('img_style_block5');
    var img = document.createElement('img');
    img.setAttribute('class', 'img_style_show');
    img.setAttribute('id', 'showing5');
    img.setAttribute('src', '');
    img_style_block.appendChild(img);
    // hidden 
    var ff = document.getElementById('ff');
    var F = document.getElementById('F');
    ff.style.display = 'none';
    F.style.display = 'block';
}

//刊登商品
function addproduct(status) {
    let img0 = document.getElementById("upload_input").files[0];
    let img1 = document.getElementById("upload_input1").files[0];
    let img2 = document.getElementById("upload_input2").files[0];
    let img3 = document.getElementById("upload_input3").files[0];
    let img4 = document.getElementById("upload_input4").files[0];
    let img5 = document.getElementById("upload_input5").files[0];

    let product_name = document.getElementById("product_name").value;//商品名稱 
    let choose_1 = document.getElementById("choose_1").innerHTML;//大分類
    let choose_2 = document.getElementById("choose_2").innerHTML;//小分類
    let text_amount = document.getElementById("text_amount").value;//商品敘述 
    let contents = document.getElementById("contents").value;//商品成分
    let weight = document.getElementById("weight").value;//商品重量
    let area = document.getElementById("area").value;//商品產地 
    let price = document.getElementById("price").value;//商品價格
    let num = document.getElementById("num").value;//商品數量     

    let data = new FormData();
    if (img0 != null) {
        data.append("file", img0);
        data.append("filename", document.getElementById("upload_input").files[0].name);
    }
    if (img1 != null) {
        data.append("file1", img1);
        data.append("filename1", document.getElementById("upload_input1").files[0].name);
    }
    if (img2 != null) {
        data.append("file2", img2);
        data.append("filename2", document.getElementById("upload_input2").files[0].name);
    }
    if (img3 != null) {
        data.append("file3", img3);
        data.append("filename3", document.getElementById("upload_input3").files[0].name);
    }
    if (img4 != null) {
        data.append("file4", img4);
        data.append("filename4", document.getElementById("upload_input4").files[0].name);
    }
    if (img5 != null) {
        data.append("file5", img5);
        data.append("filename5", document.getElementById("upload_input5").files[0].name);
    }

    if (product_name != null || product_name != '') data.append("product_name", product_name);
    if (choose_1 != null || choose_1 != '') data.append("choose_1", choose_1);
    if (choose_2 != null || choose_2 != '') data.append("choose_2", choose_2);
    if (text_amount != null || text_amount != '') data.append("text_amount", text_amount);
    if (contents != null || contents != '') data.append("contents", contents);
    if (weight != null || weight != '') data.append("weight", weight);
    if (area != null || area != '') data.append("area", area);
    if (price != null || price != '') data.append("price", price);
    if (num != null || num != '') data.append("num", num);
    data.append("status", status);//商品呈現狀態

    fetch("/api/upproduct", {
        method: "POST",
        // contentType: false,
        body: data,
        // headers: {
        //     'Content-Type': 'multipart/form-data ; bundary:goodday'
        //     // "Content-Type": false
        // }        
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["error"] == null) {
            alert("新增商品成功");
        }
        else {
            alert("新增失敗");
        }
    }).catch((e) => {
        console.log(e, "data失敗內容~~~~~~~~~~~")
    });

}