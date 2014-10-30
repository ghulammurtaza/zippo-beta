<?php

/*
 * Daffodil Advance Newsletter
 */
?>
<?php
    $installer = $this;
    $installer->startSetup();
    $installer->run("
    ALTER TABLE {$this->getTable('newsletter_subscriber')}
        ADD (  `salutation` TEXT NULL,
               `firstname` TEXT NULL,
               `lastname` TEXT NULL,
               `company` TEXT NULL,
               `address` TEXT NULL,
               `city` TEXT NULL,
               `state` TEXT NULL,
               `country` TEXT NULL,
               `fax` TEXT NULL,
               `phoneno` INT(20) NULL,
               `zipcode` TEXT NULL              
               );
    "); 
    $installer->endSetup(); 
?>