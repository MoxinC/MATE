<?php
header("Content-type: text/html; charset=utf-8");
require_once("../conf/config.php");

$card = @$_POST["card"];
$kind = @$_POST["kind"];
$bucket = @$_POST["bucket"];
$appointed = @$_POST["appointed"];
$time = @$_POST["time"];
$introduction = @$_POST["introduction"];
//$card = "213140777";
//$kind = "羽毛球";
//$bucket = "上午";
//$appointed = 0;
//$time = "2016-02-02";
//$introduction = "dasfasfasfas";

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "INSERT INTO activity"
    . "(card, kind, time, introduction, appointed, bucket)"
//    . " VALUES('213140777','羽毛球','2016-02-04','dsadasdas','0','上午')";
    . " VALUES('$card', '$kind', '$time', '$introduction', '$appointed', '$bucket')";
//echo $sql;
mysql_query($sql);
mysql_close($con);

echo true;
?>