<?php

class Shopgo_AramexShipping_Block_Adminhtml_Shipping
    extends Mage_Adminhtml_Block_Widget_Grid_Container
{
    public function __construct()
    {
        $this->_blockGroup = 'aramexshipping';
        $this->_controller = 'adminhtml_shipping';
        $this->_headerText = Mage::helper('aramexshipping')->__('Aramex Shipping Suppliers Manager');
        $this->_addButtonLabel = Mage::helper('aramexshipping')->__('Add Supplier');
        parent::__construct();
    }
}
