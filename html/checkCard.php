<?php
session_start();
$cardNum = @$_POST['cardNum'];
if($cardNum==$_SESSION['cardNum']){
	$result=json_encode(true);
}
else{
	$result=json_encode(false);
}
echo $result;
?>