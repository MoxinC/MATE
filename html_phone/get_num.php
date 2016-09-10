<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");

$card = @$_POST['card'];
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT * FROM thumb WHERE card=$card";
$result = mysql_query($sql);
$count1 = mysql_num_rows($result);

$sql2 = "SELECT * FROM appointment WHERE card1=$card";
$sql3 = "SELECT * FROM activity WHERE card=$card";
$result2 = mysql_query($sql2);
$result3 = mysql_query($sql3);
$count2 = mysql_num_rows($result2)+mysql_num_rows($result3);

$single_info = array(
   //'nick' => $nick[0],
    'num1' => $count1,
	'num2' => $count2,
);
    array_push($all_info, $single_info);

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>