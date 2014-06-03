/**
 * Module our work
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */

define(['jquery', 'modules/scrolling', 'isotope'], function ($, scrolling) {

	// Strict mode to prevent sloppy JS
	'use strict';

	// Private
	var jsonFile	= 'data/ourwork.json',
		totalPages,
		curPage		= 2,
		$grid,
		gridOptions = {
			itemSelector: '.ourwork__grid__item',
			layoutMode: 'masonry',
			animationEngine: "best-available",
			masonry: {
				columnWidth: 282,
				gutterWidth: 12
			}
		};

	// Public API
	return {
		init: function() {
			var qsRegex,
				// Masonry Our Work grid
				$ourworkFilter = $('#js-ourwork-filters'),
				$searchInput = $('#js__ourwork__search__input');

			// Set cur width accordingly to active media query
			window.mqSync();

			if (window.currentMQ === "L") {
				gridOptions.masonry.columnWidth = 282;
			} else if (window.currentMQ === "M") {
				gridOptions.masonry.columnWidth = 236;
			} else {
				gridOptions.masonry.columnWidth = 1000;
			}

			$grid = $('#js-ourwork-grid').isotope(gridOptions);


			// Isotope js-ourwork-filters
			$ourworkFilter.on( 'click', 'a', function() {
				// Clear search input quick search
				$searchInput.val('');

				var $this = $(this),
					filterValue = $(this).attr('data-filter');

				$ourworkFilter.find('a').removeClass("active");
				$this.addClass('active');

				$grid.isotope({
					filter: filterValue,
					transitionDuration: '0.5s'
				});

				// Refresh dimensions
				scrolling.refresh();

				return false;
			});

			// Isotope quick search
			var $quicksearch = $searchInput.keyup(this._debounce(function(){
					// Clear other filters
					$ourworkFilter.find('a').removeClass('active');
					$ourworkFilter.find('a').eq(0).addClass('active');

					qsRegex = new RegExp( $quicksearch.val(), 'gi' );
					$grid.isotope({
						filter: function() {
							return qsRegex ? $(this).text().match( qsRegex ) : true;
						}
					});
					// Refresh dimensions
					scrolling.refresh();
				}));

			$('#js__ourwork__search__btn').on('click', function() {
				$searchInput.toggleClass('ourwork__search__input--hidden');
			});

			// Append more on click load more
			var $loadMore = $('#js-ourwork-loadmore'),
				that = this;

			// get total number of possible loads
			totalPages = $loadMore.attr('data-pages');

			$loadMore.on('click', function() {
				// Swap for loading ajax
				$loadMore.children('span').html('<img src="dist/img/ourwork-loader.gif" alt="Loading" />');
				that.appendWorkItems.call(that);
			});

			// Bind Play video btn handler
			this.playVideos();

		},

		appendWorkItems: function() {
			var workHTML	= '',
				$this		= $(this),
				that		= this;

			// Load Works with JSON
			$.getJSON(jsonFile, function(data) {

				$.each( data, function( key, values ) {
					var gridClass		= 'ourwork__grid__item--',
						gridCategory	= '';

					switch (values.grid) {
						case 1:
							gridClass += 'slandscape';
							break;
						case 2:
							gridClass += 'blandscape';
							break;
						case 3:
							gridClass += 'portrait';
							break;
					}

					if (values.category) {
						gridCategory = ' ' + values.category;

						// Generate new items elements using JSON Data
						workHTML += '<div class="ourwork__grid__item ourwork__grid__append ' + gridClass + '' + gridCategory + '" id="js-ourwork-grid-item-' + (key + 10) + '">' +
								'	<figure>' +
								'		<div class="ourwork__grid__item__image">' +
								'			<img src="dist/img/our-work/' + values.thumbnail + '" alt="' + values.title + '" />' +
								'			<img src="dist/img/our-work/' + values.mobileThumbnail + '" alt="' + values.title + '" class="ourwork__grid__item__image__mobile" />' +
								'		</div>' +
								'		<figcaption class="ourwork__grid__item__rollover">' +
								'			<div>' +
								'				<h3>' + values.title + '</h3>' +
								'				<p>' + values.caption + '</p>' +
								'				<a href="dist/videos/' + values.video + '" class="ourwork__grid__item__play">Play</a>' +
								'			</div>' +
								'		</figcaption>' +
								'	</figure>' +
								'</div>';
					} else {
						// Empty Gaps
						workHTML += '<div class="ourwork__grid__item ' + gridClass + '' + gridCategory + '"></div>';
					}

					
				});

				// Inject HTML into container
				var $elems = $(workHTML);

				$grid.append($elems).isotope('appended', $elems);

				// Remove Appended animation class
				setTimeout(function() {
					$elems.removeClass('ourwork__grid__append');
				}, 1000);
				
				// Pagination checker -- if total loaded hide button and kill the handler
				curPage++;
				if (curPage === totalPages) {
					$this.addClass('hidden');
					$this.off('click');
				}

				// Bind Play video btn handler
				that.playVideos();

				// Reinstate Load more
				$('#js-ourwork-loadmore').children('span').html("Load More +");

				// Refresh dimensions
				scrolling.refresh();
			});
		},

		playVideos: function() {

			var $gridItems = $grid.children('.ourwork__grid__item'),
				that = this;


			// Big Devices
			// Kill first to avoid repetition
			$gridItems.off('click', '.ourwork__grid__item__play');
			$gridItems.on('click', '.ourwork__grid__item__play', function(e){
				console.log('Play Video');

				var $this		= $(this),
					$container	= $this.parents('.ourwork__grid__item'),
					itemPos		= $container.position(),
					$videoLayer	= $('<div id="js-ourword-videolayer"></div>'),
					videoPath	= $this.attr('href'),
					$gridDisabler = $('<div class="ourwork__portfolio__disabler" id="js-ourwork-portfolio-disabler"></div>');

				// Add the overlay prevent clicking transparent layer
				$('#js-ourwork-portfolio').append($gridDisabler);


				// Make grid items more transparent
				$gridItems.fadeTo(500, 0.5);

				// Check if has space to grow to the left
				if (itemPos.left + 556 > $grid.width()) {
					// Grow to the right
					$videoLayer.css({ right: 12 });
				} else {
					// Grow to the left
					$videoLayer.css({ left: itemPos.left });
				}

				// Check if has space to grow to the bottom
				if (itemPos.top + 300 > $grid.height()) {
					// Grow to the top
					$videoLayer.css({ bottom: 12 });
				} else {
					// Grow to the bottom
					$videoLayer.css({ top: itemPos.top });
				}


				// Set pos for overlay layer
				
				$videoLayer.addClass('ourwork__videolayer');

				$grid.append($videoLayer);

				// Animation
				$videoLayer.animate({
					width: 556,
					height: 300,
					opacity: 1
				}, 750, function() {
					var $this = $(this),
						$closeVideo = $('<div class="ourwork__videolayer__close" id="js-ourwork-video-close"></div>');

					$this.addClass('ourwork__videolayer--active');
					$this.append($closeVideo);


					$videoLayer.append('<div id="js-ourword-videolayer-player"></div>');

					

					$closeVideo.on('click', function() {
						// Close Layer
						$videoLayer.stop().animate({
							width: 0,
							height: 0,
							opacity: 0
						}, 500, function() {
							// Bye bye layer
							$videoLayer.remove();
							$gridDisabler.remove();
						});
						$gridItems.fadeTo(500, 1);
					});

					// Lets load that video and play it with JWPlayer. Ain't nobody got time for video tags
					console.log(videoPath);

					window.jwplayer("js-ourword-videolayer-player").setup({
						file: videoPath,
						width: 556,
						height: 300,
						autostart: true,
						flashplayer: 'dist/videos/jwplayer.flash.swf'
					});
				});
				e.preventDefault();
			});


			// Small Devices
			$gridItems.off('click', '.ourwork__grid__item__image');
			$gridItems.on('click', '.ourwork__grid__item__image', function(){

				// Very slow logic --  Improve

				console.log('Play Video');


				var $this = $(this),
					$thisParent = $this.parents('.ourwork__grid__item');

				if ($this.hasClass('ourwork__grid__item__image--playing')) {
					// Is playing, pause
					window.jwplayer().pause();
					$this.removeClass('ourwork__grid__item__image--playing');
					$this.addClass('ourwork__grid__item__image--paused');
				} else if($this.hasClass('ourwork__grid__item__image--paused')) {
					// If paused, play
					window.jwplayer().play();
					$this.removeClass('ourwork__grid__item__image--paused');
					$this.addClass('ourwork__grid__item__image--playing');
				} else {
					

					that.destroyMobileVideoInstances();

					var $videoLayer = $('<div class="ourwork__videolayer--mobile" id="ourwork-videolayer-mobile"><div id="ourwork-videolayer-mobile-player"></div></div>'),
						videoPath = $thisParent.find('.ourwork__grid__item__play').attr('href');

					console.log(videoPath);

					$this.append($videoLayer);

					window.jwplayer('ourwork-videolayer-mobile-player').setup({
						file: videoPath,
						width: '100%',
						height: '100%',
						autostart: true,
						flashplayer: 'dist/videos/jwplayer.flash.swf',
						showicons: "false",
						showdigits: "false",
						controlbar: "over",
						'controlbar.idlehide': "true"
					});

					// Set as playing
					$this.addClass('ourwork__grid__item__image--playing');
				}
				
			});
			
		},

		destroyMobileVideoInstances: function() {
			// Destroy first and then create player
			if ($('#ourwork-videolayer-mobile').length) {
				

				// Remove play classes from parent movie
				$('#ourwork-videolayer-mobile').parent()
				.removeClass('ourwork__grid__item__image--paused')
				.removeClass('ourwork__grid__item__image--playing');

				$('#ourwork-videolayer-mobile').remove();
			}
		},

		rearrangeGrid: function(cwidth) {
			// Restart grid
			console.log("RESTART GRID");

			gridOptions.resizable = false;
			gridOptions.masonry.columnWidth = cwidth;
			

			setTimeout(function() {
				$grid.isotope(gridOptions);
			} , 500);
		},

		relayoutGrid: function(cwidth) {
			console.log("RESIZABLE GRID");
			gridOptions.masonry.columnWidth = cwidth;
			gridOptions.filter = '';
			$grid.isotope(gridOptions);
		},

		_debounce: function(fn, threshold) {
			// debounce so filtering doesn't happen every millisecond
			var timeout;
			return function debounced() {
				if ( timeout ) {
					clearTimeout( timeout );
				}
				function delayed() {
					fn();
					timeout = null;
				}
				setTimeout( delayed, threshold || 100 );
			};
		}
	};

});
