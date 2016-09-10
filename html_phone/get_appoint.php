<?php
header("Content-type: text/html; charset=utf-8");
require_once("../conf/config.php");

$id = @$_POST['id'];
//$id = 1;
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT * FROM appointment WHERE id=$id order by ctime DESC";
$result = mysql_query($sql);

$counter = 0;
while ($row = mysql_fetch_array($result))
{
    $cardIdx = $row['card1'];
    $account_res = mysql_query("SELECT * FROM information WHERE card=" .$cardIdx
	);
	$temp = mysql_fetch_array($account_res);
    $single_info = array(
        //'nick' => $nick[0],
        'card' => $row['card1'],
		'nick' => $temp['nick'],
		'sex' => $temp['sex'],
		'icon' => $temp['icon'],
		'introduction' => $temp['introduction'],
		'number' => $temp['number'],
    );
    array_push($all_info, $single_info);
}

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>