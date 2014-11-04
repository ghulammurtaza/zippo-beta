<?php

class Zippo_Search_Block_Cms extends Mage_Core_Block_Template {

    protected function _getCmsCollection() {

        $keyword = Mage::getSingleton('zippo_search/search')->getCmsSearchKey();
        $collection = Mage::getModel('cms/page')->getCollection()
                ->addFieldToFilter("is_active", 1)
                ->addFieldToFilter(
                        array('identifier', 'title', 'content', 'content_heading', 'meta_keywords', 'meta_description'), array(
                            array('like' => '%' . $keyword . '%'),
                            array('like' => '%' . $keyword . '%'),
                            array('like' => '%' . $keyword . '%'),
                            array('like' => '%' . $keyword . '%'),
                            array('like' => '%' . $keyword . '%'),
                            array('like' => '%' . $keyword . '%'),
                        )
                )
                ->setCurPage(1)
                ->setOrder('title', 'ASC');
        return $collection->load();
    }

    public function getCmsCollection() {
        return $this->_getCmsCollection();
    }

}
