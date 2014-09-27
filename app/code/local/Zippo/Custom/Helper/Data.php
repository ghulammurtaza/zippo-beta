<?php

class Zippo_Custom_Helper_Data extends Mage_Core_Helper_Abstract
{
   public function isNew($product) {
        if (!is_object($product)) {
            return false;
        }

        if ($product->getData('news_from_date') == null && $product->getData('news_to_date') == null) {
            return false;
        }

        if ($product->getData('news_from_date') !== null) {
            if (date('Y-m-d', strtotime($product->getData('news_from_date'))) > date('Y-m-d', time())) {
                return false;
            }
        }

        if ($product->getData('news_to_date') !== null) {
            if (date('Y-m-d', strtotime($product->getData('news_to_date'))) < date('Y-m-d', time())) {
                return false;
            }
        }

        return true;
    }
}
