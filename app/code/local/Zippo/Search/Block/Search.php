<?php
class Zippo_Search_Block_Search extends Mage_Core_Block_Template 
{
   /**
     * Product Collection
     *
     * @var Mage_Eav_Model_Entity_Collection_Abstract
     */
    protected $_productCollection;
    
    /**
     * Retrieve loaded category collection
     *
     * @return Mage_Eav_Model_Entity_Collection_Abstract
     */
    protected function _getProductCollection()
    {
        if (is_null($this->_productCollection)) {
             $searchCriteria = Mage::getSingleton('zippo_search/search')->getSearchCriteria();
             $collection = Mage::getResourceModel('catalog/product_collection')
                ->addAttributeToSelect('*')
                ->setStoreId(Mage::app()->getStore()->getStoreId());
             
             if ((int)$searchCriteria['category']){
                 $category = Mage::getModel('catalog/category')->load($searchCriteria['category']);
                 $collection->addCategoryFilter($category); 
             }
             
             if ((int)$searchCriteria['theme_otheroptions']){
                 $collection->addAttributeToFilter('theme_otheroptions', array('eq' => $searchCriteria['theme_otheroptions'])); 
             }
             
             if ((int)$searchCriteria['finishesncolors']){
                 $collection->addAttributeToFilter('finishesncolors',  array('eq' => $searchCriteria['finishesncolors'])); 
             }
             
             if ((string)$searchCriteria['searchTerm']){
                 $collection->addAttributeToFilter(
                    array(
                        array('attribute'=> 'name','like' => $searchCriteria['searchTerm']),
                        array('attribute'=> 'short_description','like' => $searchCriteria['searchTerm']),
                        array('attribute'=> 'description','like' => $searchCriteria['searchTerm']),
                    )
                );
             }
             
             $this->_productCollection = $collection;
                           
        }

        return $this->_productCollection;
    }
    
    public function getLoadedProductCollection()
    {
        return $this->_getProductCollection();
    }
}
