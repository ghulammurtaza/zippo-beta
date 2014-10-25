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
 * @package     Mage_Adminhtml
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Adminhtml newsletter subscribers grid block
 *
 * @category   Mage
 * @package    Mage_Adminhtml
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Daffodil_Advancenewsletter_Block_Grid extends Mage_Adminhtml_Block_Newsletter_Subscriber_Grid
{
    /**
     * Constructor
     *
     * Set main configuration of grid
     */
    public function __construct()
    {
        parent::__construct();
        $this->setId('subscriberGrid');
        $this->setUseAjax(true);
        $this->setDefaultSort('subscriber_id', 'desc');
    }

    /**
     * Prepare collection for grid
     *
     * @return Mage_Adminhtml_Block_Widget_Grid
     */
   

  protected function _prepareColumns()
    {
       $prefix= Mage::getStoreConfig('advancenewsletter/all_settings/prefix_show');
       $firstname= Mage::getStoreConfig('advancenewsletter/all_settings/firstname_show');
       $lastname= Mage::getStoreConfig('advancenewsletter/all_settings/lastname_show');
       $company= Mage::getStoreConfig('advancenewsletter/all_settings/company_show');
       $address= Mage::getStoreConfig('advancenewsletter/all_settings/address_show');
       $city= Mage::getStoreConfig('advancenewsletter/all_settings/city_show');
       $state= Mage::getStoreConfig('advancenewsletter/all_settings/state_show');
       $country= Mage::getStoreConfig('advancenewsletter/all_settings/country_show');
       $fax= Mage::getStoreConfig('advancenewsletter/all_settings/fax_show');
       $phoneno= Mage::getStoreConfig('advancenewsletter/all_settings/phoneno_show');
       $zipcode= Mage::getStoreConfig('advancenewsletter/all_settings/zipcode_show'); 
        $this->addColumn('subscriber_id', array(
            'header'    => Mage::helper('newsletter')->__('ID'),
            'index'     => 'subscriber_id'
        ));
        
        if($prefix):
            $this->addColumn('salutation', array(
               'header'    => Mage::helper('newsletter')->__('Salutation'),
               'index'     => 'salutation',
               'default'   =>    '----'
           ));
        endif;
        
        if(($firstname=="opt")||($firstname=="req")):
            $this->addColumn('firstname', array(
                'header'    => Mage::helper('newsletter')->__('First Name'),
                'index'     => 'firstname',
                'default'   =>    '----'
            ));
         endif; 
         
         if(($lastname=="opt")||($lastname=="req")):
            $this->addColumn('lastname', array(
                'header'    => Mage::helper('newsletter')->__('Last Name'),
                'index'     => 'lastname',
                'default'   =>    '----'
            ));
        endif;
        
        if(($company=="opt")||($company=="req")):
            $this->addColumn('company', array(
                'header'    => Mage::helper('newsletter')->__('Company'),
                'index'     => 'company',
                'default'   =>    '----'
            ));
        
        endif;
        
        if(($address=="opt")||($address=="req")):
            $this->addColumn('address', array(
                'header'    => Mage::helper('newsletter')->__('Address'),
                'index'     => 'address',
                'default'   =>    '----'
            )); 
        
        endif;
        
        if(($city=="opt")||($city=="req")):
            $this->addColumn('city', array(
                'header'    => Mage::helper('newsletter')->__('City'),
                'index'     => 'city',
                'default'   =>    '----'
            ));
        endif;
        
        if(($state=="opt")||($state=="req")):
            $this->addColumn('state', array(
                'header'    => Mage::helper('newsletter')->__('State/Province'),
                'index'     => 'state',
                'default'   =>    '----'
            ));
        endif;
        
        if (($country=="opt")||($country=="req")):
            $this->addColumn('country_id', array(
                'header'    => Mage::helper('newsletter')->__('Country ID'),
                'index'     => 'country',
                'default'   =>    '----'
            ));
        endif;
        
         if(($fax=="opt")||($fax=="req")):
            $this->addColumn('fax', array(
                'header'    => Mage::helper('newsletter')->__('Fax'),
                'index'     => 'fax',
                'default'   =>    '----'
            ));
         endif;
         
         if(($phoneno=="opt")||($phoneno=="req")):
            $this->addColumn('phoneno', array(
                'header'    => Mage::helper('newsletter')->__('Phone Number'),
                'index'     => 'phoneno',
                'default'   =>    '----'
            ));
         endif;
         
         if(($zipcode=="opt")||($zipcode=="req")):
            $this->addColumn('zipcode', array(
                'header'    => Mage::helper('newsletter')->__('Zip/Postal Code'),
                'index'     => 'zipcode',
                'default'   =>    '----'
            ));
         endif;
         
        $this->addColumn('email', array(
            'header'    => Mage::helper('newsletter')->__('Email'),
            'index'     => 'subscriber_email'
        ));

        $this->addColumn('type', array(
            'header'    => Mage::helper('newsletter')->__('Type'),
            'index'     => 'type',
            'type'      => 'options',
            'options'   => array(
                1  => Mage::helper('newsletter')->__('Guest'),
                2  => Mage::helper('newsletter')->__('Customer')
            )
        ));
       
        $this->addColumn('status', array(
            'header'    => Mage::helper('newsletter')->__('Status'),
            'index'     => 'subscriber_status',
            'type'      => 'options',
            'options'   => array(
                Mage_Newsletter_Model_Subscriber::STATUS_NOT_ACTIVE   => Mage::helper('newsletter')->__('Not Activated'),
                Mage_Newsletter_Model_Subscriber::STATUS_SUBSCRIBED   => Mage::helper('newsletter')->__('Subscribed'),
                Mage_Newsletter_Model_Subscriber::STATUS_UNSUBSCRIBED => Mage::helper('newsletter')->__('Unsubscribed'),
                Mage_Newsletter_Model_Subscriber::STATUS_UNCONFIRMED => Mage::helper('newsletter')->__('Unconfirmed'),
            )
        ));

        $this->addColumn('website', array(
            'header'    => Mage::helper('newsletter')->__('Website'),
            'index'     => 'website_id',
            'type'      => 'options',
            'options'   => $this->_getWebsiteOptions()
        ));

        $this->addColumn('group', array(
            'header'    => Mage::helper('newsletter')->__('Store'),
            'index'     => 'group_id',
            'type'      => 'options',
            'options'   => $this->_getStoreGroupOptions()
        ));

        $this->addColumn('store', array(
            'header'    => Mage::helper('newsletter')->__('Store View'),
            'index'     => 'store_id',
            'type'      => 'options',
            'options'   => $this->_getStoreOptions()
        ));

        $this->addExportType('*/*/exportCsv', Mage::helper('customer')->__('CSV'));
        $this->addExportType('*/*/exportXml', Mage::helper('customer')->__('Excel XML'));
       
    }

 
}