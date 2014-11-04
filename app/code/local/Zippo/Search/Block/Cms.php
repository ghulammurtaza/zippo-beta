<?php
class Zippo_Search_Block_Cms extends Mage_Core_Block_Template 
{
    protected $_cmsCollection;
    
    protected function _getCmsCollection()
    {
        if (is_null($this->_cmsCollection)) {
             $searchKey = Mage::getSingleton('zippo_search/search')->getCmsSearchKey();
             
             
             $this->_cmsCollection = $collection;                           
        }

        return $this->_cmsCollection;
    }
    
    public function getCmsCollection()
    {
        return $this->_getCmsCollection();
    }
}
