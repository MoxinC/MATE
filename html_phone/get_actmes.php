<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");

$activity_id = @$_POST['activity_id'];
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT * FROM activity WHERE id=" .$activity_id;
$result = mysql_query($sql);

$counter = 0;
while ($row = mysql_fetch_array($result))
{
    $cardIdx = $row['card'];
    $account_res = mysql_query("SELECT * FROM information WHERE card=" .$cardIdx
	);
	$temp = mysql_fetch_array($account_res);
	
	//$all_info=$response_mes;
//    $single_info['nick'] = $nick[0];
//    $single_info['id'] = $row['id'];
//    $single_info['card'] = $row['card'];
//    $single_info['kind'] = $row['kind'];
//    $single_info['time'] = $row['time'];
//    $single_info['introduction'] = $row['introduction'];
//    $single_info['appointed'] = $row['appointed'];
//    $single_info['bucket'] = $row['bucket'];
    $single_info = array(
        //'nick' => $nick[0],
        'id' => $row['id'],
        'card' => $row['card'],
        'kind' => $row['kind'],
        'time' => $row['time'],
        'act_introduction' => $row['introduction'],
        'appointed' => $row['appointed'], 
        'bucket' => $row['bucket'],
		'nick' => $temp['nick'],
		'sex' => $temp['sex'],
		'icon' => $temp['icon'],
		'introduction' => $temp['introduction'],
		'number' => $temp['number'],
        'phone' => $temp['phone']
    );
    array_push($all_info, $single_info);
}

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>