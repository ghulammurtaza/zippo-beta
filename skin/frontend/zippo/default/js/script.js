/* Author: Virid; for Zippo*/
SHARING = {//sharing on facebook
	wishlist: function(service,u,t){
		var postUrl;
		switch(service){
			case 'fb':
				postUrl = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t);
				window.open(postUrl,'share','toolbar=0,status=0,width=626,height=436');
				break;
			case 'tw':
				postUrl = 'https://twitter.com/share?url='+encodeURIComponent(u)+'&text='+encodeURIComponent(t);
				window.open(postUrl,'share','toolbar=0,status=0,width=626,height=436');
				break;
			case 'print':
				postUrl = 'http://clients.virid.com/zippo/front_end/Account/WishListPrint.html';
				window.open(postUrl,'share','toolbar=0,status=0,width=800,height=600');
				break;
		}
		return false;
	}
}
POPUPS = {/*for the product listing page, when hovering over a product*/
	removePopupTimeout: null,
	createPopupTimeout: null,
	scrollX: null,
	hiddenIndex: null,
	isSlider: true,
	isAbout : false,
	isLighters: false,
	onProductRollover: function(){
		POPUPS.cancelDestroyProductPopup;
		POPUPS.triggerProductPopup( $(this) );
	},
	triggerProductPopup: function( domobj ){
		if (POPUPS.isAbout){
			POPUPS.createPopupTimeout = setTimeout( function(){ POPUPS.private_showProductPopup(domobj) } , 300 );
		}else{
			POPUPS.createPopupTimeout = setTimeout( function(){ POPUPS.private_showProductPopup(domobj) } , 700 );
		}
	},
	cancelTriggerProductPopup: function(){
		clearTimeout(POPUPS.createPopupTimeout);
	},
	private_showProductPopup: function( domobj ){
		var $parentList,curIndex,$showMe,slideOffset,elOffset,diffOffset;
		
		if (POPUPS.isSlider && !this.isLighters){
			$parentList = domobj.parent('.listPageProds');
			curIndex = $parentList.children('li').index( domobj );
			$showMe = $('div.listProdPopUps:eq(' + POPUPS.hiddenIndex + ') div.productListingPopup:eq(' + curIndex + ')');
			slideOffset = $('section.listHolder').offset();
			elOffset = domobj.offset();
			diffOffset = elOffset.left - slideOffset.left;
		}else if (this.isLighters){
			$parentList = $('ul#lighterSlide');
			curIndex = $parentList.find('div.lighterItem').index( domobj );
			$showMe = $('div.listProdPopUps div.productListingPopup:eq(' + curIndex + ')');
			slideOffset = POPUPS.isAbout ? $('section#aboutContent').offset() : $('section.listHolder').offset();
			elOffset = domobj.offset();
			diffOffset = elOffset.left - slideOffset.left;
		}else{
			$parentList = domobj.parent('.listPageProds');
			curIndex = $parentList.children('li').index( domobj );
			$showMe = domobj.children('div.productListingPopup');
			slideOffset = POPUPS.isAbout ? $('section#aboutContent').offset() : $('section.listHolder').offset();
			elOffset = domobj.offset();
			diffOffset = elOffset.left - slideOffset.left;
		}
		
		//if this products quickshop is already open - cancel removal and return
		if( $('div.productListingPopup').data('index') == curIndex ){
			POPUPS.cancelDestroyProductPopup();
			return;
		}
		//if this is the last item in the row, we need to use a different background and settings
		if( (diffOffset > 486) && (!POPUPS.isAbout) ){
			$showMe.addClass('reverse')
				.position({
					my: 'right center',
					at: 'left center',
					offset: '75 -40',
					of: domobj
				});
		}else{
			if (POPUPS.isAbout){
				$showMe.position({
					my: 'right center',
					at: 'left center',
					offset: '40 -10',
					of: domobj
				});
			}else{
				$showMe.position({
					my: 'left center',
					at: 'right center',
					offset: '-60 -40',
					of: domobj
				});
			}
		}
		$showMe.bind({
			'mouseenter':function(){
				POPUPS.cancelDestroyProductPopup();
				if( (diffOffset > 486) && (!POPUPS.isAbout) ){
					$showMe.addClass('reverse')
						.position({
							my: 'right center',
							at: 'left center',
							offset: '75 -40',
							of: domobj
						});
				}else{
					if (POPUPS.isAbout){
						$showMe.position({
							my: 'right center',
							at: 'left center',
							offset: '40 -10',
							of: domobj
						});
					}else{
						$showMe.position({
							my: 'left center',
							at: 'right center',
							offset: '-60 -40',
							of: domobj
						});
					}
				}
			},
			'mouseleave':POPUPS.destroyProductPopup
		});
	},
	destroyProductPopup: function(){
		POPUPS.removePopupTimeout = setTimeout( POPUPS.private_removeProductPopup , 200 );
	},
	private_removeProductPopup: function(){
		$('div.productListingPopup').removeClass('reverse').css('left', '-9999px');
	},
	cancelDestroyProductPopup: function(){
		clearTimeout(POPUPS.removePopupTimeout);
	}
}
NAVCART = {/*handles cart voodoo in the top nav*/
	hideCartTimeout: null,
	showCartTimeout: null,
	private_showCart: function(){
		$('section#navCart').css('visibility','hidden');
		$('div#expandedCart')
			.slideDown()
			.bind({
				'mouseenter':NAVCART.cancelHideCart,
				'mouseleave': NAVCART.private_hideCart
			});
	},
	private_hideCart: function(){
		$('div#expandedCart').slideUp();
		$('section#navCart').css('visibility','visible');
	},
	cancelHideCart: function(){clearTimeout(NAVCART.hideCartTimeout);},
	cancelShowCart: function(){clearTimeout(NAVCART.showCartTimeout);},
	showCart: function(){NAVCART.showCartTimeout = setTimeout( NAVCART.private_showCart , 100 );},
	hideCart: function(){NAVCART.hideCartTimeout = setTimeout( NAVCART.private_removeCart , 200 );},
	deleteItem: function(domEl){
		var itemId = domEl.attr('id').replace('cartProd-','');
		var newCount = parseInt($('span#navCartQty').text().replace('(','').replace(')','')) - 1;
		$('span#navCartQty,span#expCartQty').text('('+newCount+')');
		domEl.slideUp();
		/*TODO - AJAX to remove item from cart, pass itemId as parameter, update cart subtotal*/
	},
	addItem: function(itemId){
		/*TODO - AJAX to actually add the product to back-end cart, then run through a template to generate the new <li> to add to the cart list, update cart subtotal*/
		var $newLi = '<li class="liCartItem clearfix" id="cartProd-7xxx">\
                        	<a href="#" class="cartItemDelete" title="delete product name">x</a>\
                        	<a href="ProductDetail.html" class="linkCartProd" title="product name">\
                            	<img src="assets/img/cartProduct.jpg" alt="product name" width="28" height="42" />\
                            </a>\
                            <div class="cartItemDesc">\
                            	<span class="cartProdName">Zippo Hand Warmer</span>\
                                <span>40182-000001</span>\
                               	<strong class="txtWhite">$19.95 (2)</strong>\
                            </div>\
                        </li>';
		$('ul#cartItemsList').append($newLi);
		NAVCART.showCart();
	}
}
MODAL = {/*handles modal windows*/
	addrEdit: null,
	modalLeft: parseInt(Math.round((window.innerWidth - 560) / 2)),
	$modalEl: null,
	editAddress: function(addrItem){
		var $addrItem = addrItem;
		MODAL.$modalEl = $('section#editAddrModal');
		var inputName;
		var fullname = $addrItem.find('span.lblAddrFullName').text().split(' ');
		var fname = fullname[0];
		var lname = fullname[1];
		var $theOpt;
		MODAL.$modalEl.find('input[name="txtAddrTitle"]').attr('value',$addrItem.find('span.lblAddrName').text());
		MODAL.$modalEl.find('input[name="txtFname"]').attr('value',fname);
		MODAL.$modalEl.find('input[name="txtLname"]').attr('value',lname);
		MODAL.$modalEl.find('input[name="txtStreet"]').attr('value',$addrItem.find('span.lblAddrStreet').text());
		MODAL.$modalEl.find('input[name="txtStreet2"]').attr('value',$addrItem.find('span.lblAddrStreet2').text());
		MODAL.$modalEl.find('input[name="txtCity"]').attr('value',$addrItem.find('span.lblAddrCity').text());
		MODAL.$modalEl.find('input[name="txtZip"]').attr('value',$addrItem.find('span.lblAddrZip').text());
		MODAL.$modalEl.find('input[name="txtPhone"]').attr('value',$addrItem.find('span.lblAddrPhone').text());
		MODAL.$modalEl.find('select.addrState').children('option').each(function(){
			$theOpt = $(this);
			$theOpt.attr('selected','');
			if ($theOpt.attr('value') == $addrItem.find('span.lblAddrState').text()){
				$theOpt.attr('selected','selected');
				return false;
			}
		});
		MODAL.$modalEl.find('select.modalState').selectmenu({
			/*TODO: THIS IS NOT WORKING RIGHT NOW*/
			menuWidth: 188,
			style: 'popup'
		});
		MODAL.$modalEl.children('option[value="' +  + '"]').attr('selected','selected');
		MODAL.$modalEl.dialog({
			position: [MODAL.modalLeft,100],
			zindex: 1000,
			modal: true
		});
	},
	saveAddress: function(){
		/**********
		TODO: error handling; Ajax to DB with updated values
		**********/
		var $addrItem = $('ul#addressList li:eq(' + MODAL.addrEdit + ')').find('div.addressItem');
		MODAL.$modalEl = $('section#editAddrModal');
		$addrItem.find('span.lblAddrName').text(MODAL.$modalEl.find('input[name="txtAddrTitle"]').val());
		$addrItem.find('span.lblAddrFullName').text(MODAL.$modalEl.find('input[name="txtFname"]').val() + ' ' + MODAL.$modalEl.find('input[name="txtLname"]').val());
		$addrItem.find('span.lblAddrStreet').text(MODAL.$modalEl.find('input[name="txtStreet"]').val());
		$addrItem.find('span.lblAddrStreet2').text(MODAL.$modalEl.find('input[name="txtStreet2"]').val());
		$addrItem.find('span.lblAddrCity').text(MODAL.$modalEl.find('input[name="txtCity"]').val());
		$addrItem.find('span.lblAddrState').text(MODAL.$modalEl.find('select.addrState').val());
		$addrItem.find('span.lblAddrZip').text(MODAL.$modalEl.find('input[name="txtZip"]').val());
		$addrItem.find('span.lblAddrPhone').text(MODAL.$modalEl.find('input[name="txtPhone"]').val());
		MODAL.closeModal(MODAL.$modalEl);
	},
	closeModal: function(modalWindow){
		modalWindow.dialog('close').hide();
	},
	deleteAddress: function(addrTitle, addrItem){
		MODAL.$modalEl = $('section#confirmDelete');
		MODAL.$modalEl.find($('span#deleteAddrName')).text(addrTitle);
		MODAL.$modalEl.dialog({
			position: [MODAL.modalLeft,100],
			zindex: 1000,
			modal: true
		});
		$('a#delNo').click(function(e){
			e.preventDefault();
			MODAL.closeModal(MODAL.$modalEl);
		});
		$('a#delYes').click(function(e){
			e.preventDefault();
			/**********
			TODO: Ajax to actually remove address from the DB, what about primary address?
			**********/
			addrItem.slideUp();
			MODAL.closeModal(MODAL.$modalEl);
		});
	},
	deleteItem: function(itemName, listItem){
		var $itemLabel;
		MODAL.$modalEl = $('section#confirmDelete');
		MODAL.$modalEl.find($('span#deleteItemName')).text(itemName);
		MODAL.$modalEl.dialog({
			position: [MODAL.modalLeft,100],
			zindex: 1000,
			modal: true
		});
		$('a#delNo').click(function(e){
			e.preventDefault();
			MODAL.closeModal(MODAL.$modalEl);
		});
		$('a#delYes').click(function(e){
			e.preventDefault();
			/**********
			TODO: Ajax to actually remove item from the wishlist
			**********/
			listItem.hide().remove();
			MODAL.closeModal(MODAL.$modalEl);
		});
	},
	emailWishList: function(url){
		MODAL.$modalEl = $('section#sendEmail');
		MODAL.$modalEl.dialog({
			position: [MODAL.modalLeft,200],
			zindex: 1000,
			modal: true
		});
		$('a#lnkCancel').click(function(e){
			e.preventDefault();
			MODAL.closeModal(MODAL.$modalEl);
		});
		$('a#lnkSend').click(function(e){
			e.preventDefault();
			/**********
			TODO: Send the email
			**********/
			MODAL.$modalEl.find('p.sendWLEmail').hide();
			MODAL.$modalEl.find('div.modalSendBtns').hide();
			MODAL.$modalEl.find('div.success').show();
		});
		$('a#okSent').click(function(e){
			e.preventDefault();
			MODAL.closeModal(MODAL.$modalEl);
		});
	},
	savePrefs: function(prefField){
		var $updateField = $('section#userInfo').find('span#' + prefField);
		var updateVal = '';
		MODAL.$modalEl = $('section#confirmChanges');
		MODAL.$modalEl.dialog({
			position: [MODAL.modalLeft,200],
			zindex: 1000,
			modal: true
		});
		switch(prefField){
			/**********
			TODO: for all of thesecases: validate & Ajax the change to the DB
			**********/
			case 'currEmail':
				updateVal = $('input#txtEmail').val();
				$updateField.text(updateVal);
				break;
			case 'currPass':
				console.log($('input#txtPassword').val().length);
				for (i = 0; i < $('input#txtPassword').val().length; i++){
					updateVal = updateVal+'*';
				}
				$updateField.text(updateVal);
				break;
			case 'currDOB':
				updateVal = $('select#selDOBMonth option:selected').val() + '/' + $('select#selDOBDate option:selected').val() + '/' + $('select#selDOBYear option:selected').val();
				$updateField.text(updateVal);
				break;
			case 'notifications':
				//nothing to do except post to DB
				break;
		}
		$('a#okSaved').click(function(e){
			e.preventDefault();
			MODAL.closeModal(MODAL.$modalEl);
		});
	}
}
ZIPPO = {/*main namespace, put each kind of body class in here to fire each function for that kind of page, for example: zhome, zlisting, etc.*/
	nextInput: function(lastField,nextField,numChars){
		console.log(lastField, nextField, numChars);
		var isNumeric = /^-?\d+$/.test(lastField.val());
		var isNonBlank = /\S/.test(lastField);
		console.log(isNumeric,isNonBlank,lastField.val().length);
		if (isNonBlank && isNumeric && (lastField.val().length == numChars)){
			nextField.focus();
		}else{
			console.log('what?');
		}
	},
	launchZRadio: function(){
		//update the URL for production
		window.open('http://clients.virid.com/Zippo/front_end/zRadio/zRadio.html','zRadio','left=12000,toolbar=0,status=0,width=372,height=625,top=0');
	},
	common: {
		init: function(){
			//console.log('ZIPPO.common.init();');
			$('footer#ftrSite').pinFooter();
			$(window).resize(function() {
				$("#footer").pinFooter();
			});
			$('section#navCart').hover(
				function(){NAVCART.showCart();},
				function(){NAVCART.hideCart();NAVCART.cancelShowCart();}
			);
			$('ul#cartItemsList a.cartItemDelete').live('click',function(){
				var $theLi = $(this).parent('li.liCartItem');
				NAVCART.deleteItem($theLi);
			});
			$('a#linkZradio').click(function(e){
				e.preventDefault();
				ZIPPO.launchZRadio();
			});
		},
		finalize: function(){
			//console.log('ZIPPO.common.finalize();');
		}
	},
	zhome: {
		init: function(){
			//console.log('ZIPPO.zhome.init();');
			setupSlides();
			$(window).resize(function(){
				$('.homeSlides').css('width',$(window).width() );
				setupSlides();
			});
			
		},
		zhome: function(){
			//console.log('ZIPPO.zhome.zhome();');
		},
		finalize: function(){
			//console.log('ZIPPO.zhome.finalize();');
		}
	},
	zlisting: {
		init: function(){
			//console.log('ZIPPO.zlisting.init();');
			$('div#bsKickSlide').easySlider({
				prevId: 'bsNavPrev',
				prevText: '',
				nextId: 'bsNavNext',	
				nextText: '',
				continuous: true,
				bestSeller: true
			});
			$('select.filter').selectmenu({
				menuWidth: 159,
				style: 'popup'
			}, function(){
				/**********
					TODO: CALL FUNCTION TO REFRESH LIST
				**********/
			});
		},
		zlisting: function(){
			//console.log('ZIPPO.zlisting.zlisting();');
			var $holder, numProds, prodWidth, prodListWidth, i;
			if($('div#lighterHolder').size() > 0){
				POPUPS.isLighters = true;
				$('div.lighterItem').bind({
					mouseenter: POPUPS.onProductRollover,
					mouseleave: function(){
						POPUPS.destroyProductPopup();
						POPUPS.cancelTriggerProductPopup();
					}
				});
			}else{
				POPUPS.isLighters = false;
				i = 0;
				$('div.listProdHolder').each(function(){
					$holder = $(this);
					POPUPS.hiddenIndex = i;
					$theUl = $holder.children('ul.listPageProds');
					numProds = $theUl.children('li').size();
					prodWidth = parseInt($theUl.children('li').width());
					$theUl.children('li').bind({
						mouseenter: POPUPS.onProductRollover,
						mouseleave: function(){
							POPUPS.destroyProductPopup();
							POPUPS.cancelTriggerProductPopup();
						}
					});
					prodListWidth = numProds * prodWidth;
					$theUl.css('width', prodListWidth + 'px');
					$holder.jScrollPane({showArrows: true});
					i++;
				});
			}
			
		},
		finalize: function(){
			//console.log('ZIPPO.zlisting.finalize();');
		}
	},
	zgifts: {
		init: function(){
			//console.log('ZIPPO.zgifts.init();');
			POPUPS.isSlider = false;
			$('div.rowItem').bind({
				mouseenter: POPUPS.onProductRollover,
				mouseleave: function(){
					POPUPS.destroyProductPopup();
					POPUPS.cancelTriggerProductPopup();
				}
			});
		}
	},
	zsupplies: {
		init: function(){
			//console.log('ZIPPO.zsupplies.init();');
			$('nav#suppSubNav a').click(function(){
				$clicked = $(this);
				$('nav#suppSubNav a').removeClass('active');
				/**********
				TODO Ajax refresh list when they choose a subcategory (refresh hidden elements, too)
				**********/
				$clicked.addClass('active');
			});
		}
	},
	zabout: {
		init: function(){
			//console.log('ZIPPO.zsupplies.init();');
			POPUPS.isSlider = false;
			POPUPS.isAbout = true;
			$('ul#timeItems li').bind({
				mouseenter: POPUPS.onProductRollover,
				mouseleave: function(){
					POPUPS.destroyProductPopup();
					POPUPS.cancelTriggerProductPopup();
				}
			});
		}
	},
	zdetail: {
		init: function(){
			//console.log('ZIPPO.zdetail.init();');
			$('div#bsKickSlide').easySlider({
				prevId: 'bsNavPrev',
				prevText: '',
				nextId: 'bsNavNext',	
				nextText: '',
				continuous: true,
				bestSeller: true
			});
			$('div#prodAltViews').easySlider({
				prevId: 'altViewPrev',
				prevText: ' ',
				nextId: 'altViewNext',	
				nextText: ' ',
				continuous: false
			});
			$('div#prodAltViews a.altView').click(function(e){
				e.preventDefault();
				var $altLink, imgSrc;
				$altLink = $(this);
				imgSrc = $altLink.children('img').attr('src').replace('altView','hero');
				$('div#prodAltViews a').removeClass('active');
				$('div#prodHero img').attr('src', imgSrc);
				$altLink.addClass('active');
			});
			$('div.connect_widget_text_summary').hide();
		},
		zdetail: function(){
			//console.log('ZIPPO.zdetail.zdetail();');
		},
		finalize: function(){
			//console.log('ZIPPO.zdetail.finalize();');
		}
	},
	zsearch: {
		init: function(){
			//console.log('ZIPPO.zsearch.init();');
			$('div#bsKickSlide').easySlider({
				prevId: 'bsNavPrev',
				prevText: '',
				nextId: 'bsNavNext',	
				nextText: '',
				continuous: true,
				bestSeller: true
			});
			$('select.filter').selectmenu({
				menuWidth: 159,
				style: 'popup'
			});
			$('input#txtSearchTerm').focus(function(){
				$(this).removeClass('inactive').attr('value','');
			});
			$('input#txtSearchTerm').blur(function(){
				if(($(this).val() =='') || ($(this).val() == 'Enter Keywords')){
					$(this).addClass('inactive').attr('value', 'Enter Keywords');
				}
			});
		},
		zsearch: function(){
			//console.log('ZIPPO.zsearch.zsearch();');
		},
		finalize: function(){
			//console.log('ZIPPO.zsearch.finalize();');
		}
	},
	zaccount: {
		init: function(){
			$('section#addrNew select.addrState').selectmenu({
				menuWidth: 188,
				style: 'popup'
			});
			$('section#addrExisting a.btnEdit').click(function(e){
				e.preventDefault();
				var $addrItem = $(this).parent('div.actnBtns').siblings('div.addressItem');
				MODAL.editAddress($addrItem);
				MODAL.addrEdit = parseInt($(this).parent('div.actnBtns').siblings('div.addressItem').children('input[type="hidden"]').val().replace('addresItem','')) - 1;
			});
			$('div.modalContent a.btnCancel').click(function(e){
				e.preventDefault();
				MODAL.closeModal($('section.modalWindow'));
			});
			$('section#editAddrModal a.btnSave').click(function(e){
				e.preventDefault();
				MODAL.saveAddress();
			});
			$('input.chkDef').uniform();
			$('ul#addressList a.lnkDelAddr').click(function(e){
				e.preventDefault();
				var addrName = $(this).siblings('div.addressItem').find('span.lblAddrName').text();
				var $listItem = $(this).parent('li');
				MODAL.deleteAddress(addrName, $listItem);
			});
			$('ul#addressList a.btnPrimary').click(function(e){
				e.preventDefault();
				$('ul#addressList li').removeClass('primaryAddr');
				/**********
				TODO: Ajax to db to make this primary
				**********/
				$(this).parents('li').addClass('primaryAddr');
			});
			$('ul#acctWishList a.lnkDelWishItem').click(function(e){
				e.preventDefault();
				var itemName = $(this).siblings('h5.wListName').text();
				var $listItem = $(this).parent('li');
				MODAL.deleteItem(itemName, $listItem);
			});
			$('a#lnkWLMail').click(function(e){
				e.preventDefault();
				MODAL.emailWishList($(this).attr('href'));				
			});
			$('select#selDOBMonth').selectmenu({
				menuWidth: 92,
				style: 'popup'
			});
			$('select#selDOBDate').selectmenu({
				menuWidth: 60,
				style: 'popup'
			});
			$('select#selDOBYear').selectmenu({
				menuWidth: 63,
				style: 'popup'
			});
			$('section#userInfo a.btnUpdatePref, a#lnkUpdateNots').click(function(e){
				e.preventDefault();
				MODAL.savePrefs($(this).attr('data-val'));
			});
			$('a#lnkForgotPass').click(function(e){
				e.preventDefault();
				var modalLeft = parseInt(Math.round((window.innerWidth - 560) / 2));
				$('section#passModal').dialog({
	 				position: [modalLeft,100],
	 				zindex: 1000,
	 				modal: true
	 			});
			});
			$('a#btnRetPass').click(function(e){
				e.preventDefault();
				/*****
					TODO: ajax to actually send email with password
				*****/
				$('div#forgotForm').hide();
				$('div#retMessage').show();
				$('a#retCancel').text('OKAY');
			});
			$('a#retCancel').click(function(e){
				e.preventDefault();
				MODAL.closeModal($('section#passModal'));
				$('div#forgotForm').show();
				$('div#retMessage').hide();
			});
		}
	},
	zcart: {
		init: function(){
			$('div#bsKickSlide').easySlider({
				prevId: 'bsNavPrev',
				prevText: '',
				nextId: 'bsNavNext',	
				nextText: '',
				continuous: true,
				bestSeller: true
			});
			$('ul#cartPageItems a.cartRemove').click(function(e){
				e.preventDefault();
				var $link = $(this);
				/**********
				TODO: confirm delete, then Ajax to actually update the cart on backend
				**********/		
				var $li = $link.parent('div').parent('li');
				$li.slideUp();
			});
			$('div.helpIcon').hover(
				function(){
					console.log($(this).children());
					$(this).children().fadeIn('fast');
				},
				function(){
					$(this).children().delay(300).fadeOut();
				}
			);
			$('input#txtPromoCode')
				.focus(function(){
					$(this).attr('value','');
				})
				.blur(function(){
					if ($(this).val() == ''){
						$(this).attr('value','enter promo code here');
					}
				});
		}
	},
	zcheckout: {
		init: function(){
			$('select#selBillState,select#selShipState,select#selMilRegion,select#selMilAPO,select#selCardType,select#selSavedAddr').selectmenu({
				menuWidth: 188,
				style: 'popup'
			});
			$('section#kickerCheckout').stickySidebar({ 
				timer: 200
			});
			$('input.chkDef').uniform();
			$('input.radDef').uniform();
			$('select#selDOBMonth').selectmenu({
				menuWidth: 92,
				style: 'popup'
			});
			$('select#selDOBDate').selectmenu({
				menuWidth: 60,
				style: 'popup'
			});
			$('select#selDOBYear').selectmenu({
				menuWidth: 63,
				style: 'popup'
			});
			$('select#selExpMonth').selectmenu({
				menuWidth: 92,
				style: 'popup'
			});
			$('select#selExpYear').selectmenu({
				menuWidth: 63,
				style: 'popup'
			});
		},
		zcheckout: function(){
			$('a#lnkForgot').click(function(e){
				e.preventDefault();
				var modalLeft = parseInt(Math.round((window.innerWidth - 560) / 2));
				$('section#passModal').dialog({
	 				position: [modalLeft,100],
	 				zindex: 1000,
	 				modal: true
	 			});
			});
			$('a#btnRetPass').click(function(e){
				e.preventDefault();
				/*****
					TODO: ajax to actually send email with password
				*****/
				$('div#forgotForm').hide();
				$('div#retMessage').show();
				$('a#retCancel').text('OKAY');
			});
			$('a#retCancel').click(function(e){
				e.preventDefault();
				MODAL.closeModal($('section#passModal'));
				$('div#forgotForm').show();
				$('div#retMessage').hide();
			});
			$('a#lnkLogin,a#lnkGuestContinue').click(function(e){
				e.preventDefault();
				/**********
				TODO: validate, Ajax to login
				**********/
				$('div#checkoutStep1').slideDown(function(){
					$('section#kickerCheckout').stickySidebar({ 
						timer: 200
					});
				});
			});
			$('a#lnkBillContinue').click(function(e){
				e.preventDefault();
				/**********
				TODO: validate, Ajax order info
				**********/
				$('div#checkoutStep2,a#lnkEditStep1').slideDown(function(){
					$('section#kickerCheckout').stickySidebar({ 
						timer: 200
					});
					$('div#checkStep1Form').slideUp();
				});
			});
			$('select#selSavedAddr').change(function(){
				/**********
				TODO: update the adress fields with data from the saved address they choose
				**********/
			})
			$('li#checkShipBtns a').click(function(e){
				e.preventDefault();
				$thisLink = $(this);
				$('li#checkShipBtns a').removeClass('active');
				if ($thisLink.attr('id') == 'lnkSingleAddr'){
					$('li.milAddr').hide();
					$('li.normAddr').show();
				}else{
					$('li.normAddr').hide();
					$('li.milAddr').show();
				}
				$thisLink.addClass('active');
			});
			$('a#lnkShipContinue').click(function(e){
				e.preventDefault();
				/**********
				TODO: validate, update sales tax as needed, Ajax post order info
				**********/
				$('div#checkoutStep3,a#lnkEditStep2,div#chkOutFinalBtns').slideDown(function(){
					$('section#kickerCheckout').stickySidebar({ 
						timer: 200
					});
					$('div#checkStep2Form').slideUp();
				});
			});
			$('div#checkoutForms a.editCheckStep').click(function(e){
				e.preventDefault();
				var $myForm = $(this).parent('h3').siblings('div.checkStepForm');
				$myForm.slideDown();
				
			});
			$('div#uniform-radShipBill').click(function(){
				if (! $('input#radShipDiff').is('checked')){
					$('ul#checkShipAddr').slideUp();
				}
			});
			$('div#uniform-radShipDiff').click(function(){
				if (! $('input#radShipBill').is('checked')){
					$('ul#checkShipAddr').slideDown();
				}
			});
			$('input[name="radioShipMethod"]').click(function(){
				var shipPrice = '$-.--';
				switch ($(this).val()){
					case 'standard':
						shipPrice = '$7.95';
						break;
					case 'express 2 day':
						shipPrice = '$14.95';
						break;
					case 'express 1 day':
						shipPrice = '$19.95';
						break;
				}
				$('div#lblSummShipPrice').text(shipPrice);
			});
			$('div.helpIcon').hover(
				function(){
					console.log($(this).children());
					$(this).children().fadeIn('fast');
				},
				function(){
					$(this).children().delay(300).fadeOut();
				}
			);
			$('a#lnkApplyGC').click(function(e){
				e.preventDefault();
				/**********
				TODO: 
					AJAX validate gc and determine amount
					put amount into the right label in order summary
					update order summary (sub)totals
				**********/
				$('li#summGC').show();
			});
			﻿$('input#txtBillPhoneArea').keyup(function(){
				ZIPPO.nextInput($(this),$('input#txtBillPhonePrefix'), 3);
			});
			$('input#txtBillPhonePrefix').keyup(function(){
				ZIPPO.nextInput($(this),$('input#txtBillPhoneSuffix'), 3);
			});
			$('input#txtShipPhoneArea').keyup(function(){
				ZIPPO.nextInput($(this),$('input#txtShipPhonePrefix'), 3);
			});
			$('input#txtShipPhonePrefix').keyup(function(){
				ZIPPO.nextInput($(this),$('input#txtShipPhoneSuffix'), 3);
			});
		}
	},
	zstores: {
		getGoogleMap: function(liIdx,address){
			console.log(document.getElementById('gMap' + liIdx));
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(41.9563062, -78.653236);
    		var myOptions = {
      			zoom: 14,
      			center: latlng,
      			mapTypeId: google.maps.MapTypeId.ROADMAP
    		};
			var map = new google.maps.Map(document.getElementById('gMap' + liIdx), myOptions);
			geocoder.geocode( { 'address': address}, function(results, status) {
      			if (status == google.maps.GeocoderStatus.OK) {
        			map.setCenter(results[0].geometry.location);
        			var marker = new google.maps.Marker({
            			map: map,
            			position: results[0].geometry.location
        			});
      			} else {
        			window.log('Google Maps Geocode error: ' + status);
      			}
    		});
    		
		},
		setDirLink: function(liIdx, address){
			console.log('directions', liIdx, address)
			var href='http://maps.google.com/maps?q=' + address[0] + '+' + address[1] + '+' + address[2] + '+' + address[3];
			$('a#lnkDir'+liIdx).attr('href', href);
		},
		init: function(){
			$('a.showStore').live('click',function(e){
				e.preventDefault();
				var $link = $(this);
				var $hdr = $link.parent('header');
				$('div.storeInfo').slideUp();
				$link.remove();
				$hdr.siblings('div.storeInfo').slideDown();
				$hdr.prepend('<a href="#" class="hideStore" title="hide details"></a>');
			});
			$('a.hideStore').live('click',function(e){
				e.preventDefault();
				var $link = $(this);
				var $hdr = $link.parent('header');
				$link.remove();
				$hdr.siblings('div.storeInfo').slideUp();
				$hdr.prepend('<a href="#" class="showStore" title="show details"></a>');
			});
			$('a.closeInfo').click(function(e){
				e.preventDefault();
				$(this).parent('div.storeInfo').slideUp();
			});
			$('ul#storeList li.storeLoc').each(function(){
				var $li = $(this);
				var address = $li.find('span.addrStreet').text();
				address = address + ', ' + $li.find('span.addrCity').text();
				address = address + ', ' + $li.find('span.addrState').text();
				address = address + ', ' + $li.find('span.addrZip').text();
				ZIPPO.zstores.getGoogleMap($('ul#storeList li.storeLoc').index($li),address);
				ZIPPO.zstores.setDirLink($('ul#storeList li.storeLoc').index($li),address);
			});
		}
	},
	zmailing: {
		init: function(){
			$('input.chkDef').uniform();
			$('select#selDOBMonth').selectmenu({
				menuWidth: 92,
				style: 'popup'
			});
			$('select#selDOBDate').selectmenu({
				menuWidth: 60,
				style: 'popup'
			});
			$('select#selDOBYear').selectmenu({
				menuWidth: 63,
				style: 'popup'
			});
			$('select#selState').selectmenu({
				menuWidth: 188,
				style: 'popup'
			});
			$('select#selType').selectmenu({
				menuWidth: 188,
				style: 'popup'
			});
			$('select#selGender').selectmenu({
				menuWidth: 141,
				style: 'popup'
			});
			$('select#selDistance').selectmenu({
				menuWidth: 141,
				style: 'popup'
			});
			$('a#selGender-button').width(136);
			$('select#selCountry').selectmenu({
				menuWidth: 328,
				style: 'popup'
			});
		},
		zmailing: function(){
			
		}
	},
	zgiftcards: {
		init: function(){
			$('input.chkDef').uniform();
			$('input.radDef').uniform();
			$('select#selGCAmount').selectmenu({
				menuWidth: 60,
				style: 'popup'
			});
			$('input#gcDate').datepicker();
		},
		zgiftcards: function(){
			$('a#btnPrevMsg').click(function(e){
				e.preventDefault();
				$('p#pErrorMsg').hide(); 			
				var gcPrevTo, gcPrevFrom, gcPrevAmount, gcPrevMsg, gcCardImg;
				gcPrevTo = $('input#txtToName').val();
				gcPrevFrom = $('input#txtFromName').val();
				gcPrevAmount = '$' + $('select#selGCAmount').val();
				gcPrevMsg = $('textarea#txtGCMsg').val();
				gcCardImg = $('input[name="gcImage"]:checked').parents('li').find('label.lblImage').find('img').attr('src');
				if (
					!(UTIL.notEmpty(gcPrevTo)) ||
					!(UTIL.notEmpty(gcPrevFrom)) ||
					!(UTIL.notEmpty(gcPrevMsg))
				){
					$('p#pErrorMsg').show();
					return;
				}
				$('div#gcPrevImg').css('background-image', gcCardImg);
				$('span#gcPrevTo').text(gcPrevTo);
				$('span#gcPrevFrom').text(gcPrevFrom);
				$('span#gcPrevAmount').text(gcPrevAmount);
				$('span#gcPrevMsg').text(gcPrevMsg);
				var modalLeft = parseInt(Math.round((window.innerWidth - 560) / 2))
				$('section#prevGCModal').dialog({
	 				position: [modalLeft,100],
	 				zindex: 1000,
	 				modal: true
	 			});
			});
			$('a#prevOK').click(function(e){
				e.preventDefault();
				MODAL.closeModal($('section#prevGCModal'));
			});
		}
	},
	zrepairs: {
		init: function(){
			$('div#repairTabs').tabs();
			$('ul#repairLighters a').click(function(e){
				e.preventDefault();
				var panel = $('div' + $(this).attr('href'));
				$('ul#repairLighters li, div#ltRepairPanels div').removeClass('active');
				$(this).parents('li').addClass('active');
				panel.addClass('active');
			});
		}
	}
}
UTIL = {
	fire : function(func,funcname,args){
		var namespace = ZIPPO;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}
	},
	loadEvents : function(){
		var bodyId = document.body.id;
		UTIL.fire('common');
		
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
		UTIL.fire('common','finalize');
	},
	notEmpty: function (value){
		var blankPattern = /\S/;
		return blankPattern.test(value);
	},
	isEmail: function(value){
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
   		return emailPattern.test(value);
	},
	isNumeric: function(value){
		var numPattern = /^-?\d+$/;
		return numPattern.test(value);
	}
}
$(function(){
	UTIL.loadEvents();
});