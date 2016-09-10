<?php
require_once("../conf/config.php");
$card = @$_POST["card"];
$password = @$_POST["password"];
/*
$ip = @$_POST["ip"];
$ip = gethostbyname(gethostbyaddr($_SERVER['REMOTE_ADDR'])); //获取本机的局域网IP
*/
$passwd = "";
$respond = 0;
session_start();
$ip=session_id();
$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT * FROM account WHERE card=" . $card;

if($card != ""){
$result = mysql_query($sql);


while ($row = mysql_fetch_array($result)){
    $passwd = $row['password'];
}

if($password == $passwd){
    $respond = 1;
	$_SESSION['cardNum']=$card;
	$_SESSION['IP']=$ip;
	$sql_set_ip="UPDATE account set user_IP = '".$ip."' WHERE card=" . $card;
	mysql_query($sql_set_ip);
}
else{
    $respond = 0;
}
}
$info_json = json_encode($respond);
echo $info_json;
mysql_close($con);
?>