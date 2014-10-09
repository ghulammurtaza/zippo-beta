jQuery(function()
{
    jQuery('.scroll-pane-before').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'before',
                horizontalArrowPositions: 'before'
            }
    );
    jQuery('.scroll-pane-after').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'after',
                horizontalArrowPositions: 'after'
            }
    );
    jQuery('.scroll-pane-os').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'os',
                horizontalArrowPositions: 'os'
            }
    );
    jQuery('.scroll-pane-split').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'split',
                horizontalArrowPositions: 'split'
            }
    );
});

function test (){
    jQuery(".products-grid > li a").mouseover(function(e) {
       jQuery(this).parents(".products-grid > li").addClass("popupActive");
    });
	jQuery(".listProdPopUps").mouseleave(function(e) {
		 jQuery(".products-grid > li").removeClass("popupActive");
		 jQuery(".products-grid > li .listProdPopUps").hide();
    });
	jQuery(".products-grid > li").mouseleave(function(e) {
		 jQuery(".products-grid > li").removeClass("popupActive");
		 jQuery(".products-grid > li .listProdPopUps").hide();
    });
	jQuery(".products-grid > li .btnAddCart").click(function(e) {
		jQuery(".productListingPopup .prodCart").stop();
		jQuery(".productListingPopup .prodCart").append("<span class='loader-cart'></span>");
		setTimeout(function(){
			jQuery(".productListingPopup .prodCart span").remove();
			jQuery("html").clearQueue();
			jQuery(".productListingPopup .prodCart").clearQueue();
     	 	jQuery(".products-grid > li").removeClass('popupActive');
			jQuery("html").animate({scrollTop: 0}, 500);
			
			return false;
		 
		 }, 4000);
		
    });


	
}

jQuery(document).ready(function(e) {
  test(); 
});
jQuery(window).scroll(function(e) {
  test();
});
