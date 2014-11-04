<?php

class Zippo_Search_Model_Search extends Mage_Core_Model_Abstract {

    protected $_searchCriteria = array();
    protected $_cmsSearchKey ;

    function setSearchCriteria($data) {
        $this->_searchCriteria = $data;
    }

    function getSearchCriteria() {
        return $this->_searchCriteria;
    }
    
    function setCmsSearchKey($keyword) {
        $this->_cmsSearchKey = $keyword;
    }

    function getCmsSearchKey() {
        return $this->_cmsSearchKey;
    }
}
