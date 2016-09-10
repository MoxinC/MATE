//var p = navigator.platform;  
//alert(p);  
//var Agents = ["Android", "iPhone",
//              "SymbianOS", "Windows Phone",
//              "iPad", "iPod"];
//var flag = true;
//for (var v = 0; v < Agents.length; v++) {
//    if (userAgentInfo.indexOf(Agents[v]) > 0) {
//        flag = false;
//        break;
//    }
//}
//if(flag == true){
//    alert("引用电脑端文件");
//}else{
//    alert("引用手机端文件");
//}

function login(){
    var c;
    var p;
    c = document.getElementById('username').value;
    p = document.getElementById('password').value;
    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: {card:c, password:p},
        dataType: 'json',
        success: function(data){
            if(data == 1){
                window.location.href = "main.html?card1=" + c;
//                document.getElementById('card').value = c;
//                document.forms["submit-form"].submit();
            } 
            else if(data == 0){
                alert("一卡通号或密码错误!");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

function initPaddingTop(){
    var sHeight = screen.height;
    var bHeight = $("#login-box").width();
    var paddingTop = (sHeight - bHeight) / 3;
    $("#login-box").css("padding-top", paddingTop);
}

function initBoxHeight(){
    var sHeight = document.body.clientHeight;
    $("#box").css("height", sHeight);
}