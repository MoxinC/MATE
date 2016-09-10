<?php
header("Content-type: text/html; charset=utf-8"); 
require_once("../conf/config.php");

$card1 = $_POST["card1"];
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "Select a.id,b.time,b.kind FROM appointment AS a LEFT JOIN activity AS b ON a.id=b.id WHERE a.card1 = $card1 order by ctime DESC";
$kind1="";
$kind2="";
$kind3="";
$kind4="";
$result = mysql_query($sql);
if($row1 = mysql_fetch_array($result)){
	$kind1 = $row1['kind'];
}
if($row2 = mysql_fetch_array($result)){
	$kind2 = $row2['kind'];
}

$sql1 = "Select id,kind,time FROM activity WHERE card = $card1 order by time DESC";
$result1 = mysql_query($sql1);
if($row3 = mysql_fetch_array($result1)){
	$kind3 = $row3['kind'];
}
if($row4 = mysql_fetch_array($result1)){
	$kind4 = $row4['kind'];
}
$endline="WHERE ";
if($kind2!=""){
	$endline=$endline."kind = '$kind1' || kind = '$kind2'";
	if($kind4!=""){
		$endline=$endline." || kind = '$kind3' || kind = '$kind4'";
	}
	else{
		if($kind3!=""){
			$endline=$endline." || kind = '$kind3'";
		}
	}
}
else{
	if($kind1!=""){
		$endline=$endline."kind = '$kind1'";
		if($kind4!=""){
			$endline=$endline." || kind = '$kind3' || kind = '$kind4'";
		}
		else{
			if($kind3!=""){
				$endline=$endline." || kind = '$kind3'";
			}
		}
	}
	else{
		if($kind4!=""){
			$endline=$endline."kind = '$kind3' || kind = '$kind4'";
		}
		else{
			if($kind3!=""){
				$endline=$endline."kind = '$kind3'";
			}
		}
	}
}
$sql2="SELECT * FROM activity ".$endline." order by time DESC";

$result2 = mysql_query($sql2);
while ($row = mysql_fetch_array($result2))
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
$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>