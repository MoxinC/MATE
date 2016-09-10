<?php
header("Content-type: text/html; charset=utf-8");
require_once("../conf/config.php");

$id = @$_POST['id'];
$card1 = @$_POST['card1'];
$respond = 0;

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT card FROM activity WHERE id=".$id;
$result = mysql_query($sql);
$row = mysql_fetch_array($result);
$card = $row[0];

$sql = "SELECT * FROM thumb WHERE card=" . $card;
$result = mysql_query($sql);

while ($row = mysql_fetch_array($result)){
    $c = $row['card1'];
    if($c == $card1){
        $respond = 1;
        break;
    }
}

$info_json = json_encode($respond);
echo $info_json;
mysql_close($con);
?>