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

$sql = "SELECT * FROM information WHERE card=$card";
$result = mysql_query($sql);

$counter = 0;
while ($row = mysql_fetch_array($result))
{
    $single_info = array(
        //'nick' => $nick[0],
        'card' => $row['card'],
		'nick' => $row['nick'],
		'sex' => $row['sex'],
		'icon' => $row['icon'],
		'introduction' => $row['introduction'],
		'number' => $row['number'],
    );
    array_push($all_info, $single_info);
}

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>