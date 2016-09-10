<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");

//$activity_id = @$_POST['activity_id'];
$card1 = @$_POST['card1'];
$card = @$_POST['card'];
//$card = "213140777";
//$card1 = "213131706";
$ctime = @$_POST['ctime'];
$message="";
$mark = "";
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);
$sql = "SELECT * FROM thumb WHERE card=".$card." AND card1=".$card1;
$result = mysql_query($sql);
if(mysql_num_rows($result) < 1){
	$sql1 = "INSERT into thumb (card,card1,ctime) values( ".$card.",".$card1.",'".$ctime."')";
	$message="插入";
	}
else{
	$sql1 = "DELETE FROM thumb WHERE (card = ".$card.") && (card1 = ".$card1.")";
	$message="删除";
	}
$result1 = mysql_query($sql1);
if ($result1){
  if($message=="插入"){
		$message="赞好啦！";
    $mark="1";
	}
	else{
		$message="不赞了！";
    $mark="0";
	}
}
else{
   $message=$message."失败!";
    $mark="0";
}
$single_info = array(
        //'nick' => $nick[0],
        'message' => $message,
        'mark' => $mark
    );
	array_push($all_info, $single_info);

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>