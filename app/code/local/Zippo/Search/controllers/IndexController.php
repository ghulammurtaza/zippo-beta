<?php

class Zippo_Search_IndexController extends Mage_Core_Controller_Front_Action 
{

    public function indexAction() {
        Mage::getSingleton('zippo_search/search')->setSearchCriteria($this->getRequest()->getPost());
        $this->loadLayout();
        $this->renderLayout();
    }

}