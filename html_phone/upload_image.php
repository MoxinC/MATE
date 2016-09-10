<?php
header("Content-type: text/html; charset=utf-8");
require_once("../conf/config.php");

$card = @$_POST['card'];
$image_name = @$_FILES['image']['name'];
$image = @$_FILES['image']['tmp_name'];
move_uploaded_file($image, "../img/head/".$image_name);

$con = mysql_connect($sql_link_host, $sql_link_username, $sql_link_password);
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_query("SET names utf8");

mysql_select_db($sql_link_db, $con);

$sql = "UPDATE information" .
    " SET icon='" . "../img/head/".$image_name. 
    "' WHERE card=" .$card;
mysql_query($sql);
mysql_close($con);
?>

<html>
    <body onload="submit()">
    </body>
    <script>
        function submit(){
            alert("上传照片成功！");
            var url = "edit.html?card=" + <?php echo $card; ?>; 
            window.location.href = url;
        }
    </script>
</html>