$(document).ready(function(e) {
	
if($(window).width() <= 767){
  
$(".globalNav ").append("<button id='menu' type='button'> <span class='icon-bar'></span> <span class='icon-bar'></span> <span class='icon-bar'></span> </button>"); 	
		
	$("#menu").click(function() {
		//alert("hello");
    	$("#catTopNav").slideToggle();
		$("#container").toggleClass("layer");    
    });
	
	//$(".genTopNav").prepend("<a>Navigation</a>")
	
}





});
