function init(){
    initBodyMargin();
    initShow();
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

function back(){
    window.location.href = "edit.html?card=" + getParameter("card");
}

function initBodyMargin(){
    var pHeight = document.body.clientHeight - 36;
    var bHeight = $(".upload-pic-body").height();
    var m = (pHeight - bHeight) / 2;
    $(".upload-pic-body").css("margin-top", m);
}

function initShow(){
    var h = $(".show-pic").width();
    $(".show-pic").css("height", h);
    var pHeight = document.body.clientHeight - 36;
    var sHeight = $(".show-pic").height();
    var m = (pHeight - sHeight) / 2;
    $(".show-pic").css("margin-top", m);
}

function reset(){
    document.getElementById('img-show').src = "";
    document.getElementById("show-pic").style.display = "none";
    document.getElementById("upload-pic").style.display = "block";
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
        document.getElementById('img-show').src = evt.target.result;
        image = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
    document.getElementById("show-pic").style.display = "block";
    document.getElementById("upload-pic").style.display = "none";
}

function uploadImage(){
    $("#upload-card").attr("value", getParameter("card"));
    $("#upload-form").submit();
}