	/**
 * Module rocks
 *
 * @author Diogo Silva
 * @date 2014-5-28
 */

define(['jquery'], function ($) {

	// Strict mode to prevent sloppy JS
	'use strict';

	var $window = $(window),
		sch,
		sw,
		scv,
		scva,
		sh,
		sha,
		meteor1RocksKeyframes = [];


	// Public API
	return {
		
		init: function() {
			
			// Setup variables
			sw = $window.width();
			sch = sw / 2;
			sh = $window.height();
			// amended for keyframes
			sha = sh < 900 ? 900 : sh;
			scv = sh / 2;
			// amended for keyframes
			scva = sha / 2;

			// Calculate scroll more label position if window height is too small
			var $scrollMore = $('#js-scrollmore'),
				$homepageLogo = $('#js-homepage__logo');
			if (sh < 700 && sh >= 550) {
				$homepageLogo.css('top', '47.5%');
				$scrollMore.css('bottom', '20px');
			} else if (sh < 550) {
				$scrollMore.css('bottom', '8px');
				$homepageLogo.css('top', '45%');
			} else {
				$scrollMore.css('bottom', '68px');
				$homepageLogo.css('top', '50%');
			}

			// What we do parallax
			this._whatwedo();
			
			// Who we are parallax
			this._whoweare();

			// Our work parallax
			this._ourwork();

			// Client area rocks size
			this._client();
		},

		refresh: function() {
			console.log('refresh');
			// Call when dimensions change
			this.init();
		},

		_whatwedo: function() {
			// Place rocks dynamically
			var $meteor	= $('#js-whatwedo-meteor'),
				$rocks	= $meteor.children('.whatwedo__meteor__rock');

			// Create the keyframes
			meteor1RocksKeyframes = [
				{
					start: {
						x: sch - 84,
						y: 271
					},

					middle: {
						x: sch + 75,
						y: 3,
						rotation: 6,
						z: 8
					},

					end: {
						x: sch + 212,
						y: -100,
						rotation: 15,
						scale: 1.5,
						velocity: 1.75
					},

					finish: {
						x: sch + 412,
						y: -300
					}
				},
				{
					start: {
						x: sch - 413,
						y: 428,
						scale: 1
					},

					middle: {
						x: sch - 488,
						y: 371,
						z: 6,
						scale: 1
					},

					end: {
						x: sch - 650,
						y: scva + 5,
						rotation: -6,
						scale: 1,
						velocity: 1.25
					}
				},
				{
					start: {
						x: sch - 331,
						y: 212
					},

					middle: {
						x: sch - 625,
						y: 57,
						rotation: 10,
						z: 5
					},

					end: {
						x: 0,
						y: -160,
						rotation: 23,
						velocity: 1.5
					}
				},
				{
					start: {
						x: sch + 21,
						y: 482
					},

					middle: {
						x: sch + 191,
						y: 387,
						rotation: -7,
						z: 3
					},

					end: {
						x: sw - 195,
						y: scva - 276,
						rotation: 15,
						velocity: 1.25
					}
				},
				{
					start: {
						x: sch - 106,
						y: 576
					},

					middle: {
						x: sch - 610,
						y: 583,
						rotation: 102,
						z: 2
					},

					end: {
						x: -40,
						y: sha - 152,
						rotation: 220,
						velocity: 1.5
					}
				},
				{
					start: {
						x: sch - 158,
						y: 538
					},

					middle: {
						x: sch - 337,
						y: 665,
						z: 9,
						scale: 0.5
					},

					end: {
						x: 29,
						y: scva + 210,
						scale: 1,
						velocity: 1.75
					}
				},
				{
					start: {
						x: sch - 294,
						y: 340,
						scale: 0.5
					},

					middle: {
						x: sch - 424,
						y: 412,
						z: 7,
						scale: 0.5
					},

					end: {
						x: -220,
						y: 63,
						scale: 1,
						velocity: 1.75
					}
				},
				{
					start: {
						x: sch - 230,
						y: 467
					},

					middle: {
						x: sch + 309,
						y: 606,
						rotation: 70,
						z: 4
					},

					end: {
						x: sw - 386,
						y: sha - 142,
						rotation: 92,
						velocity: 2
					}
				},
				{
					start: {
						x: sch - 373,
						y: 646
					},

					middle: {
						x: sch - 185,
						y: 693,
						rotation: 15,
						z: 1
					},

					end: {
						x: sw - 794,
						y: sha - 306,
						rotation: -15,
						velocity: 1.75
					}
				},
				{
					start: {
						x: sch - 46,
						y: 467
					},

					middle: {
						x: sch + 219,
						y: 689,
						rotation: 18,
						z: 0
					},

					end: {
						x: sw - 462,
						y: sha - 172,
						rotation: -15,
						velocity: 1.25
					}
				},
				{
					start: {
						x: sch + 187,
						y: 561
					},

					middle: {
						x: sch + 117,
						y: 561,
						z: 11,
						scale: 0.5
					},

					end: {
						x: sw - 174,
						y: scva + 130,
						rotation: -12,
						scale: 1,
						velocity: 2
					}
				},
				{
					start: {
						x: sch + 279,
						y: 480
					},

					middle: {
						x: sch + 262,
						y: 511,
						z: 10,
						scale: 0.5
					},

					end: {
						x: sw - 86,
						y: scva + 80,
						rotation: -12,
						scale: 1,
						velocity: 2
					}
				},

				// EXTRAS
				{
					start: {
						x: sch - 158,
						y: 538
					},

					middle: {
						x: sch - 337,
						y: 665,
						z: 9,
						scale: 0.5
					},

					end: {
						x: sch - 600,
						y: -60,
						scale: 1,
						rotation: -20,
						velocity: 1.75
					}
				},
				{
					start: {
						x: sch + 187,
						y: 561
					},

					middle: {
						x: sch + 117,
						y: 461,
						z: 11,
						scale: 0.5
					},

					end: {
						x: sw - 100,
						y: -38,
						rotation: -22,
						scale: 1.5,
						velocity: 2
					}
				}
			];

			var n = 0,
				finalScale = 1.1,
				$whatWeContainer = $('#js-whatwedo-container');


			// Second rock is problematic when screen is too small
			if (sw <= 1450) {
				finalScale = 1;
				if (sw <= 1075) {
					meteor1RocksKeyframes[1].end.scale = 0.8;
					meteor1RocksKeyframes[1].end.x = -60;
				} else {
					meteor1RocksKeyframes[1].end.scale = 0.9;
					meteor1RocksKeyframes[1].end.x = 0;
				}
				
			} else {
				meteor1RocksKeyframes[1].end.scale = 1.1;
			}

			if (sh <= 900) {
				finalScale = 1;

				// Push content up
				$whatWeContainer.find('h2').css('top', '2.84em');
				$whatWeContainer.find('.whatwedo__content').css('top', '26.875em');

				// Make minimum height 960

			}

			$rocks.each(function() {
				var $this = $(this),
				// assign data for skrollr
					frames = meteor1RocksKeyframes[n],
					startData = 'left:' + (frames.start.x) + 'px;top:' + (frames.start.y) + 'px;z-index:!' + ($rocks.length - n) + ';',
					middleData = 'left[sqrt]: ' + (frames.middle.x) + 'px;top[sqrt]:' + (frames.middle.y) + 'px;z-index:!' + frames.middle.z + ';',
					endData = 'left[sqrt]:' + (frames.end.x) + 'px;top[sqrt]:' + (frames.end.y) + 'px;';


				// Start position
				if (frames.start.scale) {
					startData += 'transform:rotate(0deg) scale(' + frames.start.scale + ');';
				} else {
					startData += 'transform:rotate(0deg) scale(1);';
				}
				
				$this.attr('data-0', startData);
				$this.attr('data-top', startData);

				// Middle position
				middleData += "transform[sqrt]:";

				if (frames.middle.rotation) {
					// has rotation parameter
					middleData += 'rotate('  + frames.middle.rotation +  'deg)';
				} else {
					// doesn't have rotation parameter
					middleData += 'rotate(0deg)';
				}

				if (frames.middle.scale) {
					middleData += ' scale(' + frames.middle.scale + ');';
				} else {
					middleData += ' scale(1);';
				}
				
				$this.attr('data--200-top', middleData);

				// End position
				endData += "transform[sqrt]:";

				if (frames.end.rotation) {
					// has rotation parameter
					endData += 'rotate(' + frames.end.rotation + 'deg)';
				} else {
					// doesn't have rotation parameter
					endData += 'rotate(0deg)';
				}

				if (frames.end.scale) {
					// has scale parameter
					endData += ' scale(' + frames.end.scale + ')';
				} else {
					// doesn't have rotation parameter
					endData += ' scale(' + finalScale + ')';
				}
				
				$this.attr('data--800-top', endData);
				$this.attr('data--900-top', 'top[swing]:' + frames.end.y + 'px;');

				// Move rocks out of screen
				var posData = 'top[swing]:' + (frames.end.y - (sha + $this.height())) + 'px;';
				
				

				switch (frames.end.velocity) {
					case 2:
						// Middle point data
						
						// Final pos
						$this.attr('data--2400-top', posData);
					break;
					case 1.75:

						// Final pos
						$this.attr('data--3000-top', posData);
					break;
					case 1.5:

						// Final pos
						$this.attr('data--3600-top', posData);
					break;
					case 1.25:

						// Final pos
						$this.attr('data--4000-top', posData);
					break;
				}
				


				n++;
			});

			// Meteor animation control
			$meteor.attr('data-bottom-top', 'top:' + (sh + 1100) + 'px;display:!block;');
			$meteor.attr('data-top', 'top:0px;display:!block;');
			$meteor.attr('data-top-center', 'top:0;display:!block;');
			$meteor.attr('data-top-bottom', 'display:!none;');
			

			// Text Container
			
			$whatWeContainer.attr('data-200-top', "top:" + sh + "px;position:!fixed;display:!block;");
			
			$whatWeContainer.attr('data--3100-top', "top:-650px;");
			$whatWeContainer.attr('data--3400-top', "top:" + -(sh + 200) + "px;");
			$whatWeContainer.attr('data--500-top-bottom', "top:" + -(sh + 200) + "px;display:!none;");

			// Set the what we do section behaviour 
			$('#js-whatwedo-section').height(3400);
		},
		_whoweare: function() {
			var $biosContainer = $('#js-whoweare-container'),
				$rock1 = $('#js-whoweare-meteor-1');

			$biosContainer.attr('data-0', 'top:0;position:!absolute;');
			$biosContainer.attr('data-bottom-top', 'top:' + (sh * 1.5) + 'px;position:!fixed;display:!block;');
			$biosContainer.attr('data-top-bottom', 'top:' +  (-sha - 900) + 'px;display:!none;');

			/*
			$rock1.attr('data-0', 'top:0px;position:!absolute;');
			$rock1.attr('data-300-center-top', 'top:' + (sh + 300) + 'px;position:!fixed;display:!block;' );
			$rock1.attr('data-top-bottom', 'top:' + -(sh - 300) + 'px;display:!none;' );
			*/
			$rock1.attr('data-0', 'top:' + (sh + 300) + 'px;position:!fixed;display:!none;');
			$rock1.attr('data-bottom-top', 'top:' + (sh + 100) + 'px;display:!block;' );
			$rock1.attr('data-center-top', 'top:' + (sh - 200) + 'px;display:!block;' );
			
			$rock1.attr('data-top-bottom', 'top:' + -($rock1.height() + 100) + 'px;display:!none;' );

			$('#js-whoweare-section').height(sh);
		},

		_ourwork: function() {
			var $meteors = $('#js-ourwork-meteors');

			$meteors.attr('data-0', 'top:0px;position:!absolute;display:!block;');
			$meteors.attr('data-bottom-top', 'transform:translate(0, -100px);position:!fixed;');
			$meteors.attr('data-top-bottom', 'transform:translate(0,50px);display:!none;');
		},

		_client: function() {
			

			// Check if rocks height is less than screen size

			// Second rock
			var $rockLeft = $('#js-client-transition-slide1__image-left');
			
			// Aspect ratio second rock == 1.32
			var rockLeftNewWper = Math.round(sh * 1.32 / sw * 100);

			if (rockLeftNewWper > 105) {
				$rockLeft.width(rockLeftNewWper + '%');
			} else {
				$rockLeft.width('105%');
			}


			// Second rock
			var $rockRight = $('#js-client-transition-slide1__image-right');
			
			// Aspect ratio second rock == 1.592
			var rockRightNewWper = Math.round(sh * 1.592 / sw * 100);

			if (rockRightNewWper > 100) {
				$rockRight.width(rockRightNewWper + '%');
			} else {
				$rockRight.width('100%');
			}
			
			
		}
	};

});
