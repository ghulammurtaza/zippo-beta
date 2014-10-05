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

				

				if($data['error']==''){
							Mage::getStoreConfig('trans_email/ident_general/email');
							$admin_email	 = 'frenklen2004@gmail.com';
							//$subject		 =' ONLINE ORDERS ';
							
							if($_POST['form_type']=='one'){
								$subject		 ='Online orders';
								$txt_Message	 = "Order Number : ".$_POST['txtOrderNumber']." . <br>
													First Name : ".$_POST['txtFname']." . <br>
													Last Name : ".$_POST['txtLname']." . <br>
													Street Address : ".$_POST['txtStreet']." . <br>
													Street Address 2 : ".$_POST['txtStreet2']." . <br>
													City : ".$_POST['txtCity']." . <br>
													State  : ".$_POST['state']." . <br>
													Zip Code : ".$_POST['txtZipCode']." . <br>
													Phone : ".$_POST['txtPhoneArea']." . <br>
													Email : ".$_POST['txtEmail']." . <br>
													Message : ".$_POST['contactContent']." . <br>";
								
								
							}else if($_POST['form_type']=='two'){
								 $subject		 ='New Retailer Inquiries ';
								$txt_Message	 = "Business Name : ".$_POST['businessName']." . <br>
													First Name : ".$_POST['txtFname']." . <br>
													Last Name : ".$_POST['txtLname']." . <br>
													Street Address : ".$_POST['txtStreet']." . <br>
													Street Address 2 : ".$_POST['txtStreet2']." . <br>
													City : ".$_POST['txtCity']." . <br>
													State  : ".$_POST['state']." . <br>
													Country  : ".$_POST['country']." . <br>
													Zip Code : ".$_POST['txtZipCode']." . <br>
													Phone : ".$_POST['txtPhoneArea']." . <br>
													Email : ".$_POST['txtEmail']." . <br>
													Message : ".$_POST['contactContent']." . <br>";

							}else if($_POST['form_type']=='three'){
								 $subject		 =' Media and PR ';
								$txt_Message	 = "First Name : ".$_POST['txtFname']." . <br>
													Last Name : ".$_POST['txtLname']." . <br>
													Street Address : ".$_POST['txtStreet']." . <br>
													Street Address 2 : ".$_POST['txtStreet2']." . <br>
													City : ".$_POST['txtCity']." . <br>
													State  : ".$_POST['state']." . <br>
													Zip Code : ".$_POST['txtZipCode']." . <br>
													Phone : ".$_POST['txtPhoneArea']." . <br>
													Email : ".$_POST['txtEmail']." . <br>
													Message : ".$_POST['contactContent']." . <br>";
													
							}else if($_POST['form_type']=='four'){ 	
								$subject		 ='General Inquiries'; 
								$txt_Message	 = "First Name : ".$_POST['txtFname']." . <br>
													Last Name : ".$_POST['txtLname']." . <br>
													Street Address : ".$_POST['txtStreet']." . <br>
													Street Address 2 : ".$_POST['txtStreet2']." . <br>
													City : ".$_POST['txtCity']." . <br>
													State  : ".$_POST['state']." . <br>
													Country  : ".$_POST['country']." . <br>
													Zip Code : ".$_POST['txtZipCode']." . <br>
													Phone : ".$_POST['txtPhoneArea']." . <br>
													Email : ".$_POST['txtEmail']." . <br>
													Message : ".$_POST['contactContent']." . <br>";										                            }

							$headers		 = 'MIME-Version: 1.0' . "\r\n";
							$headers		.= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
							$headers		.= 'To:'.$admin_email. "\r\n";
							$headers		.= 'From:'.$_POST['contact_email']."\r\n";

							$message = $txt_Message;
							$to = $admin_email;
						if(mail($to, $subject, $message, $headers)){
							$data['mail_success'] = 'yes';
						}else{
							$data['mail_success'] = 'no';
						}
						 echo json_encode($data);return;
					}else{	
						echo json_encode($data);	return;					
					}
		}//end of function
}