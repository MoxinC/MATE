<?php
$hostname=gethostbyaddr($_SERVER['REMOTE_ADDR']);    //获取主机名 
echo $hostname;            //输出结果 
// 
$hosts=gethostbynamel('localhost');       //获取ip地址列表 
print_r($hosts);           //输出数组 
// 
$protocol='tcp';        //定义协议名称 
$get_prot=getprotobyname($protocol);   //返回协议号 
if($get_prot==-1)       //如果找不到 
{ 
  echo 'invalid protocol';      //输出错误信息 
} 
else 
{ 
  echo 'protocol #'.$get_prot;     //输出相应的协议号 
} 
// 
$protocol_num='6';       //定义协议号 
$get_prot=getprotobynumber($protocol_num);  //返回协议名称 
if($get_prot==-1)       //如果找不到 
{ 
  echo 'invalid protocol';      //输出错误信息 
} 
else 
{ 
  echo 'protocol #'.$get_prot;     //输出相应的协议名称 
}
?>