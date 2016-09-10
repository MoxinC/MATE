function init(){
    initMargin();
    initHeaderWidth();
    setHeaderPadding();
	$("#logoutBtn").click(function(){
		window.close();
		window.opener.location.href="../index.php";
	});
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

function initMargin(){
    var screenWidth = screen.width;
    var mcWidth = $("#main-container").width();
    var marginLeft = (screenWidth - mcWidth) / 2;
    $("#main-container").css("margin-left", marginLeft);
}

function initHeaderWidth(){
//    if(document.body.scrollHeight>document.body.offsetHeight) {
//        var screenWidth = screen.width - getScrollbarWidth();
//        $("#header").css("width", screenWidth); 
//    }else {
//        var screenWidth = screen.width;
//        $("#header").css("width", screenWidth);
//    }
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

function getLoginInformation(){
    var c = getParameter("card1");
    $.ajax({
        type: 'POST',
        url: 'get_login_information.php',
        data: {card1:c},
        dataType: 'json',
        success: function(data){
            document.getElementById("header-name").innerHTML = data.nick;
            $("#header-icon").attr("src", data.icon);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert("Error:getInformation");
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

function getOwnerInformation(){
    var c = getParameter("card");
    $.ajax({
        type: 'POST',
        url: 'home_get_information.php',
        data: {card:c},
        dataType: 'json',
        success: function(data){
            document.getElementById("nick").innerHTML = data.nick + "&nbsp&nbsp" + data.sex;
//            document.getElementById("sex").innerHTML = data.sex;
            document.getElementById("phone").innerHTML = "手机: " + data.phone;
            document.getElementById("faculty").innerHTML = data.faculty;
            document.getElementById("introduction").innerHTML = "个人简介: " + data.introduction;
            document.getElementById("thumb-num").innerHTML = data.number;
            $("#icon").attr("src", data.icon);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert("Error:getInformation");
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

function getActivity(){
    var c = getParameter("card");
    $.ajax({
        type: 'POST',
        url: 'home_get_activities.php',
        data: {card:c},
        dataType: 'json',
        success: function(data){
        var release_display = "";
        var keep_display = "";
        var r_counter = 1;
        var k_counter = 1;
		var r1_counter = 1;
        var k1_counter = 1;
		var time=getTime();
        $.each(data, function(){
            if(this.time > time){
                var release_card 
                = '<div class="card" id="release-card' + r_counter + '" onclick="visitReleaseDetail(this)">'
                + '<div class="card-kind">' + this.kind + '</div>'
                + '<div class="card-time">' + this.time.substring(0, 16) + "&nbsp" + this.bucket + '</div>'
                + '<div style="display:none" id="release-id' + r_counter + '">' + this.id + '</div>'
                + '</div>';
                release_display += release_card;
		     	r_counter=r_counter+1;
            }else if(this.time <= time){
                var keep_card 
                = '<div class="card" id="keep-card' + k_counter + '" onclick="visitKeepDetail(this)">'
                + '<div class="card-kind">' + this.kind + '</div>'
                + '<div class="card-time">' + this.time.substring(0, 16) + "&nbsp" + this.bucket + '</div>'
                + '<div style="display:none" id="keep-id' + k_counter + '">' + this.id + '</div>'
                + '</div>';
                keep_display += keep_card;
				k_counter=k_counter+1;
            }
        });
            document.getElementById("release-page1").innerHTML = release_display;
            document.getElementById("release-page2").innerHTML = keep_display;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

function getReleaseActivity(){
}

function getKeepActivity(){
    var c = getParameter("card");
    $.ajax({
        type: 'POST',
        url: 'home_get_activitie.php',
        data: {card:c},
        dataType: 'json',
        success: function(data){
        var release_display = "";
        var keep_display = "";
        var y_counter = 1;
		var time=getTime();
        $.each(data, function(){
            var release_card 
                = '<div class="card" id="yue-card' + y_counter + '" onclick="visitYueDetail(this)">'
                + '<div class="card-kind">' + this.kind + '</div>'
                + '<div class="card-time">' + this.time.substring(0, 16) + "&nbsp" + this.bucket + '</div>'
                + '<div style="display:none" id="yue-id' + y_counter + '">' + this.id + '</div>'
                + '</div>';
                release_display += release_card;
				y_counter=y_counter+1;
        });
            document.getElementById("keep-page").innerHTML = release_display;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

//function getOwnerCard(){
//    return $("#card").text();
//}

function visitSelf(){
    window.location.href = "home.html?card=" + getParameter("card1") + "&card1=" + getParameter("card1");
}

function visitReleaseDetail(e){
    var mark = "release-card";
    var l_mark = mark.length;
    var l = e.id.length;
    var idx = e.id.substring(l_mark, l);
    var id = "release-id" + idx;
    var activity_id = $("#" + id).text();
    window.location.href = "activity.html?id=" + activity_id + "&card1=" + getParameter("card1");
//    $("#activity-id").attr("value", activity_id);
//    $("#detail-card").attr("value", getParameter("card1"));
//    document.forms["detail-form"].submit();
}

function visitKeepDetail(e){
    var mark = "keep-card";
    var l_mark = mark.length;
    var l = e.id.length;
    var idx = e.id.substring(l_mark, l);
    var id = "keep-id" + idx;
    var activity_id = $("#" + id).text();
    window.location.href = "activity.html?id=" + activity_id + "&card1=" + getParameter("card1");
//    $("#activity-id").attr("value", activity_id);
//    $("#detail-card").attr("value", getParameter("card1"));
//    document.forms["detail-form"].submit();
}

function visitYueDetail(e){
    var mark = "yue-card";
    var l_mark = mark.length;
    var l = e.id.length;
    var idx = e.id.substring(l_mark, l);
    var id = "yue-id" + idx;
    var activity_id = $("#" + id).text();
    window.location.href = "activity.html?id=" + activity_id + "&card1=" + getParameter("card1");
}

//function getCardNumber(){
//    return $("#header-card").text();
//}

function edit(){
	if(checkip()){
    	window.location.href = "edit.html?card=" + getParameter("card");
	}
	else{
		setTimeout(function(){
			alert("您的用户已在其他地方登陆，请重新登陆");
			window.location.href="../index.php";},5);
	}
}
function checkip(){
	var c = getParameter("card1");
	var flag;
	$.ajax({
        type: 'POST',
        url: 'checkIP.php',
        data: {card:c},
        dataType: 'json',
		async:false,
        success: function(data){
   	 		flag=data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        }
    });
	return flag;
}
function backToMain(){
    window.location.href = "main.html?card1=" + getParameter("card1");
//    $("#main-card").attr("value", getParameter("card1"));
//    document.forms["main-form"].submit();
}

function setHeaderPadding(){
    var cwidth = $("#main-container").width();
    var screenWidth = screen.width - getScrollbarWidth();
    var padding = (screenWidth - cwidth) / 2;
    var pr = (padding + 18) + "px";
    $("#header").css("padding-right", pr);
    var pl = (padding + 8) + "px";
    $("#header").css("padding-left", pl);
}

function getTime(){
	var myDate = new Date();
	var y = myDate.getFullYear();  
    var m = myDate.getMonth()+1;
	if(m<10){
		m='0'+m;
	}
    var d = myDate.getDate();
	if(d<10){
		d='0'+d;
	}
    var h = myDate.getHours();
	if(h<10){
		h='0'+h;
	}
    var mi = myDate.getMinutes();
	if(mi<10){
		mi='0'+mi;
	}
    var s = myDate.getSeconds();
	if(s<10){
		s='0'+s;
	}
	var ctime = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    return ctime;
}