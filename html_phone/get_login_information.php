<?php
header("Content-type: text/html; charset=utf-8");
require_once("../conf/config.php");

$card1 = @$_POST["card1"];
    
$info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT * FROM information WHERE card=" . $card1;

$result = mysql_query($sql);

while ($row = mysql_fetch_array($result))
{
    $info = array(
        'nick' => $row['nick'],
        'icon' => $row['icon']
    );
}

$info_json = json_encode($info);
echo $info_json;
mysql_close($con);
?>