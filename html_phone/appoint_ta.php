<?php
header("Content-type: text/html; charset=utf-8"); 

require_once("../conf/config.php");
$card1 = @$_POST['card1'];
$id = @$_POST['id'];
$ctime = @$_POST['ctime'];
$message="";
$mark = "";
$all_info = array();
$single_info = array();

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$s = "SELECT card FROM activity WHERE id=".$id;
$r = mysql_query($s);
$c = mysql_fetch_array($r);
if($c[0]==$card1){
	$message="相同";
	$mark="0";
}
else{
	$sql = "SELECT * FROM appointment WHERE id=".$id." AND card1=".		    $card1;
	$result = mysql_query($sql);
	if(mysql_num_rows($result) < 1){
		$sql1 = "INSERT into appointment (id,card1,ctime) values( ".$id.",".$card1.",'".$ctime."')";
	    $message="插入";
	    }
	else{
		$sql1 = "DELETE FROM appointment WHERE (id = ".$id.") && (card1 = ".$card1.")";
		$message="删除";
	    }
		$result1 = mysql_query($sql1);
		if ($result1){
			if($message=="插入"){
				$message="约好啦！";
				$mark="1";
			}
			else{
				$message="不约了！";
                $mark="0";
	        }
	    }
		else{
			$message=$message."失败!";
            $mark="0";
		}
	}
	$single_info = array(
        //'nick' => $nick[0],
        'message' => $message,
        'mark' => $mark
    );
	array_push($all_info, $single_info);

$info_json = json_encode($all_info);
echo $info_json;
mysql_close($con);
?>