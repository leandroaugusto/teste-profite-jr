// Main.js
window.onload = function(){
	var productItems = [],
		bannersItems = []
		$breakpoint = 980,
		$banners = $('.carousel-banners'),
		$products = $('.products-container');

	// Get Json and mount areas
	$.getJSON('data/data.json', function(data) {
		// Banner items
		$.each(data.banners, function(i, item){
			bannersItems.push(
				'<li class="item-banner" data-mobile="'+item.mobile+'">'
				+'	<img src="images/banner/'+item.img+'" alt="'+item.name+'" class="img-banner">'
				+'</li>')
		});
		// Products items
		$.each(data.products, function(i, item){
			productItems.push(
				'<li class="item" data-hover="'+item.img_hover+'" data-zoom="'+item.zoom+'">'
				+'	<img src="images/sapatos/'+item.img+'" alt="'+item.name+'" />'
				+'	<p>'+item.name+'</p>'
				+'	<ul class="stars">'
				+'		<li>'+1+'</li>'
				+'		<li>'+2+'</li>'
				+'		<li>'+3+'</li>'
				+'		<li>'+4+'</li>'
				+'		<li>'+5+'</li>'
				+'	</ul>'
				+(item.for != '' ? '<span class="price-for">De: R$ '+item.for+'</span>' : '')
				+'<span class="price">'
				+'	Por: R$ <span>'+item.price+'</span>'
				+'</span>'
				+'<span class="times">'
				+'	ou <b>até '+item.times+'X </b>de <b>R$ '+item.value_times+'</b>'
				+'</span>'
				+'<div class="action">'
				+'	<a href='+item.link+' class="button-buy">comprar</a>'
				+'	<span class="save-value">Economize: R$ '+item.save_value+'</span>'
				+'</div>'
				+'</li>')
		});
		
		// Mount Banners and Products
		$banners.html(bannersItems.join(''));
		$products.html(productItems.join(''));
		// After load items
		$('body').find('#loading').fadeOut(500);
		
		// Products interaction
		$products.slick({
			infinite: false,
			dots: false,
			slidesToShow: 4,
			responsive: [{
				breakpoint: $breakpoint,
				settings: {
					slidesToShow: 3
				}
	    	}]
		})
		$products.find('.item').each(function(){
			var that = $(this),
				img = that.find('img'),
				modal = $('#lightbox'),
				originalPath = img.attr('src'),
				alt = img.attr('alt'),
				zoom = that.data('zoom'),
				hover = that.data('hover'),
				path = 'images/sapatos/';

			that.on('mouseenter', function(){
				img.attr('src', path+hover);
			});
			that.on('mouseleave', function(){
				img.attr('src', originalPath);
			});

			img.on('click', function(){
				modal.find('img').attr('src', path+zoom);
				modal.fadeIn(500);
			});

			modal.find('.close').on('click', function(){
				modal.fadeOut(500);
			});
		});

		// Banners interaction
		$banners.find('.item-banner').each(function(){
			var that = $(this),
				imgSource = that.data('mobile'),
				img = that.find('img'),
				path = 'images/banner/',
				originalSource = img.attr('src');

			resize(img, path+imgSource, originalSource);
			$(window).resize(resize(img, path+imgSource, originalSource));
		})
		
		function resize(img, min, max){
			var wWidth = $(window).width();

			if ( wWidth < $breakpoint ) {
				img.attr('src', min);
			} else if ( wWidth >= $breakpoint ) {
				img.attr('src', max);
			}
		}

		$banners.slick({
			infinite: true,
			slidesToshow: 1,
			dots: true
		})
	})
}