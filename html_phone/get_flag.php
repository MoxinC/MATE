<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");
$card1 = @$_POST['card1'];
$id = @$_POST['id'];
$all_info = array();
$single_info = array();
$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT card FROM activity WHERE id=" .$id;
$result = mysql_query($sql);

$roww = mysql_fetch_array($result);
$card = $roww[0];

$sql1 = "SELECT * FROM thumb WHERE card=".$card." AND card1=".$card1;
$result1 = mysql_query($sql1);
if(mysql_num_rows($result1) < 1){
	$flag1=0;
}
else{
	$flag1=1;
}
$sql2 = "SELECT * FROM appointment WHERE id=".$id." AND card1=".$card1;
$result2 = mysql_query($sql2);
if(mysql_num_rows($result2) < 1){
	$flag2=0;
}
else{
	$flag2=1;
}

$single_info = array(
 //'nick' => $nick[0],
 'flag1' => $flag1,
 'flag2' => $flag2,
 'card' => $card,
 );
 array_push($all_info, $single_info);


$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>