<?php
header("Content-type: text/html; charset=utf-8");
require_once("../conf/config.php");

$kind = @$_POST["kind"];
$bucket = @$_POST["bucket"];
$card1 = @$_POST["card1"];

$all_info = array();
$single_info = array();

$current_time = date('Y-m-d H:i:s');

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "";

if($bucket == "0" && $kind == "0"){
    $sql = "SELECT * FROM activity WHERE card <> $card1 ORDER BY time DESC";
}
else if($bucket == "0"){
    $sql = "SELECT * FROM activity WHERE kind='" . $kind . "' AND card <> $card1 ORDER BY time DESC";
}
else if($kind == "0"){
    $sql = "SELECT * FROM activity WHERE bucket='" . $bucket . "' AND card <> $card1 ORDER BY time DESC";
}
else{
    $sql = "SELECT * FROM activity WHERE kind='" . $kind . "' AND bucket='" . $bucket . "' AND card <> $card1 ORDER BY time DESC";
}

$result = mysql_query($sql);

while ($row = mysql_fetch_array($result))
{
    $activity_time = $row['time'];
    if (strtotime($activity_time) > strtotime($current_time))
    {
      $cardIdx = $row['card'];
      $nick_res = mysql_query("SELECT nick FROM information WHERE card=" .$cardIdx);
      $nick = mysql_fetch_array($nick_res);
      $icon_res = mysql_query("SELECT icon FROM information WHERE card=" .$cardIdx);
      $icon = mysql_fetch_array($icon_res);

      $id = $row['id'];
      $hehe = mysql_query("SELECT * FROM appointment WHERE id=$id && card1=$card1");
      if(mysql_num_rows($hehe) < 1){
        $flag="约约约~";
      }
      else{
        $flag="已约";
      }

      $single_info = array(
          'nick' => $nick[0],
          'icon' => $icon[0],
          'id' => $row['id'],
          'card' => $row['card'],
          'kind' => $row['kind'],
          'time' => $row['time'],
          'introduction' => $row['introduction'],
          'appointed' => $row['appointed'],
          'bucket' => $row['bucket'],
          'flag' => $flag
      );
      array_push($all_info, $single_info);
    }
}

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>
