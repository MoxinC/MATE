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
            document.getElementById("header-name").innerHTML = data.nick;
            document.getElementById("card").innerHTML = getParameter("card");
            document.getElementById("nick").innerHTML = data.nick + "&nbsp&nbsp" + data.sex;
//            document.getElementById("sex").innerHTML = data.sex;
            document.getElementById("phone").innerHTML = "" + data.phone;
            document.getElementById("faculty").innerHTML = data.faculty;
            document.getElementById("introduction").innerHTML = "个人简介: " + data.introduction;
            /*
document.getElementById("thumb-num").innerHTML = data.number;
*/
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
                ='<div class="card-time">' + this.time.substring(0, 16) + "&nbsp" + this.bucket + '</div>'
                + 
				'<div class="card" id="release-card' + r_counter + '" onclick="visitReleaseDetail(this)">'
                + '<div class="card-kind">' + this.kind + '</div>'
                +  '<div style="display:none" id="release-id' + r_counter + '">' + this.id + '</div>'
                + '</div>';
                release_display += release_card;
		     	r_counter=r_counter+1;
            }else if(this.time <= time){
                var keep_card 
                ='<div class="card-time">' + this.time.substring(0, 16) + "&nbsp" + this.bucket + '</div>'
                + 
				'<div class="card" id="release-card' + r_counter + '" onclick="visitReleaseDetail(this)">'
                + '<div class="card-kind">' + this.kind + '</div>'
                +  '<div style="display:none" id="release-id' + r_counter + '">' + this.id + '</div>'
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
                ='<div class="card-time">' + this.time.substring(0, 16) + "&nbsp" + this.bucket + '</div>'
                +  '<div class="card" id="yue-card' + y_counter + '" onclick="visitYueDetail(this)">'
                + '<div class="card-kind">' + this.kind + '</div>'
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
//    $("#edit-card").attr("value", getParameter("card1"));
//    document.forms["edit-form"].submit();
    window.location.href = "edit.html?card=" + getParameter("card");
}

function backToMain(){
    window.location.href = "main.html?card1=" + getParameter("card1");
//    $("#main-card").attr("value", getParameter("card1"));
//    document.forms["main-form"].submit();
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
function thumb_ta(){
	var request =
    {
		QueryString : function(val)
		{
			var uri = window.location.search;
			var re = new RegExp("" +val+ "=([^&?]*)", "ig");
			return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
		}
	}
    var card = unescape( request.QueryString("card"));
    var card1 = unescape( request.QueryString("card1"));
	var ctime = getTime();
		 $.ajax({
        type: 'POST',
        url: 'home_thumb_ta.php',
        data: {card:card,card1:card1,ctime:ctime},
        dataType: 'json',
        success: function(data){
            $.each(data, function(){
				get_num();
                get_flag();
        });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}
function get_num(){
	var request =
    {
		QueryString : function(val)
		{
			var uri = window.location.search;
			var re = new RegExp("" +val+ "=([^&?]*)", "ig");
			return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
		}
	}
    var card = unescape( request.QueryString("card"));
		 $.ajax({
        type: 'POST',
        url: 'get_num.php',
        data: {card:card},
        dataType: 'json',
        success: function(data){
            $.each(data, function(){
				document.getElementById("thumb-num").innerHTML=this.num1;
				document.getElementById("live-num").innerHTML=this.num2;
        });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

function get_flag(){
	var request =
    {
		QueryString : function(val)
		{
			var uri = window.location.search;
			var re = new RegExp("" +val+ "=([^&?]*)", "ig");
			return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
		}
	}
    var card = unescape( request.QueryString("card"));
	var card1 = unescape( request.QueryString("card1"));
		 $.ajax({
        type: 'POST',
        url: 'home_get_flag.php',
        data: {card:card,card1:card1},
        dataType: 'json',
        success: function(data){$.each(data, function(){
			var flag1=this.flag1;
				if(flag1==0){
					document.getElementById("flag").innerHTML="+&nbsp;&nbsp;点赞";
				}
				else{
					document.getElementById("flag").innerHTML="√&nbsp;&nbsp;已赞";
				}
        });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            
        }
    });
}