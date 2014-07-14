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


			// Dimension amends\
			var newMeteorLft;

			if (sw > 1350) {
				newMeteorLft = (sw - 1350) / 2;
				sw = 1350;
				$meteor.css('left', newMeteorLft);
			} else if (sw < 1280) {
				newMeteorLft = (sw - 1280) / 2;
				sw = 1280;
				$meteor.css('left', newMeteorLft);
			}

			// Create the keyframes
			meteor1RocksKeyframes = [
				//1
				{

					end: {
						x: sw - 362,
						y: -100,
						rotation: 0,
						velocity: 1.5
					}
				},
				//2
				{
					

					end: {
						x: -290,
						y: scva - 150,
						rotation: 0,
						velocity: 1.25
					}
				},
				//3
				{

					end: {
						x: -300,
						y: -160,
						rotation: 0,
						velocity: 1.25
					}
				},
				//4
				{

					end: {
						x: sw - 195,
						y: 0,
						rotation: 0,
						velocity: 1
					}
				},
				//5
				{

					end: {
						x: -210,
						y: sha - 452,
						rotation: 240,
						velocity: 1
					}
				},
				//6
				{
					

					end: {
						x: 29,
						y: scva + 410,
						scale: 1,
						velocity: 2
					}
				},
				//7
				{

					end: {
						x: -270,
						y: 63,
						scale: 1,
						velocity: 1.75
					}
				},
				//8
				{
					
					end: {
						x: sw - 426,
						y: sha - 142,
						rotation: 92,
						velocity: 1.75
					}
				},
				//9
				{
					

					end: {
						x: sw - 294,
						y: sha - 556,
						rotation: -15,
						velocity: 1
					}
				},
				//10
				{

					end: {
						x: sw - 662,
						y: sha - 372,
						rotation: 0,
						velocity: 1.25
					}
				},
				//11
				{
					

					end: {
						x: sw - 124,
						y: scva - 230,
						rotation: -12,
						scale: 1,
						velocity: 1.75
					}
				},
				//12
				{
					

					end: {
						x: sw - 86,
						y: scva + 80,
						rotation: -12,
						scale: 1,
						velocity: 2
					}
				},

				// 13
				{
					end: {
						x: 60,
						y: 160,
						scale: 1,
						rotation: -20,
						velocity: 2
					}
				},
				//15
				{
					

					end: {
						x: sw - 200,
						y: -38,
						rotation: -22,
						scale: 1,
						velocity: 2
					}
				},
				//16
				{
					

					end: {
						x: sw - 326,
						y: sha,
						rotation: -22,
						scale: 1,
						velocity: 2
					}
				}
			];

			var n = 0,
				$whatWeContainer = $('#js-whatwedo-container');


		

			$rocks.each(function() {
				var $this = $(this),
				// assign data for skrollr
					frames = meteor1RocksKeyframes[n],
					endData = 'left[sqrt]:' + (frames.end.x) + 'px;top[swing]:' + (frames.end.y) + 'px;';

				// End position
				endData += "transform[swing]:";

				if (frames.end.rotation) {
					// has rotation parameter
					endData += 'rotate(' + frames.end.rotation + 'deg)';
				} else {
					// doesn't have rotation parameter
					endData += 'rotate(0deg)';
				}
				
				

				$this.attr('data-0', endData);

				// Move rocks out of screen
				var posData = 'top:' + (frames.end.y - (sha * 2.6 )) + 'px;';
				
				

				switch (frames.end.velocity) {
					case 2:
						// Middle point data
						
						// Final pos
						$this.attr('data--6400-top', posData);
					break;
					case 1.75:

						// Final pos
						$this.attr('data--7600-top', posData);
					break;
					case 1.5:

						// Final pos
						$this.attr('data--8200-top', posData);
					break;
					case 1.25:

						// Final pos
						$this.attr('data--9000-top', posData);
					break;
					case 1:

						// Final pos
						$this.attr('data--9600-top', posData);
					break;
				}
				


				n++;
			});

			// Meteor animation control
			$meteor.attr('data-0', 'top[outCubic]:' + (sh + 200) + 'px;display:!block;');
			$meteor.attr('data-top-bottom', 'top:' + (scv + 200) + 'px;display:!none;');
			

			// Text Container
			var whatWeHalfHeight = Math.round($whatWeContainer.height() / 2);

			$whatWeContainer.attr('data-0', 'top:' + (sh ) + 'px;position:!fixed;display:!block;');
			$whatWeContainer.attr('data--200-top-bottom', 'top:' +  (-whatWeHalfHeight * 2) + 'px;margin-top:0px;display:!none;');
			
			// Set the what we do section behaviour
			var $whatWeSection = $('#js-whatwedo-section');

			$whatWeSection.attr('data-0', 'visibility:!visible;');
			$whatWeSection.height(5000);
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
			var $rockLeft = $('#js-client-transition-slide1__image-left'),
				nsw = $window.width(),
				nsh = $window.height();
			
			// Aspect ratio second rock == 1.32
			var rockLeftNewWper = Math.round(nsh * 1.32 / nsw * 100);

			if (rockLeftNewWper > 105) {
				$rockLeft.width(rockLeftNewWper + '%');
			} else {
				$rockLeft.width('105%');
			}


			// Second rock
			var $rockRight = $('#js-client-transition-slide1__image-right');
			
			// Aspect ratio second rock == 1.592
			var rockRightNewWper = Math.round(nsh * 1.592 / nsw * 100);

			if (rockRightNewWper > 100) {
				$rockRight.width(rockRightNewWper + '%');
			} else {
				$rockRight.width('100%');
			}
			
			
		}
	};

});
