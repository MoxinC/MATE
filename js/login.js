//document.write(returnCitySN["cip"]+','+returnCitySN["cname"])  
function login(){
	//var ip=returnCitySN["cip"];
    var c;
    var p;
    c = document.getElementById('username').value;
    p = document.getElementById('password').value;
    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: {card:c, password:p},
        dataType: 'text',
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
            alert(errorThrown);
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}
