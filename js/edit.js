var image = '';

function init(){
    
    initHeaderWidth();
    initMargin();
}

function initHeaderWidth(){
    var screenWidth = screen.width - getScrollbarWidth();
    $("#header").css("width", screenWidth);
}

function getScrollbarWidth() {
    var oP = document.createElement('p'),
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll'
        }, i, scrollbarWidth;
    for (i in styles) oP.style[i] = styles[i];
    document.body.appendChild(oP);
    scrollbarWidth = oP.offsetWidth - oP.clientWidth;
    oP.remove();
    return scrollbarWidth;
}

function setDefaultInformation(){
    var c = getParameter("card");
    document.getElementById("l-card").innerHTML = c;
    $.ajax({
        type: 'POST',
        url: 'edit_get_information.php',
        data: {card:c},
        dataType: 'json',
        success: function(data){
            $("#icon").attr("src", data.icon);
//            document.getElementById("l-nick").innerHTML = data.nick;
            if(data.nick == ""){
                document.getElementById("l-nick").innerHTML = c;
                document.getElementById("r-nick").setAttribute("value", c);
            }
            else{
                document.getElementById("l-nick").innerHTML = data.nick;
                document.getElementById("r-nick").setAttribute("value", data.nick);
            }
//            document.getElementById("r-nick").setAttribute("placeholder", data.nick);
            document.getElementById("r-phone").setAttribute("value", data.phone);
//            document.getElementById("r-phone").setAttribute("placeholder", data.phone);
            if(data.phone != 0){
                document.getElementById("r-phone").setAttribute("value", data.phone);
            }
            else{
                document.getElementById("r-phone").setAttribute("value", "");
            }
            document.getElementById("r-introduction").innerHTML = data.introduction;
            if(data.sex == "男"){
                $("#r-sex").val(0);
            }
            else if(data.sex == "女"){
                $("#r-sex").val(1);
            }
            setDefaultFaculty(data.faculty);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

function updateInformation(){
    var c = getParameter("card");
    var n = $("#r-nick").val();
    var p = $("#r-phone").val();
    var i = $("#r-introduction").val();
    var s = "";
    var s_idx = $("#r-sex").val();
    if(s_idx == "0"){
        s = "男";
    }
    else if(s_idx == "1"){
        s = "女";
    }
    var f = getFacultyByIdx($("#r-faculty").val());
    $.ajax({
        type: 'POST',
        url: 'edit_update_information.php',
        data: { card : c, 
              nick : n,
              phone : p,
              introduction : i,
              sex : s,
              faculty : f },
        dataType: 'text',
        success: function(data){
            alert("信息更新完毕！");
//            setDefaultInformation();
            back();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

function getCardNumber(){
    return $("#l-card").text();
}

function setDefaultFaculty(faculty){
    if(faculty == "建筑学院"){
        $("#r-faculty").val(0);
    } 
    else if(faculty == "机械工程学院"){
        $("#r-faculty").val(1);
    }
    else if(faculty == "能源与环境学院"){
        $("#r-faculty").val(2);
    }
    else if(faculty == "信息科学与工程学院"){
        $("#r-faculty").val(3);
    }
    else if(faculty == "计算机科学与工程学院"){
        $("#r-faculty").val(4);
    }
    else if(faculty == "软件学院"){
        $("#r-faculty").val(5);
    }
    else if(faculty == "艺术学院"){
        $("#r-faculty").val(6);
    }
}

function getFacultyByIdx(idx){
    var faculty = "";
    switch(idx){
        case "0":
            faculty = "建筑学院";
            break;
        case "1":
            faculty = "机械工程学院";
            break;
        case "2":
            faculty = "能源与环境学院";
            break;
        case "3":
            faculty = "信息科学与工程学院";
            break;
        case "4":
            faculty = "计算机科学与工程学院";
            break;
        case "5":
            faculty = "软件学院";
            break;
        case "6":
            faculty = "艺术学院";
            break;
    }
    return faculty;
}

function back(){
    window.location.href = "home.html?card=" + getParameter("card") + "&card1=" + getParameter("card");
}

function initMargin(){
    var iHeight = $("#info-container").height();
    var h = document.body.clientHeight;
    var m = ((h - iHeight) / 3) + "px";
    $("#info-container").css("margin-top", m);
}

function changeIcon(){
    document.getElementById("upload-pic").style.display = "block";
    $('html,body').animate({scrollTop:document.body.scrollHeight}, 800);
}

function triggerUpload(){
    var btn_upload = document.getElementById("btn-upload");
    btn_upload.click();
}


function selectImage(file){
    if(!file.files || !file.files[0]){
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt){
        document.getElementById('img-pic').src = evt.target.result;
        image = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
    document.getElementById("edit-pic").style.display = "block";
    $('html,body').animate({scrollTop:document.body.scrollHeight}, 800);
}

function uploadImage(){
    $("#upload-card").attr("value", getCardNumber());
    $("#upload-form").submit();
}

function getParameter(param){
    var value = "";
    var query = window.location.search;
    var iStart = query.indexOf(param);
    var iLen = param.length;
    var iCurrent = iStart + iLen + 1;
    while(query.charAt(iCurrent) != '&'
         && query.charAt(iCurrent) != ""){
        value += query.charAt(iCurrent);
        iCurrent++;
    }
    return value;
}