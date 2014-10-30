<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Newsletter
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */


/**
 * Newsletter subscriber model for MySQL4
 *
 * @category    Mage
 * @package     Mage_Newsletter
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Daffodil_Advancenewsletter_Model_Subscriber extends Mage_Newsletter_Model_Mysql4_Subscriber
{
    protected function _prepareSave(Mage_Newsletter_Model_Subscriber $subscriber)
    {  
        $data = array();
        $data['customer_id'] = $subscriber->getCustomerId();
        $data['store_id'] = $subscriber->getStoreId()?$subscriber->getStoreId():0;
        $data['subscriber_status'] = $subscriber->getStatus();
        $data['subscriber_email']  = $subscriber->getEmail();
        $data['subscriber_confirm_code'] = $subscriber->getCode();
        $data['salutation']= $subscriber->getSalutation();
        $data['firstname'] = $subscriber->getFirstname();
        $data['lastname'] = $subscriber->getLastname();
        $data['company']= $subscriber->getCompany();
        $data['address']= $subscriber->getAddress();
        $data['country_id']= $subscriber->getCountryId();
        $data['city']= $subscriber->getCity();
        $data['state']= $subscriber->getState();
        $data['phoneno']= $subscriber->getPhoneno();
        $data['fax']= $subscriber->getFax();
        $data['zipcode']= $subscriber->getZipcode();

        //ADD A NEW FIELD END
        }
}
