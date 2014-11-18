<?php

class Shopgo_AramexShipping_Model_Mysql4_Shipping
    extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {
        $this->_init('aramexshipping/shipping', 'asv_id');
    }
}
