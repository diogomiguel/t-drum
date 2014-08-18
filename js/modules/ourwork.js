/**
 * Module our work
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */

define(['jquery', 'modules/scrolling', 'isotope', 'imagesLoaded'], function ($, scrolling) {

	// Strict mode to prevent sloppy JS
	'use strict';

	// Private
	var jsonFile	= 'data/_ourwork.php',
		curPage		= 2,
		$grid,
		gridOptions = {},
		activeMobileVideo,
		imagesLazyLoaded = false,

		debounce = function(fn, threshold) {
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
		},
		appendWorkItems = function() {
			var workHTML	= '',
				that		= this,
				nextPage	= curPage + 1;

			// Load Works JSON
			$.getJSON(jsonFile + '?page=' + curPage, function(data) {
				var n = 0;
				$.each(data, function(key, values){
					console.log(key + " " + values);

					/* jshint ignore:start */

					// if 0 get nextPage
					if (n === 0) {
						nextPage = values['next_page_number'] ? parseInt(values['next_page_number']) : null;

					}

					if (!values['video_path']) {
						return;
					}

				
					var gridClass		= values['_vclass'],
						gridCategory	= '';
						

						// Get category class values
						if (values['video_advert']) {
							gridCategory += ' ' + values['video_advert'];
						}

						if (values['video_film']) {
							gridCategory += ' ' + values['video_film'];
						}

						if (values['video_showreel']) {
							gridCategory += ' ' + values['video_showreel'];
						}

						if (values['video_other']) {
							gridCategory += ' ' + values['video_other'];
						}


					// Generate new items elements using JSON Data
					workHTML += '<div class="ourwork__grid__item ourwork__grid__append ' + gridClass + '' + gridCategory + '" id="js-ourwork-grid-item-' + (values._id) + '">' +
							'	<figure>' +
							'		<div class="ourwork__grid__item__image">' +
							'			<img src="' + values['image'] + '" alt="' + values['title'] + '" />' +
							'		</div>' +
							'		<figcaption class="ourwork__grid__item__rollover">' +
							'			<div>' +
							'				<h3>' + values['title'] + '</h3>' +
											values['video_caption'] +
							'				<a href="/dist/videos/' + values['video_path'] + '" class="ourwork__grid__item__play">Play</a>' +
							'			</div>' +
							'		</figcaption>' +
							'	</figure>' +
							'</div>';
					

					// Empty gap 4 index
					if (n === 3) {
						console.log(n);
						workHTML += '<div class="ourwork__grid__item ourwork__grid__append ourwork__grid__item--portrait"></div>';
					}
					/* jshint ignore:end */
					n++;


					
				});

				// Inject HTML into container
				var $elems = $(workHTML);

				$grid.append($elems).isotope('appended', $elems);

				// Center loaded images
				$grid.find('.ourwork__grid__append img').load(function() {
					
					var $this = $(this);

					if ($this.attr('src').indexOf('blank') === -1) {
						that.centerWorkImage($this);
					}
			
				});

				// Remove Appended animation class
				setTimeout(function() {
					$elems.removeClass('ourwork__grid__append');
					scrolling.refresh();
				}, 1000);
				
				// Pagination checker -- if total loaded hide button and kill the handler
				if (!nextPage) {
					console.log('Hide Button');
					$('#js-ourwork-loadmore').addClass('hidden');
					$('#js-ourwork-loadmore').off('click');
				} else {
					curPage++;
				}

				// Bind Play video btn handler
				that.playVideos();

				// Reinstate Load more
				$('#js-ourwork-loadmore').children('span').html("Load More +").removeClass('ourwork__loadmore__loading');

				// Refresh dimensions
				//scrolling.refresh();
			});
		},
		// Only called on lazy load complete (nav.js)
		centerWorkImage = function($img) {
			// Absolutely center the image in our work
			
			var $parent = $img.parents('.ourwork__grid__item');

			if (window.currentMQ === "L" || window.currentMQ === "M") {
				var parentWidth = $parent.width(),
					parentHeight = $parent.height(),
					imgWidth = $img.width(),
					imgHeight = $img.height();

					// Align center
					if (imgWidth > parentWidth) {
						var newLeft = parentWidth / 2 - imgWidth / 2;

						$img.css('left', Math.round(newLeft));
					}

					// Align top
					if (imgHeight > parentHeight) {
						var newTop = parentHeight / 2 - imgHeight / 2;

						$img.css('top', Math.round(newTop));
					}

			}
		};

	// Public API
	return {
		init: function() {
			

			$grid = $('#js-ourwork-grid');

			// Default options
			gridOptions = {
				itemSelector: '.ourwork__grid__item',
				layoutMode: 'masonry',
				resizable: false,
				animationEngine: "best-available",
				masonry: {
					columnWidth: 282,
					gutterWidth: 12
				}
			};

		},

		setupMasonry: function() {
			// Not on init. Mediaqueries need to run first
			// Masonry Our Work grid
			var	$ourworkFilter = $('#js-ourwork-filters'),
				$searchInput = $('#js__ourwork__search__input'),
				qsRegex,
				that = this;
				
			if (window.currentMQ === "L") {
				gridOptions.masonry.columnWidth = 282;
			} else if (window.currentMQ === "M") {
				gridOptions.masonry.columnWidth = 236;
			} else {
				gridOptions.masonry.columnWidth = 1000;
			}

			$grid.imagesLoaded(function(){
				$grid.isotope(gridOptions);
			});


			// Isotope js-ourwork-filters
			$ourworkFilter.on( 'click', 'a', function() {
				// Clear search input quick search
				$searchInput.val('');

				var $this = $(this),
					filterValue = $(this).attr('data-filter');

				$ourworkFilter.find('a').removeClass("active");
				$this.addClass('active');

				that.gridReload(filterValue);
				

				// Refresh dimensions
				setTimeout(function(){
					scrolling.refresh();
				}, 500);

				return false;
			});

			// Isotope quick search
			var $quicksearch = $searchInput.keyup(debounce(function(){
					// Clear other filters
					$ourworkFilter.find('a').removeClass('active');
					$ourworkFilter.find('a').eq(0).addClass('active');

					qsRegex = new RegExp( $quicksearch.val(), 'gi' );
						$grid.isotope({
							filter: function() {
								return qsRegex ? $(this).text().match( qsRegex ) : true;
							}
						});

					// Display error msg if no results
					var numItems = $grid.children('.ourwork__grid__item:not(.isotope-hidden)').length,
						$searchMsg = $('#js-ourwork-searchmsg');

					if (numItems === 0) {
						$searchMsg.show();
					} else {
						$searchMsg.hide();
					}

					// Refresh dimensions
					setTimeout(function(){
						scrolling.refresh();
					}, 500);
				}));

			// Prevent Search form submission
			$('#js-ourwork-searchform').submit(function(event) {
				/* Act on the event */
				event.preventDefault();
			});

			$('#js__ourwork__search__btn').on('click', function() {
				$searchInput.toggleClass('ourwork__search__input--hidden');
			});

			// Append more on click load more
			var $loadMore = $('#js-ourwork-loadmore');


			$loadMore.on('click', function(e) {
				// Swap for loading ajax
				$loadMore.children('span')
				.html('<img src="dist/img/ourwork-loader.gif" alt="Loading" />')
				.addClass('ourwork__loadmore__loading');
				appendWorkItems.call(that);
				e.preventDefault();
			});

			// Bind Play video btn handler
			this.playVideos();
		},

		

		playVideos: function() {

			var $gridItems = $grid.children('.ourwork__grid__item');


			if (window.currentMQ === "L" || window.currentMQ === "M") {
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

			} else {
				// Load mobile videos in our work
				var $gridItemsMobile = $grid.find('.ourwork__grid__item__image'),
				n = 1;
			
				// Small Devices
				$gridItemsMobile.bind('click', function(){


					// Very slow logic --  Improve
					var $this = $(this),
						$thisParent = $this.parents('.ourwork__grid__item'),
						mobileImg = $this.children('.ourwork__grid__item__image__mobile').attr('src'),
						videoPath = $thisParent.find('.ourwork__grid__item__play').attr('href');

					// If touch Device open in new window
					if (window.isTouchDevice()) {
						window.location.href = videoPath;
					} else {
						
						

						if (!$this.hasClass('ourwork__grid__item__image--playing')) {

							
							console.log('Play Video');

							var $videoLayer = $('<div class="ourwork__videolayer--mobile" id="ourwork-videolayer-mobile-' + n + '"><div id="ourwork-videolayer-mobile-player-' + n + '"></div></div>');
								

							console.log(videoPath);

							$this.append($videoLayer);

							
							// Check if any active player and stop
							if (activeMobileVideo) {
								window.jwplayer(activeMobileVideo).stop();
							}


							window.jwplayer('ourwork-videolayer-mobile-player-' + n).setup({
								file: videoPath,
								width: '100%',
								height: '100%',
								autostart: true,
								'logo.hide': true,
								logo: {
									hide: true
								},
								image: mobileImg,
								flashplayer: 'dist/videos/jwplayer.flash.swf',
								"controls": {
									"hideLogo": true
								},
								controlbar: "over"
							});


							// Set active video
							activeMobileVideo = 'ourwork-videolayer-mobile-player-' + n;

							// Set as playing
							$this.addClass('ourwork__grid__item__image--playing');
						}
						n ++;
					}

					
				});
				this.gridReload("");
			}
			

			
			
		},



		rearrangeGrid: function(cwidth) {
			// Restart grid
			console.log("RESTART GRID");

			gridOptions.resizable = false;
			gridOptions.masonry.columnWidth = cwidth;
			

			
			$grid.isotope(gridOptions);
		},

		gridReload: function(filterValue) {
			$grid.imagesLoaded(function(){
				$grid.isotope({
					filter: filterValue,
					transitionDuration: '0.5s'
				});
			});
		},

		relayoutGrid: function(cwidth) {
			console.log("RESIZABLE GRID");
			gridOptions.masonry.columnWidth = cwidth;
			gridOptions.filter = '';
			$grid.imagesLoaded(function(){
				$grid.isotope(gridOptions);
			});
		},

		// Align and lazyload images if needed
		prepareWorkImages: function() {
			var $images = $(".ourwork__grid__item__image img");

			// Lazyload images
			console.log('Lazy Loading Images');

			$images.lazyload({
				effect : "fadeIn"
			});
			

			// Center one by one as they load
			$images.load(function() {
				// Center loaded image
				var $this = $(this);

				if ($this.attr('src').indexOf('blank') === -1) {
					centerWorkImage($this);
				}
				
			});
			imagesLazyLoaded = true;
			
			
		},
		// return var value
		imagesLazyLoaded: function() {
			return imagesLazyLoaded;
		}
	};

});
