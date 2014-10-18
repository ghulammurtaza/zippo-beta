<?php

class Zippo_Search_Model_Search extends Mage_Core_Model_Abstract {

    protected $_searchCriteria = array();

    function setSearchCriteria($data) {
        $this->_searchCriteria = $data;
    }

    function getSearchCriteria() {
        return $this->_searchCriteria;
    }
}
