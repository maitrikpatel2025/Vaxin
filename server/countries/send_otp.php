<?php
require('../../include/services/functions.php');
echo "string";
print_r($_POST);exit;
if(!empty($_POST)){
	echo send_mail_asd($_POST['email'],$_POST['name'],'New otp received',$_POST['body']);exit();
}  
echo "otp sent";
exit;
?>