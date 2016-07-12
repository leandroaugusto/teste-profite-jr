// Main.js
window.onload = function(){
	$.getJSON('data/data.json', function(data) {
		var items = [],
			template;
		$.each(data.products, function(i, item){
			items.push(
				'<li class="item" data-hover="'+item.img_hover+'" data-zoom="'+item.zoom+'">'
				+'	<img src="images/sapatos/'+item.img+'" alt="'+item.name+'" />'
				+'	<p>'+item.name+'</p>'
				+'</li>')
		});
		template = '<div class="products-container">'
					+'	<ul class="wrapper total-carousel">'
					+items.join('')
					+'	</ul>'
					+'</div>';
		
		$('#application-products').html(template);
		
		$('.products-container').find('.item').each(function(){
			var that = $(this),
				original = that.attr('src'),
				zoom = that.data('zoom'),
				hover = that.data('hover'),
				path = 'images/sapatos/';

			that.mouseenter(function(){
				that.find('img').attr('src', path+hover);
			});
			that.mouseleave(function(){
				that.find('img').attr('src', original);
			});
		});
	})
}