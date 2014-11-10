<?php

class Zippo_Custom_IndexController extends Mage_Core_Controller_Front_Action 
{

    /**
     * Forgot customer password action
     */
    public function forgotPasswordPostAction()
    {
        $email = (string) $this->getRequest()->getPost('email');
        if ($email) {
            if (!Zend_Validate::is($email, 'EmailAddress')) {
                $msg = '<p class="txtBold txtRed">';
                $msg .= $this->__('Invalid email address.');
                echo $msg .= '</p>';
                exit;
            }

            /** @var $customer Mage_Customer_Model_Customer */
            $customer = $this->_getModel('customer/customer')
                ->setWebsiteId(Mage::app()->getStore()->getWebsiteId())
                ->loadByEmail($email);

            if ($customer->getId()) {
                try {
                    $newResetPasswordLinkToken =  $this->_getHelper('customer')->generateResetPasswordLinkToken();
                    $customer->changeResetPasswordLinkToken($newResetPasswordLinkToken);
                    $customer->sendPasswordResetConfirmationEmail();
                } catch (Exception $exception) {
                    $this->_getSession()->addError($exception->getMessage());
                    $this->_redirect('*/*/forgotpassword');
                    return;
                }
            }
            $msg = '<p class="txtBold">';
            $msg.= $this->__('If there is an account associated with %s you will receive an email with a link to reset your password.',
                    $this->_getHelper('customer')->escapeHtml($email));
            $msg .= '</p>';
            echo $msg;
            exit;
        } else {
            $msg = '<p class="txtBold txtRed">';
            $msg.= $this->__('Please enter your email.');
            $msg .= '</p>';
            echo $msg;
            exit;
        }
    }
    
    /**
     * Get model by path
     *
     * @param string $path
     * @param array|null $arguments
     * @return false|Mage_Core_Model_Abstract
     */
    public function _getModel($path, $arguments = array())
    {
        return Mage::getModel($path, $arguments);
    }

    /**
     * Get Helper
     *
     * @param string $path
     * @return Mage_Core_Helper_Abstract
     */
    protected function _getHelper($path)
    {
        return Mage::helper($path);
    }
}
