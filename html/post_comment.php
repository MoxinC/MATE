<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");

//$activity_id = @$_POST['activity_id'];
$id = @$_POST['id'];
$msg = @$_POST['msg'];
$card1 = @$_POST['card1'];
$ctime = @$_POST['ctime'];
$message="";
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql1 = "INSERT into message (id,card1,msg,ctime) values( ".$id.",".$card1.",'".$msg."','".$ctime."')";

$result1 = mysql_query($sql1);
if ($result1){
	$message="评论成功";
}
else{
	$message=$sql1;
}
$single_info = array(
        //'nick' => $nick[0],
        'message' => $message,
    );
	array_push($all_info, $single_info);

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>