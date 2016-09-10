function init(){
    var sHeight = document.body.clientHeight;
    var marginTop = sHeight - 108;
    $("#footer").css("top", marginTop);
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

function getLoginInformation(){
    var c = getParameter("card1");
    $.ajax({
        type: 'POST',
        url: 'get_login_information.php',
        data: {card1:c},
        dataType: 'json',
        success: function(data){
            $("#header-icon").attr("src", data.icon);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert("Error:getInformation");
            alert(errorThrown);
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

function back(){
    var c = getParameter("card1");
    window.location.href = "main.html?card1=" + c;
}

function release(){
    var c = getParameter("card1");
    var a = 0;
    var k_idx = $("#release-kind").val();
    var k = getKindByIdx(k_idx);
    var b_idx = $("#release-bucket").val();
    var b = getBucketByIdx(b_idx);
    var d = $("#release-date").val();
    var i = $("#release-introduction").val();
    $.ajax({
        type: 'POST',
        url: 'release_activity.php',
        data: { card : c, 
              kind : k,
              bucket : b,
              time : d,
              appointed : a,
              introduction : i},
        dataType: 'json',
        success: function(data){
            alert("发布成功！");
            window.location.href = "main.html?card1=" + c;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

function getKindByIdx(idx){
    var kind = "";
    switch(idx){
        case "0":
            kind = "篮球";
            break;
        case "1":
            kind = "足球";
            break;
        case "2":
            kind = "排球";
            break;
        case "3":
            kind = "羽毛球";
            break;
        case "4":
            kind = "乒乓球";
            break;
        case "5":
            kind = "网球";
            break;
        case "6":
            kind = "跑步";
            break;
        case "7":
            kind = "骑行";
            break;
        case "8":
            kind = "健身";
            break;
        case "9":
            kind = "自习";
            break;
    }
    return kind;
}

function getBucketByIdx(idx){
    var bucket = "";
    switch(idx){
        case "0":
            bucket = "上午";
            break;
        case "1":
            bucket = "下午";
            break;
        case "2":
            bucket = "晚上";
            break;
    }
    return bucket;
}