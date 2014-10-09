<?php

	$data = array(); 		// array to pass back data
	
	
	
	
	
	
	
	
		
		if($_POST) {
			$admin_email	 = 'frenklen2004@gmail.com';
			$subject		 = 'New Retailer Inquiries';
			$headers		 = 'MIME-Version: 1.0' . "\r\n";
			$headers		.= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers		.= 'To:'.$admin_email. "\r\n";
			$headers		.= 'From:'.$_POST['name']."\r\n";
			$txt_Message = '<html><body>';
			$txt_Message .= "<table border='0' cellpadding='0'  cellspacing='0' style='border:0; margin:0; padding:0'>";
			$txt_Message .= "<tr><td><img src='https://ci6.googleusercontent.com/proxy/rcRK8T1mCqKMqRRoxK7rZcn6eqfcY3EwvlP6wBEWl-WC5G-jzlTvW9rIHg_iKgl3iILcMngk2XBVgvCpXczXBtk1WHFRbg=s0-d-e1-ft#http://www.zippo.com/images/email/zippo_logo.gif' alt='PHP Gang' /></td></tr>";
			$txt_Message .= "<tr><td colspan=2>Dear ".$_POST['name'].",<br /> </td></tr>";
			$txt_Message .= "<tr><td colspan=2>Your friend, Me, has sent you one of their favorite products to view from Zippo.com.</td></tr>";
			$txt_Message .= "<tr><td colspan=2>My Say</td></tr>";
			$txt_Message .= "<tr><td colspan=2>".$_POST['message']."</td></tr>";																 
			$txt_Message .= "<tr><td colspan=2><a href='http://www.google.com'>link here</a></td></tr>";
			
			$txt_Message .= "<tr><td colspan=2> <br /><br /><br /><br />©2011 Zippo Manufacturing Company. All Rights Reserved.<br />  		
							 Must be at least 18 years of age to purchase Zippo lighters.<br />
							Zippo Manufacturing Company<br />33 Barbour Street <br />
							Bradford, Pennsylvania 16701<br />Zippo.com<br />Terms & Conditions</td></tr>";
							
			$txt_Message .= "<tr><td colspan=2>Your friend, Me, has sent you one of their favorite products to view from Zippo.com.</td></tr>";
			
			
			$txt_Message .= "</table>";
			 
			$txt_Message .= "</body></html>";
			$message = $txt_Message;
			$to = $admin_email;
			mail($to, $subject, $message, $headers);
			$mail_success = true;
		}
		if(mail($to, $subject, $message, $headers)){
			$data['mail_success'] = 'yes';
		}else{
			$data['mail_success'] = 'no';
		}













// return a response ===========================================================

	// return all our data to an AJAX call
	echo json_encode($data);
