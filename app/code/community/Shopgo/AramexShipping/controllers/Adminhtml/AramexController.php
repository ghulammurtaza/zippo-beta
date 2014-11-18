<?php

class Shopgo_AramexShipping_Adminhtml_AramexController
    extends Mage_Adminhtml_Controller_Action
{
    protected function _initAction() {
        $this->loadLayout()
            ->_setActiveMenu('aramexshipping_menu/menuitem')
            ->_addBreadcrumb(Mage::helper('adminhtml')->__('Suppliers Manager'), Mage::helper('adminhtml')->__('Supplier Manager'));

        return $this;
    }

    public function indexAction()
    {
        $this->_title($this->__('Suppliers'))
            ->_title($this->__('Manage Suppliers'));
        $this->_initAction()
            ->renderLayout();
    }

    public function editAction()
    {
        $id    = $this->getRequest()->getParam('id');
        $model = Mage::getModel('aramexshipping/shipping')->load($id);

        if ($model->getId() || $id == 0) {
            $data = Mage::getSingleton('adminhtml/session')->getFormData(true);
            if (!empty($data)) {
                $model->setData($data);
            }

            Mage::register('aramex_suppliers_data', $model);

            $this->_title($this->__('Suppliers'))
                ->_title($this->__('Manage Suppliers'));
            if ($model->getId()){
                $this->_title($model->getIdentifier());
            } else {
                $this->_title($this->__('New Supplier'));
            }

            $this->loadLayout();
            $this->_setActiveMenu('aramexshipping_menu/menuitem');

            $this->_addBreadcrumb(Mage::helper('adminhtml')->__('Supplier Manager'), Mage::helper('adminhtml')->__('Supplier Manager'));
            $this->_addBreadcrumb(Mage::helper('adminhtml')->__('Supplier News'), Mage::helper('adminhtml')->__('Supplier News'));

            $this->getLayout()->getBlock('head')->setCanLoadExtJs(true);

            $this->_addContent($this->getLayout()->createBlock('aramexshipping/adminhtml_shipping_edit'))
                ->_addLeft($this->getLayout()->createBlock('aramexshipping/adminhtml_shipping_edit_tabs'));

            $this->renderLayout();
        } else {
            Mage::getSingleton('adminhtml/session')->addError(Mage::helper('aramexshipping')->__('Supplier does not exist'));
            $this->_redirect('*/*/');
        }
    }

    public function newAction()
    {
        $this->_forward('edit');
    }

    public function saveAction()
    {
        if ($data = $this->getRequest()->getPost()) {
            $suppliersIdentifiers = Mage::getModel('aramexshipping/shipping')->getCollection()
                                        ->addFieldToFilter('asv_id', array('neq' => $this->getRequest()->getParam('id')))
                                        ->addFieldToFilter('identifier', $data['identifier']);

            if (count($suppliersIdentifiers) > 0) {
                Mage::getSingleton('adminhtml/session')->addError($this->__('There is already another supplier with the same "Identifier"'));
                Mage::getSingleton('adminhtml/session')->setFormData($data);
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }

            $accountsNbs = Mage::getModel('aramexshipping/shipping')->getCollection()
                               ->addFieldToFilter('asv_id', array('neq' => $this->getRequest()->getParam('id')))
                               ->addFieldToFilter('account_number', $data['account_number']);

            if (count($accountsNbs) > 0) {
                Mage::getSingleton('adminhtml/session')->addError($this->__('There is already another supplier with the same "Account Number"'));
                Mage::getSingleton('adminhtml/session')->setFormData($data);
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }

            if (!Zend_Validate::is($data['email'], 'EmailAddress')) {
                Mage::getSingleton('adminhtml/session')->addError($this->__('Invalid email format'));
                Mage::getSingleton('adminhtml/session')->setFormData($data);
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }

            $supplierByEmail = Mage::getModel('aramexshipping/shipping')->getCollection()
                                   ->addFieldToFilter('asv_id', array('neq' => $this->getRequest()->getParam('id')))
                                   ->addFieldToFilter('email', $data['email']);

            if (count($supplierByEmail) > 0) {
                Mage::getSingleton('adminhtml/session')->addError($this->__('There is already another supplier with the same "Email"'));
                Mage::getSingleton('adminhtml/session')->setFormData($data);
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }

            if ($data['password'] == '******') {
                unset($data['password']);
            }

            if ($data['account_pin'] == '******') {
                unset($data['account_pin']);
            }

            $model = Mage::getModel('aramexshipping/shipping');
            $model->setData($data)
                ->setId($this->getRequest()->getParam('id'));

            try {
                $model->save();
                Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('aramexshipping')->__('Supplier was successfully saved'));
                Mage::getSingleton('adminhtml/session')->setFormData(false);

                if ($this->getRequest()->getParam('back')) {
                    $this->_redirect('*/*/edit', array('id' => $model->getId()));
                    return;
                }
                $this->_redirect('*/*/');
                return;
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
                Mage::getSingleton('adminhtml/session')->setFormData($data);
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }
        }
        Mage::getSingleton('adminhtml/session')->addError(Mage::helper('aramexshipping')->__('Unable to find supplier to save'));
        $this->_redirect('*/*/');
    }

    public function deleteAction()
    {
        if ($this->getRequest()->getParam('id') > 0) {
            try {
                $model = Mage::getModel('aramexshipping/shipping');

                $model->setId($this->getRequest()->getParam('id'))
                    ->delete();

                Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('adminhtml')->__('Supplier was successfully deleted'));
                $this->_redirect('*/*/');
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
            }
        }
        $this->_redirect('*/*/');
    }

    public function massDeleteAction()
    {
        $suppliersIds = $this->getRequest()->getParam('suppliers_ids');
        if(!is_array($suppliersIds)) {
            Mage::getSingleton('adminhtml/session')->addError(Mage::helper('adminhtml')->__('Please select supplier(s)'));
        } else {
            try {
                foreach ($suppliersIds as $supplierId) {
                    $supplier = Mage::getModel('aramexshipping/shipping')->load($supplierId);
                    $supplier->delete();
                }
                Mage::getSingleton('adminhtml/session')->addSuccess(
                    Mage::helper('adminhtml')->__('Total of %d record(s) were successfully deleted', count($suppliersIds))
                );
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
            }
        }
        $this->_redirect('*/*/index');
    }

    public function exportCsvAction()
    {
        $fileName = 'aramex_shipping_suppliers.csv';
        $content  = $this->getLayout()->createBlock('aramexshipping/adminhtml_shipping_grid')
            ->getCsv();

        $this->_sendUploadResponse($fileName, $content);
    }

    public function exportXmlAction()
    {
        $fileName = 'aramex_shipping_suppliers.xml';
        $content  = $this->getLayout()->createBlock('aramexshipping/adminhtml_shipping_grid')->getXml();

        $this->_sendUploadResponse($fileName, $content);
    }

    public function checkAccountAction()
    {
        $params = $this->getRequest()->getPost();
        $helper = Mage::helper('aramexshipping');

        $validValues = array(
            'sender' => array('system', 'supplier'),
            'pass_changed' => array(0, 1),
            'pin_changed' => array(0, 1)
        );

        if (!isset($params['sender']) || !isset($params['pass_changed']) || !isset($params['pin_changed'])) {
            Mage::app()->getResponse()->setBody('Bad check request');
            return;
        } elseif (!in_array($params['sender'], $validValues['sender'])
                  || !in_array($params['pass_changed'], $validValues['pass_changed'])
                  || !in_array($params['pin_changed'], $validValues['pin_changed'])) {
            Mage::app()->getResponse()->setBody('Bad check request');
            return;
        }

        if ($params['sender'] == 'support' && isset($params['id']) && !$helper->isPositiveInteger($params['id'])) {
            Mage::app()->getResponse()->setBody('Bad check request');
            return;
        }

        if (!isset($params['username']) || !isset($params['password'])) {
            Mage::app()->getResponse()->setBody('Username and Password are necessary to do the check');
            return;
        } elseif (empty($params['username']) || empty($params['password'])) {
            Mage::app()->getResponse()->setBody('Username and Password are necessary to do the check');
            return;
        }

        $accountInfo = 4;

        if (!isset($params['account_country_code'])) {
            $accountInfo--;
        } elseif (empty($params['account_country_code'])) {
            $accountInfo--;
        }
        if (!isset($params['account_entity'])) {
            $accountInfo--;
        } elseif (empty($params['account_entity'])) {
            $accountInfo--;
        }
        if (!isset($params['account_number'])) {
            $accountInfo--;
        } elseif (empty($params['account_number'])) {
            $accountInfo--;
        }
        if (!isset($params['account_pin'])) {
            $accountInfo--;
        } elseif (empty($params['account_pin'])) {
            $accountInfo--;
        }

        if ($accountInfo > 0 && $accountInfo < 4) {
            Mage::app()->getResponse()->setBody('Please, fill the rest of account information fields');
            return;
        }

        $supplier = $params['sender'] == 'supplier' ? $helper->getSuppliersCollection($params['id']) : null;

        if (!$params['pass_changed'] && $params['password'] == '******') {
            if ($params['sender'] == 'system') {
                $params['password'] = $helper->getConfigData('password', 'carriers_aramex');
                $params['password'] = Mage::helper('core')->decrypt($params['password']);
            } else {
                $params['password'] = $supplier ? $supplier->getPassword() : '';
            }
        }

        if (!$params['pin_changed'] && $params['account_pin'] == '******') {
            if ($params['sender'] == 'system') {
                $params['account_pin'] = $helper->getConfigData('account_pin', 'carriers_aramex');
                $params['account_pin'] = Mage::helper('core')->decrypt($params['account_pin']);
            } else {
                $params['account_pin'] = $supplier ? $supplier->getAccountPin() : '';
            }
        }

        $result = Mage::getModel('aramexshipping/shipping')->checkAccount($params);

        Mage::app()->getResponse()->setBody($result['message']);
    }

    protected function _sendUploadResponse($fileName, $content, $contentType = 'application/octet-stream')
    {
        $response = $this->getResponse();
        $response->setHeader('HTTP/1.1 200 OK', '');
        $response->setHeader('Pragma', 'public', true);
        $response->setHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0', true);
        $response->setHeader('Content-Disposition', 'attachment; filename='. $fileName);
        $response->setHeader('Last-Modified', date('r'));
        $response->setHeader('Accept-Ranges', 'bytes');
        $response->setHeader('Content-Length', strlen($content));
        $response->setHeader('Content-type', $contentType);
        $response->setBody($content);
        $response->sendResponse();
        die;
    }
}
