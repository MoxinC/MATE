<?php
header("Content-type: text/html; charset=utf-8");
require_once("../conf/config.php");

// $card1 = "213131001";
$card1 = @$_POST["card1"];

$current_time = date('Y-m-d H:i:s');

// Activities that card1 have released or appointed
$ac = array();
$ac_single = array();

$n = 0; // amount of activities
$fk = array(
  '篮球' => 0, '足球' => 0, '排球' => 0, '羽毛球' => 0, '乒乓球' => 0,
  '网球' => 0, '跑步' => 0, '骑行' => 0, '健身' => 0, '自习' => 0, '其他' => 0
); // frequency of values of attribute "kind"
$fb = array(
  '上午' => 0, '下午' => 0, '晚上' => 0
); // frequency of values of attribute "bucket"
$lk = 11; // amount of values of attribute "kind"
$lb = 3; // amount of values of attribute "bucket"
$wk = 0; // weight of attribute "kind"
$wb = 0; // weight of attribute "bucket"

$MAU = array(); // rank of all activities to card1

$recommend_amount = 20;
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}
mysql_query("SET names utf8");
mysql_select_db($sql_link_db, $con);

$sql = "SELECT * FROM activity WHERE card = $card1";
$res = mysql_query($sql);
while ($row = mysql_fetch_array($res))
{
  $ac_single = array(
    'kind' => $row['kind'],
    'bucket' => $row['bucket']
  );
  array_push($ac, $ac_single);
}
$sql = "SELECT * FROM appointment WHERE card1=$card1";
$res = mysql_query($sql);
while ($row = mysql_fetch_array($res))
{
  $ac_id = $row['id'];
  $s = "SELECT * FROM activity WHERE id=$ac_id";
  $r = mysql_query($s);
  while ($row1 = mysql_fetch_array($r))
  {
    $ac_single = array(
      'kind' => $row1['kind'],
      'bucket' => $row1['bucket']
    );
    array_push($ac, $ac_single);
  }
}

$n = count($ac, 0);

// Count frequency
foreach ($ac as $key => $val)
{
  global $fk, $fb;
  if (is_array($val))
  {
    foreach ($val as $k => $v) {
      count_frequency($k, $v, $fk, $fb);
    }
  }
}

// Calculate weight
$temp_k = cal_weight_temp($fk, $n, $lk);
$temp_b = cal_weight_temp($fb, $n, $lb);
$wk = $temp_k / ($temp_k + $temp_b);
$wb = $temp_b / ($temp_k + $temp_b);

// TRAVERSAL all activities and CALCULATE their SCORE
$sql = "SELECT * FROM activity WHERE card <> $card1";
$res = mysql_query($sql);
while ($row = mysql_fetch_array($res))
{
  if (strtotime($row['time']) > strtotime($current_time))
  {
    $id = $row['id'];
    $kind = $row['kind'];
    $bucket = $row['bucket'];
    $uk = cal_effect_single($fk, $kind, $n, $lk);
    $ub = cal_effect_single($fb, $bucket, $n, $lb);
    $mau = $wk * $uk + $wb * $ub;
    // $score = $mau;
    // Calculate the effect of thumb
    $card_temp = $row['card'];
    // Get the number of thumbs of the card_temp
    $res_num_thumb = mysql_query("SELECT COUNT(card1) FROM thumb WHERE card = $card_temp");
    $row = mysql_fetch_array($res_num_thumb);
    $num_thumb = $row[0];
    // Get total number of users
    $res_num_total = mysql_query("SELECT COUNT(card) FROM account");
    $row = mysql_fetch_array($res_num_total);
    $num_total = $row[0];
    $score = $mau * (1 + $num_thumb / $num_total * 0.1);
    $MAU[$id] = $score;
  }
}
arsort($MAU);
$keys = array_keys($MAU);
// $values = array_values($MAU);
for ($i = 0; $i < $recommend_amount; $i++)
{
  // echo $values[$i]."mate;";
  $current_id = $keys[$i];
  $sql = "SELECT * FROM activity WHERE id=$current_id";
  $res = mysql_query($sql);
  while ($row = mysql_fetch_array($res))
  {
    $cardIdx = $row['card'];
    $nick_res = mysql_query("SELECT nick FROM information WHERE card=$cardIdx");
    $nick = mysql_fetch_array($nick_res);
    $icon_res = mysql_query("SELECT icon FROM information WHERE card=$cardIdx");
    $icon = mysql_fetch_array($icon_res);

    $hehe = mysql_query("SELECT * FROM appointment WHERE id=$current_id && card1=$card1");
    if(mysql_num_rows($hehe) < 1)
    {
      $flag="约约约~";
    }
    else
    {
      $flag="已约";
    }
    $single_info = array(
        'nick' => $nick[0],
        'icon' => $icon[0],
        'id' => $current_id,
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

function count_frequency($key, $value, $fk, $fb)
{
  if ($key == "kind")
  {
    count_fk($value, $fk);
  }
  else if ($key == "bucket")
  {
    count_fb($value, $fb);
  }
}

function count_fk($value, $fk)
{
  global $fk;
  switch($value)
  {
    case "篮球":
      $fk['篮球']++;
      break;
    case "足球":
      $fk['足球']++;
      break;
    case "排球":
      $fk['排球']++;
      break;
    case "羽毛球":
      $fk['羽毛球']++;
      break;
    case "乒乓球":
      $fk['乒乓球']++;
      break;
    case "网球":
      $fk['网球']++;
      break;
    case "跑步":
      $fk['跑步']++;
      break;
    case "骑行":
      $fk['骑行']++;
      break;
    case "健身":
      $fk['健身']++;
      break;
    case "自习":
      $fk['自习']++;
      break;
    case "其他":
      $fk['其他']++;
      break;
    default:
      break;
  }
}

function count_fb($value, $fb)
{
  global $fb;
  switch($value)
  {
    case "上午":
      $fb['上午']++;
      break;
    case "下午":
      $fb['下午']++;
      break;
    case "晚上":
      $fb['晚上']++;
      break;
    default:
      break;
  }
}

function cal_weight_temp($array, $n, $l)
{
  arsort($array);
  $mf = 0;
  foreach ($array as $key => $value) {
    $mf = $value;
    break;
  }
  return $mf - $n / $l;
}

function cal_effect_single($array, $key, $n, $l)
{
  $temp = cal_effect_temp($array, $n, $l);
  return ($array[$key] - $n / $l) / $temp + 3;
}

function cal_effect_temp($array, $n, $l)
{
  $temp = 0;
  foreach ($array as $key => $val)
  {
    $temp = $temp + pow(($val - $n / $l), 2);
  }
  return sqrt($temp / ($l - 1));
}
?>
