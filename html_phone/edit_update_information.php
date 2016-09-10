<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");

$card = @$_POST["card"];
$nick = @$_POST["nick"];
$sex = @$_POST["sex"];
$phone = @$_POST["phone"];
$faculty = @$_POST["faculty"];
$introduction = @$_POST["introduction"];

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "UPDATE information" .
    " SET nick='" . $nick .
    "' , sex='" . $sex .
    "' , phone='" . $phone .
    "' , faculty='" . $faculty .
    "' , introduction='". $introduction .
    "' WHERE card=" . $card;
mysql_query($sql);
mysql_close($con);

echo true;
?>