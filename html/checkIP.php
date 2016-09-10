<?php
session_start();

require_once("../conf/config.php");
$card = @$_POST["card"];

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "SELECT user_IP FROM account WHERE card=" . $card;

if($card != ""){
	$result = mysql_query($sql);
	while ($row = mysql_fetch_array($result)){
    	$user_IP = $row['user_IP'];
	}
	if($user_IP == $_SESSION['IP']){
		$result=json_encode(true);
	}
	else{
		$result=json_encode(false);
	}
}
echo $result;
?>