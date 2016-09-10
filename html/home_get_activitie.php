<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");

$card = @$_POST["card"];
//$card = "213140777";

$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "Select a.id,b.card,b.time,b.kind,b.introduction,b.bucket FROM appointment AS a LEFT JOIN activity AS b ON a.id=b.id WHERE a.card1 = $card order by b.time DESC";

$result = mysql_query($sql);

while ($row = mysql_fetch_array($result))
{
    $single_info = array(
        'id' => $row['id'],
        'card' => $row['card'],
        'kind' => $row['kind'],
        'time' => $row['time'],
        'introduction' => $row['introduction'],
        'bucket' => $row['bucket']
    );
    array_push($all_info, $single_info);
}

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>