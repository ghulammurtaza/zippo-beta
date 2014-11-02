jQuery(document).ready(function(e) {
	
if(jQuery(window).width() <= 767){
  
jQuery(".globalNav ").append("<button id='menu' type='button'> <span class='icon-bar'></span> <span class='icon-bar'></span> <span class='icon-bar'></span> </button>"); 	
		
	jQuery("#menu").click(function() {
		//alert("hello");
    	jQuery("#catTopNav").slideToggle();
		jQuery("#container").toggleClass("layer");    
    });
}
});
