
var cardnum;

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

function getActivityId(){
    var param = "id";
    var query = window.location.search;
    var iLen = param.length;
    var iStart = query.indexOf(param);
    if(iStart == -1)
        return "";
    iStart = iLen + 2;
    var iEnd = query.indexOf("&", iStart);
    if(iEnd == -1)
        return query.substring(iStart);
    return query.substring(iStart, iEnd);
}

function get_time(){
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

function getLoginInformation(){
    var c = getParameter("card1");
    $.ajax({
        type: 'POST',
        url: 'get_login_information.php',
        data: {card1:c},
        dataType: 'json',
        success: function(data){
//            document.getElementById("header-name").innerHTML = data.nick;
            $("#header-icon").attr("src", data.icon);
        },
//        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert("Error:getInformation");
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
//        }
    });
}

function get_message(){
    var sid=getActivityId();
	var sexname;
    $.ajax({
        type: 'POST',
        url: 'get_actmes.php',
        data: {activity_id:sid},
        dataType: 'json',
        success: function(data){
            // alert(data);
        $.each(data, function(){
			if(this.sex=='男'){
				sexname='male';
			}
			else{
				sexname='female';
			}
			document.getElementById("name_info").innerHTML=this.nick;
			document.getElementById("phone_info").innerHTML=this.phone;
			document.getElementById("kind_info").innerHTML=this.kind;
			document.getElementById("intro_info").innerHTML=this.act_introduction;
			document.getElementById("time_info").innerHTML=this.time.substring(0, 16) + " | " + this.bucket;
			document.getElementById("sex_info").src="../img_phone/"+sexname+".png";
			document.getElementById("head_info").src=this.icon;
			cardnum=this.card;
			var hang;
			if((this.act_introduction).length<15){
				hang=1;
			}
			else{
				hang=1+Math.ceil(((this.act_introduction).length-14)/18);
			}
			document.getElementById("mycontainer").style.height=190+hang*20+'px';
			
            /*
var new_card 
            = '<div class="card" onmouseover="this.className=\'card-hover\'" onmouseout="this.className=\'card\'">'
            + '<div class="logo-container"></div>'
            + '<div class="info-container">'
            + '<div class="name">' + this.nick + '</div>'
            + '<div class="detail">' + this.kind + '，' + this.time + '</div>'
            + '</div>'
            + '<div class="button_container">'
            + '<button type="button" class="btn btn-danger btn-lg">约约约~</button>'
            + '</div>'
            + '</div>';
            display += new_card;
*/
            document.getElementById("zan_top1_in").innerHTML="";
            get_thumb();
			get_appoint();
			get_comment();
        });
           /*
 document.getElementById("cc").innerHTML = display;
*/
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
        }
    });
}
function get_thumb(){
	 $.ajax({
        type: 'POST',
        url: 'get_thumb.php',
        data: {card:cardnum},
        dataType: 'json',
        success: function(data){
			document.getElementById("zan_top1_in").innerHTML="";
			document.getElementById("zan_top1_in").innerHTML+='<div id="hidden_div1" class="hidden_div" hidden="hidden" onmouseover="hover_head1()" onmouseout="over_head()"></div>';
			$.each(data, function(){
			document.getElementById("zan_top1_in").innerHTML+='<img id="thumb_icon" name="'+this.card+'" class="thumb_head" src="'+this.icon+'"   onmouseover="hover_head(this)" onmouseout="over_head(this)" onclick="visitOthers(this)" />';
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
function get_appoint(){
     var sid=getActivityId();
	 $.ajax({
        type: 'POST',
        url: 'get_appoint.php',
        data: {id:sid},
        dataType: 'json',
        success: function(data){
			document.getElementById("zan_top2_in").innerHTML="";
			document.getElementById("zan_top2_in").innerHTML+='<div id="hidden_div2" class="hidden_div2" hidden="hidden" onmouseover="hover_head22()" onmouseout="over_head2()"></div>';
			$.each(data, function(){
			document.getElementById("zan_top2_in").innerHTML+='<img id="head_info" name="'+this.card+'" class="thumb_head" src="'+this.icon+'"   onmouseover="hover_head2(this)" onmouseout="over_head2(this)" onclick="visitOthers(this)" />';
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
//function hover_head(obj){
//	var left=obj.offsetLeft+38;
//	var top=obj.offsetTop+42;
//	document.getElementById("hidden_div1").hidden=false;
//	document.getElementById("hidden_div1").style.marginLeft=left+"px";
//	document.getElementById("hidden_div1").style.marginTop=top+"px";
//	hidden_div_mes(obj.name,1);
//	
//}
//function hover_head1(){
//	document.getElementById("hidden_div1").hidden=false;
//	document.getElementById("hidden_div1").style.marginLeft=left+"px";
//	document.getElementById("hidden_div1").style.marginTop=top+"px";
//}
//function over_head(){
//	document.getElementById("hidden_div1").hidden=true;
//}
//function hover_head2(obj){
//	var left=obj.offsetLeft+38;
//	var top=obj.offsetTop-85;
//	document.getElementById("hidden_div2").hidden=false;
//	document.getElementById("hidden_div2").style.marginLeft=left+"px";
//	document.getElementById("hidden_div2").style.marginTop=top+"px";
//	hidden_div_mes(obj.name,2);
//	
//}
//function hover_head22(){
//	document.getElementById("hidden_div2").hidden=false;
//	document.getElementById("hidden_div2").style.marginLeft=left+"px";
//	document.getElementById("hidden_div2").style.marginTop=top+"px";
//}
//function over_head2(){
//	document.getElementById("hidden_div2").hidden=true;
//}
//function hover_head3(obj){
//	pobj=obj.parentNode.parentNode;
//	var left=pobj.offsetLeft+70;
//	var top=pobj.offsetTop+50;
//	document.getElementById("hidden_div3").hidden=false;
//	document.getElementById("hidden_div3").style.marginLeft=left+"px";
//	document.getElementById("hidden_div3").style.marginTop=top+"px";
//	hidden_div_mes(obj.name,3);
//}
//function hover_head33(){
//	document.getElementById("hidden_div3").hidden=false;
//	document.getElementById("hidden_div3").style.marginLeft=left+"px";
//	document.getElementById("hidden_div3").style.marginTop=top+"px";
//}
//function over_head3(){
//	document.getElementById("hidden_div3").hidden=true;
//}
function changeimg(){
	var nowimg=document.getElementById("shangxia").name;
	if(nowimg=="shang")
	{
		document.getElementById("shangxia").name="xia";
		document.getElementById("shangxia").src="../img_phone/unfold.png";
		document.getElementById("zan_top1").style.height="58px";
        document.getElementById("zan_top1").style.overflow="hidden";
 		document.getElementById("zan_top1_in").style.height="58px";
		document.getElementById("zan_top1_in").style.overflow="hidden";
		document.getElementById('zan_top1_in').scrollTop=0;
	}
	else
	{
		document.getElementById("shangxia").name="shang";
		document.getElementById("shangxia").src="../img_phone/fold.png";
		document.getElementById("zan_top1").style.height="auto";
//		document.getElementById("zan_top1").style.overflow="auto";
		document.getElementById("zan_top1_in").style.height="auto";
//		document.getElementById("zan_top1_in").style.overflow="auto";
	}
	
}
//function hidden_div_mes(name,num){
//	$.ajax({
//        type: 'POST',
//        url: 'get_people_info.php',
//        data: {card:name},
//        dataType: 'json',
//        success: function(data){$.each(data, function(){
//			var sexname;
//			var hiddendiv="hidden_div"+num;
//			if(this.sex=="男"){sexname="他"}
//			else{sexname="她"}
//			document.getElementById(hiddendiv).innerHTML=
//			'<div class="info-container">'
//			+ '<div class="topcolor">'
//            + '<div class="name"><b>' + this.nick + '</b></div>'
//            + '<div class="sex">' + this.sex + '</div>'
//			+ '</div>'
//			+ '<div style="margin-left:5px;"><font style="float:left;">介绍:</font></br><div class="introduction"> ' + this.introduction + '</div></div>'
//			+ '<div class="number_out"><table><tr><td width="110" align="center"><font  style="color:#F00"> ' + this.number + '</font>人赞过'+sexname+'</td></tr></table></div>'
//            + '</div>';
//        });
//        },
//        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
//        }
//    });
//}

function thumb_ta(){
	if(checkip()){
    	var ctime = get_time();
    	var card1 = getParameter("card1"); 
    	var sid = getActivityId();
		$.ajax({
        	type: 'POST',
        	url: 'thumb_ta.php',
        	data: {activity_id:sid,card1:card1,ctime:ctime},
        	dataType: 'json',
        	success: function(data){
            	$.each(data, function(){
					var result=this.message;
            		var mark = this.mark;
					t_success_or_not(result, mark);
					get_thumb();//刷新赞列表
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
function appoint_ta(){
	if(checkip()){
    	var ctime = get_time();
    	var card1 = getParameter("card1"); 
    	var sid = getActivityId();
		$.ajax({
        	type: 'POST',
        	url: 'appoint_ta.php',
        	data: {id:sid,card1:card1,ctime:ctime},
        	dataType: 'json',
        	success: function(data){
				$.each(data, function(){
					var result=this.message;
            		var mark = this.mark;
					if(result=="相同"){
					}
					else{
						a_success_or_not(result, mark);
						get_appoint();
					}//刷新赞列表
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
//function appoint_ta(){
//    var sid=getActivityId();
//	get_time();
//		 $.ajax({
//        type: 'POST',
//        url: 'appoint_ta.php',
//        data: {id:sid,card1:card1,ctime:ctime},
//        dataType: 'json',
//        success: function(data){$.each(data, function(){
//			var result=this.message;
//			success_or_not(result);
//			get_appoint();//刷新赞列表
//        });
//        },
//        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert(errorThrown);
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
//        }
//    });
//}




/*
function success_or_not(message){
	var top=window.document.body.scrollTop;
	var left=window.screen.width/2;
	document.getElementById("bg").style.top=top+"px";
	document.getElementById("tishidiv").style.top=(top+window.screen.height*0.25)+"px";
	document.getElementById("tishi").innerHTML=message;
	document.getElementById("bg").hidden=false;
	document.getElementById("tishidiv").hidden=false;
	document.getElementById("tishidiv").style.marginLeft=left/10+"px";
	setTimeout("hidden_it()",800);
}
*/

function t_success_or_not(message, mark){
    if(mark == "1"){
        $("#thumb_icon").attr("src", "../img/thumb_h.png");
    }
    else{
        $("#thumb_icon").attr("src", "../img/thumb.png");
    }
}
function a_success_or_not(message, mark){
    if(mark == "1"){
        $("#appoint_icon").attr("src", "../img/appoint_h.png");
    }
    else{
        $("#appoint_icon").attr("src", "../img/appoint.png");
    }
}

function hidden_it(){
	document.getElementById("bg").hidden=true;
	document.getElementById("tishidiv").hidden=true;
}
function get_comment(){
    var sid=getActivityId();
	$.ajax({
        type: 'POST',
        url: 'get_comment.php',
        data: {id:sid},
        dataType: 'json',
        success: function(data){
			document.getElementById("comment").innerHTML="";
//            alert(data);
			$.each(data, function(){
			document.getElementById("comment").innerHTML+='<tr ><td class="td1"> '
			+'<img id="commit_icon" name="'+this.card
			+'" class="comment_head" src=\''+this.icon+'\''
			+'onmouseover="hover_head3(this)"'
			+' onmouseout="over_head3(this)"  onclick="visitOthers(this)"/></td>'
			+'<td class="td2"><div style="margin-right:30px;">'
			+'<a>'+this.nick
			+'</a>：'+this.message
			+'</div></td></tr>';
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
function post_comment(mes){
    var sid=getActivityId();
    var card1 = getParameter("card1"); 
	var ctime=get_time();
	$.ajax({
        type: 'POST',
        url: 'post_comment.php',
        data: {id:sid,msg:mes,ctime:ctime,card1:card1},
        dataType: 'json',
        success: function(data){$.each(data, function(){
			get_comment();//刷新评论列表
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

function visit(){
//    var card1 = $("#header-card").text();
//    $("#visit-card").attr("value", cardnum);
//    $("#visit-card1").attr("value", card1);
//    document.forms["visit-form"].submit();
    var card1 = getParameter("card1"); 
    var url = "home_visitor.html?card=" + cardnum + "&card1=" + card1;
    window.open(url);
}

function visitSelf(){
    var card = getParameter("card1"); 
    var card1 = getParameter("card1"); 
    var url = "home.html?card=" + card + "&card1=" + card1;
    window.open(url);
}

//function getCardNumber(){
//    return $("#header-card").text();
//}

function visitOthers(obj){
    var card = obj.name;
    var card1 = getParameter("card1");
    var card1 = getParameter("card1"); 
    var url = "home_visitor.html?card=" + card + "&card1=" + card1;
    window.open(url);
//    $("#visit-card").attr("value", card);
//    $("#visit-card1").attr("value", card1);
//    document.forms["visit-form"].submit();
}

function backToMain(){
    var card1 = getParameter("card1");
    window.location.href = "main.html?card1=" + card1;
}

/*
function setHeaderPadding(){
    var cwidth = $("#activity_info").width();
    var screenWidth = screen.width - getScrollbarWidth();
    var padding = (screenWidth - cwidth) / 2;
    var attr = "0px " + padding + "px";
    $("#header").css("padding", attr);
}
*/
function get_flag(num){
	var sid=getActivityId();
    var card1 = getParameter("card1");
		 $.ajax({
        type: 'POST',
        url: 'get_flag.php',
        data: {id:sid,card1:card1},
        dataType: 'json',
        success: function(data){$.each(data, function(){
			var flag1=this.flag1;
            var flag2=this.flag2;
			if(num==1){
				if(flag1==0){
					document.getElementById("flag").innerHTML="<img class='zan' id='thumb_icon' src='../img/thumb.png' onclick='thumb_ta()' />";
				}
				else{
					document.getElementById("flag").innerHTML="<img class='zan' id='thumb_icon' src='../img/thumb_h.png' onclick='thumb_ta()' />";
				}
			}
			else{
				if(flag2==0){
					document.getElementById("flag").innerHTML="<img class='zan' id='appoint_icon' src='../img/appoint.png' onclick='appoint_ta()' />";
				}
				else{
					document.getElementById("flag").innerHTML="<img class='zan' id='appoint_icon' src='../img/appoint_h.png' onclick='appoint_ta()' />";
				}
			}
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

function init(){
    var h = $(".head").width();
    $(".head").css("height", h);
}