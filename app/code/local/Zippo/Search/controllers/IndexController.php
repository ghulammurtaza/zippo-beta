<?php

class Zippo_Search_IndexController extends Mage_Core_Controller_Front_Action 
{

    public function indexAction() {
        Mage::getSingleton('zippo_search/search')->setSearchCriteria($this->getRequest()->getPost());
        $this->loadLayout();
        $this->renderLayout();
    }
	public function cmsAction() {
        Mage::getSingleton('zippo_search/search')->setCmsSearchKey($this->getRequest()->getPost('cmssearch'));
        $this->loadLayout();
        $this->renderLayout();
    }

}
