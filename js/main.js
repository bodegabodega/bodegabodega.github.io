jQuery(document).ready(function($) {

	var resizeSidebar = function() {
		$('.card-selector').css('height', $(window).height());
		$('.card-selector').css('width', $('.card-container').offset().left);
	};

	var init = function() {
		setTimeout(resizeSidebar, 10);

		//return;

		$('.card-container .card').each(function(index, item) {
			var card = $(item);
			var cardInner = card.find('.card-inner');
			card.data('orig-height', $(item).outerHeight(true));

			// return;

			TweenLite.to(cardInner, 0, {
				opacity: 0
			});
			TweenLite.to(card, 0, {
				height: 0,
				onComplete: function() {
					card.hide();
				}
			});
			
		});

		$('.card-selector :checkbox').change(function(event) {
			var cb = event.currentTarget;
			var n = $(cb).data('cardName');
			var card = $('.card-container .card.' + n);
			var cardInner = card.find('.card-inner');
			var oHeight = card.data('orig-height');

			if (cb.checked) {
				card.show();
				var windest = card.offset().top - 50;

				var tl = new TimelineLite();
				tl.to( card, .5, {
					height: oHeight,
					ease:Power1.easeInOut
				}).to(cardInner, .35, {
					delay: .35,
					opacity: 1,
					ease:Power1.easeIn
				});

				TweenMax.to(window, .5, {
					scrollTo: {
						y:windest
					}, ease:Power1.easeInOut
				});
			} else {
				//card.hide();
				TweenLite.to(cardInner, .35, {
					opacity: 0
				});
				TweenLite.to(card, .35, {
					height: 0,
					delay: .35,
					onComplete: function() {
						card.hide();
					}
				});

			};
		});
	}

	$(window).resize(resizeSidebar);

	init()
});