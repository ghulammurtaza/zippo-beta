<?php
class OnlineOrder_Email_IndexController extends Mage_Core_Controller_Front_Action{
    public function IndexAction() {
      
	  $this->loadLayout();   
	  $this->getLayout()->getBlock("head")->setTitle($this->__("Titlename"));
	        $breadcrumbs = $this->getLayout()->getBlock("breadcrumbs");
      $breadcrumbs->addCrumb("home", array(
                "label" => $this->__("Home Page"),
                "title" => $this->__("Home Page"),
                "link"  => Mage::getBaseUrl()
		   ));

      $breadcrumbs->addCrumb("titlename", array(
                "label" => $this->__("Titlename"),
                "title" => $this->__("Titlename")
		   ));

      $this->renderLayout(); 
	  
    }
	 public function onlineOrderAction(){
		 echo 'sdfasd'; exit;
		 
		 
		 echo Mage::getStoreConfig('trans_email/ident_general/email');
					if($_POST) {
						if($_POST['txtOrderNumber'] == '')
							$empty_order_error = true;
						if($_POST['txtFname'] == '')
							$empty_nameF_error = true;
						if($_POST['txtLname'] == '')
							$empty_nameL_error = true;							
						if($_POST['txtStreet'] == '')
							$empty_street_error = true;
						if($_POST['txtCity'] == '')
							$empty_city_error = true;
						if($_POST['state'] == '')
							$empty_state_error = true;
						if($_POST['txtZipCode'] == '')
							$empty_zipo_error = true;
						if($_POST['txtPhoneArea'] == '')
							$empty_phone_error = true;							
						if($_POST['txtPhonePrefix'] == '')
							$empty_phone1_error = true;
						if($_POST['txtPhoneSuffix'] == '')
							$empty_phone2_error = true;																					
							
						if($_POST['contact_email'] == '')
							$empty_email_error = true;

						if($_POST['contact_email'] != '') {
							$expression = '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}';
							if (eregi($expression, $_POST['contact_email'])) {
								$valid_email = true;
							}
 
						}
						if(!$empty_order_error && !$empty_nameF_error && !$empty_nameL_error && !$empty_city_error && !$empty_state_error && !$empty_zipo_error && !$empty_phone_error && !$empty_phone_error1 && $valid_email && !$empty_phone2_error) {
							$admin_email	 = 'frenklen2004@gmail.com';
							$subject		 ='ONLINE ORDERS ';
							$headers		 = 'MIME-Version: 1.0' . "\r\n";
							$headers		.= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
							$headers		.= 'To:'.$admin_email. "\r\n";
							$headers		.= 'From:'.$_POST['contact_email']."\r\n";
							$txt_Message	 = "Order Number : ".$_POST['txtOrderNumber']." . <br>
												First Name : ".$_POST['txtFname']." . <br>
												Last Name : ".$_POST['txtLname']." . <br>
												Street Address : ".$_POST['txtStreet']." . <br>
												Street Address 2 : ".$_POST['txtStreet2']." . <br>
												City : ".$_POST['txtCity']." . <br>
												State  : ".$_POST['state']." . <br>
												Zip Code : ".$_POST['txtZipCode']." . <br>
												Phone : ".$_POST['txtPhoneArea']." . <br>
												Phone : ".$_POST['txtPhonePrefix']." . <br>
												Phone : ".$_POST['txtPhoneSuffix']." . <br>
											    Email : ".$_POST['contact_email']." . <br>
											    Message : ".$_POST['contact_content']." . <br>";
							$message = $txt_Message;
							$to = $admin_email;
							mail($to, $subject, $message, $headers);
							$mail_success = true;
						}
					}
					
		 echo json_encode($data);
		 }
	
	
}