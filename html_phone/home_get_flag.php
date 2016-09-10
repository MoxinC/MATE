<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");
$card = @$_POST['card'];
$card1 = @$_POST['card1'];
$all_info = array();
$single_info = array();
$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql1 = "SELECT * FROM thumb WHERE card=".$card." AND card1=".$card1;
$result1 = mysql_query($sql1);
if(mysql_num_rows($result1) < 1){
	$flag1=0;
}
else{
	$flag1=1;
}

$single_info = array(
 //'nick' => $nick[0],
 'flag1' => $flag1,
 );
 array_push($all_info, $single_info);


$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>