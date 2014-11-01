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

	jQuery(".listProdPopUps").mouseleave(function(e) {
		 jQuery(".products-grid > li").removeClass("popupActive");
		 jQuery(".products-grid > li .listProdPopUps").hide();
    });
	jQuery(".products-grid > li").mouseleave(function(e) {
		 jQuery(".products-grid > li").removeClass("popupActive");
		 jQuery(".products-grid > li .listProdPopUps").hide();
    });

	jQuery(".products-grid > li:hover .btnAddCart").click(function(e) {
		
		
	
		
		jQuery(".productListingPopup .prodCart").append("<span class='loader-cart'></span>");
		var appndMsg = jQuery(this).parents(".inner")
		setTimeout(function(){
			
			jQuery(".productListingPopup .prodCart span").remove();
			appndMsg.append("<div class='addedincart'>successfully added to your cart</div>");


			//jQuery("html").animate({scrollTop: 0}, 500);
			return false;
		 
		 }, 4000);
		 		

		 
		setTimeout(function(){
		jQuery(".products-grid > li").removeClass('popupActive');;
		jQuery(".productListingPopup .addedincart").remove();
		return false;
		}, 6000);
		
    });

jQuery(".productListingPopup .inner").clearQueue();
	
}




(function($) {
    $.event.special.mousestop = {
        setup: function(data) {
            $(this).data('mousestop', _data(data))
                   .bind('mouseenter.mousestop', _mouseenter)
                   .bind('mouseleave.mousestop', _mouseleave)
                   .bind('mousemove.mousestop', _mousemove);
        },
        teardown: function() {
            $(this).removeData('mousestop')
                   .unbind('.mousestop');
        }
    };

    function _mouseenter() {
        var _self = this,
            data = $(this).data('mousestop');

        this.movement = true;

        if(data.timeToStop) {
            this.timeToStopTimer = window.setTimeout(function() {
                _self.movement = false;
                window.clearTimeout(_self.timer);
            }, data.timeToStop);
        }
    }

    function _mouseleave() {
        window.clearTimeout(this.timer);
        window.clearTimeout(this.timeToStopTimer);
    }
    
    function _mousemove() {
        var $el = $(this),
            data = $el.data('mousestop');

        if(this.movement) {
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(function() {
                $el.trigger('mousestop');
            }, data.delay);
        }
    }

    function _data(data) {
        if($.isNumeric(data)) {
            data = {delay: data};
        }
        else if(typeof data !== 'object') {
            data = {};
        }

        return $.extend({}, $.fn.mousestop.defaults, data);
    }

    $.fn.mousestop = function(data, fn) {
        if (typeof data === 'function') { fn = data; }
        return arguments.length > 0 ? this.bind('mousestop', data, fn) : this.trigger('mousestop');
    };

    $.fn.mousestop.defaults = {
        delay: 300,
        timeToStop: null
    };
})(jQuery);


jQuery(document).ready(function(e) {
		
  jQuery('.products-grid > li').mousestop(300, function() {
		jQuery(this).addClass("popupActive");
		test();
		
});
  // 
});
jQuery(window).scroll(function(e) {
   jQuery('.products-grid > li').mousestop(300, function() {
		jQuery(this).addClass("popupActive");
		test();
});
});