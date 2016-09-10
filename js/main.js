//function getCard1(){
//    var param = "card1";
//    var query = window.location.search;
//    var iLen = param.length;
//    var iStart = query.indexOf(param);
//    if(iStart == -1)
//        return "";
//    iStart = iLen + 2;
//    var iEnd = query.indexOf("&", iStart);
//    if(iEnd == -1)
//        return query.substring(iStart);
//    return query.substring(iStart, iEnd);
//}

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

function getActivitiesByKind(kind){
    var bucket = "";
    var mark = "sb-";
    var currentSelection = $("div[id^=" + mark + "]");
    var current_id = currentSelection.attr("id");
    if(typeof(current_id) != "undefined"
       && current_id != "sb-4" && current_id != "sb-5"){
        bucket = $('#' + current_id).text();
    }
    else{
        bucket = "0";
        selectFilterSpan("4");
    }
    getActivities(kind, bucket);
}

function getActivitiesByBucket(bucket){
    var kind = "";
    var mark = "sk-";
    var currentSelection = $("div[id^=" + mark + "]");
    var current_id = currentSelection.attr("id");
    var idx = current_id.substring(6, 8);
    kind = findKindByIndex(idx);
    getActivities(kind, bucket);
}

function getActivities(k, b){
    var c = getParameter("card1");
    $.ajax({
        type: 'POST',
        url: 'main_get_activities.php',
        data: {kind:k, bucket:b, card1:c},
        dataType: 'json',
        success: function(data){
        var display = "";
        var counter = 1;
        $.each(data, function(){
            var new_card
            = '<div class="card" id="card' + counter
            + '" onclick="visitDetail(this)">'
//            + '">'
            + '<div class="logo-container">'
            + '<img class="img-logo" src="' + this.icon + '">'
            + '</div>'
            + '<div class="info-container">'
            + '<div class="id" id="id' + counter + '">' + this.id + '</div>'
            + '<div class="name">' + this.nick + '</div>'
            + '<div class="detail">' + this.kind + '，' + this.time.substring(0, 16) + '</div>'
            + '</div>'
            + '<div class="button_container">'
            + '<button type="button" class="btn btn-danger btn-lg" id="btn' + counter + '" onclick="appoint(this);" onmouseover="stopBubble(this);" onmouseout="setBubble(this)">' + this.flag + '</button>'
            + '</div>'
            + '</div>';
            display += new_card;
            counter++;
        });
            document.getElementById("cc").innerHTML = display;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}

function selectKind(i){
    var idx = i.substring(6, 8);
    var id = "som" + idx;
    var mark = "sk-";
    var currentSelection = $("div[id^=" + mark + "]");
    var current_id = currentSelection.attr("id");
    if(typeof(current_id) != "undefined"){
        var new_id = current_id.substring(3, 8);
        var obj = document.getElementById(current_id);
        obj.style.display = "none";
        obj.id = new_id;
    }
    var new_id = mark + id;
    var obj = document.getElementById(id);
    obj.style.display = "block";
    obj.id = new_id;
}

function filterSpanSelected(id){
    id.style.color = '#fff';
    id.style.backgroundColor = 'coral';
}

function filterSpanUnselected(id){
    id.style.color = 'coral';
    id.style.backgroundColor = "";
}

function selectFilterSpan(id){
    var mark = "sb-";
    var currentSelection = $("div[id^=" + mark + "]");
    var current_id = currentSelection.attr("id");
    if(typeof(current_id) != "undefined"){
        var obj = document.getElementById(current_id);
        obj.style.color = 'coral';
        obj.style.backgroundColor = "";

        obj.setAttribute("onmouseover", "filterSpanSelected(this)");
        obj.setAttribute("onmouseout", "filterSpanUnselected(this)");

        current_id = current_id.replace(/[^0-9]/ig,"");
        obj.id = current_id;
    }

    var present = document.getElementById(id);
    var new_id = mark + id;
    present.id = new_id;
    present.style.backgroundColor = 'coral';
    present.style.color = '#fff';

    document.getElementById(new_id).setAttribute("onmouseover", "");
    document.getElementById(new_id).setAttribute("onmouseout", "");
}

function unselectAll(){
    var mark = "sb-";
    var currentSelection = $("div[id^=" + mark + "]");
    var current_id = currentSelection.attr("id");
    if(typeof(current_id) != "undefined"){
        var obj = document.getElementById(current_id);
        obj.style.color = 'coral';
        obj.style.backgroundColor = "";

        obj.setAttribute("onmouseover", "filterSpanSelected(this)");
        obj.setAttribute("onmouseout", "filterSpanUnselected(this)");

        current_id = current_id.replace(/[^0-9]/ig,"");
        obj.id = current_id;
    }
}

function init(){
	var card1=getParameter("card1");
    $.ajax({
        type: 'POST',
        url: '../html/checkCard.php',
        data: {cardNum:card1},
        dataType: 'json',
        success: function(data){
			if(data){
				getLoginInformation();
				getLike();
				initRCMargin();
    			initWidth();
   				initPadding();
    			initOptionMargin();
    			document.getElementById("sb-5").style.backgroundColor = "coral";
    			document.getElementById("sb-5").style.color = "#fff";
				$("#logoutBtn").click(function(){
					window.location.href="../index.php";
				});
			}
			else{
    			initWidth();
				setTimeout(function(){
					alert(card1+"用户，您还未登陆该账号");
					window.location.href="../index.php";},5);
			}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        }
    });
}

function initRCMargin(){
    var screenWidth = window.innerWidth;
    var rcWidth = $("#release-container").width();
    var marginLeft = (screenWidth - rcWidth) / 2;
    $("#release-container").css("margin-left", marginLeft);
    var screenWidth = window.innerHeight;
    var rcWidth = $("#release-container").height();
    var marginTop = (screenWidth - rcWidth) / 2;
    $("#release-container").css("margin-top", marginTop);
}

function initPcMargin(){
    var screenWidth = screen.width;
    var pcWidth = $("#page-container").width();
    var marginLeft = (screenWidth - pcWidth) / 2;
    $("#page-container").css("margin-left", marginLeft);
}

function initWidth(){
    var screenWidth = screen.width - getScrollbarWidth();
    $("#header").css("width", screenWidth);
    $("#head").css("width", screenWidth);
    $("#title-container").css("width", screenWidth);
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

function initPadding(){
    var screenWidth = screen.width
    var pcWidth = $("#page-container").width();
    var paddingLeft = (screenWidth - pcWidth) / 2;
//    $("#header").css("padding-left", paddingLeft);
//    $("#header").css("padding-right", paddingLeft);
    $("#option-container").css("padding-left", paddingLeft);
}

function initOptionMargin(){
    var mark = "-B";
    var fbWidth = $("#filter-bar").width();
    var oWidth = $("div[id$=" + mark + "]").width();
    var oMargin = (fbWidth - oWidth * 6) / 5;
    $("div[id$=" + mark + "]").css("margin-right", oMargin);
}

function findKindByIndex(idx){
    switch(idx){
        case "01":
            return "0";
            break;
        case "02":
            return "篮球";
            break;
        case "03":
            return "足球";
            break;
        case "04":
            return "排球";
            break;
        case "05":
            return "羽毛球";
            break;
        case "06":
            return "乒乓球";
            break;
        case "07":
            return "网球";
            break;
        case "08":
            return "跑步";
            break;
        case "09":
            return "骑行";
            break;
        case "10":
            return "健身";
            break;
        case "11":
            return "自习";
            break;
        case "12":
            return "其他";
            break;
        default:
            return "0";
            break;
    }
}

function showRelease(){
	if(checkip()){
   	 	document.getElementById("cover").style.display = "block";
    	document.getElementById("release-container").style.display = "block";
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
function hideRelease(){
    document.getElementById("cover").style.display = "none";
    document.getElementById("release-container").style.display = "none";
    clearReleaseInfo();
}

function clearReleaseInfo(){
    $("#release-kind").val(0);
    $("#release-bucket").val(0);
    $("#release-date").val("");
    $("#release-introduction").val("");
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
            hideRelease();
            alert("发布成功！");
            selectFilterSpan("4");
            getActivities("0", "0");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
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

//function getCardNumber(){
//    return $("#header-card").text();
//}

////通过提交表单实现页面跳转
//function visitDetail(e){
//    var l = e.id.length;
//    var idx = e.id.substring(4, l);
//    var id = "id" + idx;
//    var activity_id = $("#" + id).text();
//    $("#activity-id").attr("value", activity_id);
//    $("#detail-card").attr("value", getCardNumber());
//    document.forms["detail-form"].submit();
//}

function visitDetail(e){
    var l = e.id.length;
    var idx = e.id.substring(4, l);
    var id = "id" + idx;
    var activity_id = $("#" + id).text();
    var card1 = getParameter("card1");
    window.location.href = "activity.html?id=" + activity_id
        + "&card1=" + card1;
}

////通过提交表单实现页面跳转
//function visitSelf(){
//    $("#home-card").attr("value", getCardNumber());
//    document.forms["home-self-form"].submit();
//}

//新建窗口
function visitSelf(e){
    var card = getParameter("card1");
    var card1 = getParameter("card1");
    var url = "home.html?card=" + card + "&card1=" + card1;
    window.open(url);
}

function appoint(e){
	if(checkip()){
   	 	var l = e.id.length;
    	var idx = e.id.substring(3, l);
    	var id = "id" + idx;
    	var activity_id = $("#" + id).text();
    	var ctime = getTime();
    	var card1 = getParameter("card1");
    	$.ajax({
        	type: 'POST',
        	url: 'appoint_ta.php',
        	data: {id:activity_id,card1:card1,ctime:ctime},
        	dataType: 'json',
        	success: function(data){
            	$.each(data, function(){
                	if(this.message=="相同"){

					}
					else{
						alert(this.message);
						if (e.innerHTML == "约约约~"){e.innerHTML="已约";}
						else{e.innerHTML="约约约~";}
					}
            	});
        	},
        	error: function(XMLHttpRequest, textStatus, errorThrown){
        	}
    	});
	}
	else{
		setTimeout(function(){
			alert("您的用户已在其他地方登陆，请重新登陆");
			window.location.href="../index.php";},5);
	}
}

function getTime(){
	var myDate = new Date();
	var y = myDate.getFullYear();
    var m = myDate.getMonth()+1;
    var d = myDate.getDate();
    var h = myDate.getHours();
    var mi = myDate.getMinutes();
    var s = myDate.getSeconds();
	var ctime = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    return ctime;
}

//阻止冒泡= =不知道为什么没有
//function stopPropagation(e) {
//    e = e || window.event;
//    if(e.stopPropagation) { //W3C阻止冒泡方法
//        e.stopPropagation();
//    } else {
//        e.cancelBubble = true; //IE阻止冒泡方法
//    }
//}

function initBtnDown(){
    var mark = "btn";
    var currentSelection = $("div[id^=" + mark + "]");
    currentSelection.onclick(function(e){
        stopPropagation(e);
    });
}

function stopBubble(e){
    var l = e.id.length;
    var idx = e.id.substring(3, l);
    var c_card = "card" + idx;
    $("#" + c_card).attr("onclick", "");
}

function setBubble(e){
    var l = e.id.length;
    var idx = e.id.substring(3, l);
    var c_card = "card" + idx;
    $("#" + c_card).attr("onclick", "visitDetail(this)");
}

function getLike(){
    var c = getParameter("card1");
    $.ajax({
        type: 'POST',
        url: 'mau.php',
        data: {card1:c},
        dataType: 'json',
        success: function(data){
        var display = "";
        var counter = 1;
        $.each(data, function(){
            var new_card
            = '<div class="card" id="card' + counter
            + '" onclick="visitDetail(this)">'
//            + '">'
            + '<div class="logo-container">'
            + '<img class="img-logo" src="' + this.icon + '">'
            + '</div>'
            + '<div class="info-container">'
            + '<div class="id" id="id' + counter + '">' + this.id + '</div>'
            + '<div class="name">' + this.nick + '</div>'
            + '<div class="detail">' + this.kind + '，' + this.time.substring(0, 16) + '</div>'
            + '</div>'
            + '<div class="button_container">'
            + '<button type="button" class="btn btn-danger btn-lg" id="btn' + counter + '" onclick="appoint(this);" onmouseover="stopBubble(this);" onmouseout="setBubble(this)">'
            + this.flag + '</button>'
            + '</div>'
            + '</div>';
            display += new_card;
            counter++;
        });
            document.getElementById("cc").innerHTML = display;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}
