// JavaScript Document
var removePopupTimeout = null;
var createPopupTimeout = null;
$(window).load(function(){
	
	$('.prodList li').bind({
		mouseenter:onProductRollover,
		mouseleave: function(){
			destroyProductPopup();
			cancelTriggerProductPopup();
		}
	})
});

function onProductRollover(){
	//show product popup
	triggerProductPopup($(this))
}

var productPopupContent = '<div class="popupcontent" style="position:relative; height:486px;">\
							<div class="btnProdCustomize" style="position:absolute;top:30px; right:40px; text-indent:-9999px;">customize this</div>\
							<img class="jProductImage" style="position:absolute;top:90px; left:80px;"></img>\
							<h2 class="jProductName txtRed" style="position:absolute;top:100px; right:50px;">Product Name Here</h2>\
							<h3 class="jProductPrice" style="position:absolute;top:120px; right:50px;">$xxx.xx</h3>\
							<div class="jProductRating" style="position:absolute;top:140px; right:50px;"><img src="assets/img/flame_rating_3of5.png" alt="3 out of 5 flames" width="76" height="17"></div>\
							<h3 class="jProductSKU" style="position:absolute;top:160px; right:50px;">SKU:2000123-000x</h3>\
							<p class="jProductDescription prodLongDesc" style="position:absolute;top:180px; right:50px; text-align:right; width:230px;">\
                                	Black Matte <span class="txtRed">&bull;</span> Packaged in an environmentally friendly gift box <span class="txtRed">&bull;</span> Lifetime Guarantee <span class="txtRed">&bull;</span> Fill with Zippo Premium Lighter Fluid\
							</p>\
							<img src="assets/img/prod_made_USA.gif" alt="Made in the USA" width="125" height="30" style="position:absolute;bottom:120px; right:50px;">\
							<div class="prodCart" style="position:absolute;bottom:70px; right:50px;">\
                                	<label for="txtProdQty">Qty.</label> <input type="text" name="txtProdQty" id="txtProdQty" class="txtProdQty" size="1">\
                                    <input type="button" class="btnAddCart" value="Add To Cart">\
                                </div>\
							<div class="btnProdClickreviews" style="position:absolute;bottom:16px; right:40px; text-indent:-9999px;">Click for more info!</div>\
							</div>';

function triggerProductPopup( domobj ){
	createPopupTimeout = setTimeout( function(){ private_showProductPopup(domobj) } , 700 );	
}

function cancelTriggerProductPopup(){
	clearTimeout(createPopupTimeout);
}

function private_showProductPopup( domobj ){
	var curIndex = $('.prodList li').index( domobj );
	
	//if this products quickshop is already open - cancel removal and return
	if( $('.productListingPopup').data('index') == curIndex ){
		cancelDestroyProductPopup();
		return;
	}
	//if this is the 4th item in the row, we need to use a diffrent background and settings
	var reverseClass = false;
	if( curIndex % 4 == 3 ){
		reverseClass = true;
	}
	//grab image from current product
	$popup = $('.jProductImage',productPopupContent).attr('src', domobj.find('img').attr('src') ).parent();
	
	//actually create quickshop popup
	console.log(  (reverseClass)?200:100 );
	$('#zlisting').append( 
		$('<div>',{
			'class':(reverseClass)?'productListingPopup reverse':'productListingPopup'})
		.css({
			left:(reverseClass)?domobj.offset().left - 430:domobj.offset().left + 100,
			top:domobj.offset().top - 140 })
		.data('index',curIndex )
		.append($popup)
		.bind({
			'mouseenter':cancelDestroyProductPopup,
			'mouseleave':destroyProductPopup})
	);//close append
	console.log('test');
	
}

function destroyProductPopup(){
	removePopupTimeout = setTimeout( private_removeProductPopup , 200 );
}

function private_removeProductPopup(){
	$('.productListingPopup','#zlisting').remove()
}

function cancelDestroyProductPopup(){
	clearTimeout(removePopupTimeout);
}