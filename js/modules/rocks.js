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
		whatWeHeight,
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

			whatWeHeight = 5000;


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
						x: sw - 370,
						y: 350, // 190
						velocity: 1.75
					}
				},
				//2
				{
					

					end: {
						x: sw - 464,
						y: whatWeHeight / 2.5,
						velocity: 1.5
					}
				},
				//3
				{

					end: {
						x: sw - 230,
						y: 393,
						velocity: 1
					}
				},
				//4
				{

					end: {
						x: 264,
						y: 250, // 50
						velocity: 2.25
					}
				},
				//5
				{

					end: {
						x: -180,
						y: 795,
						velocity: 1.75
					}
				},
				//6
				{
					

					end: {
						x: 100,
						y: 900,
						velocity: 1.25
					}
				},
				//7
				{

					end: {
						x: 40,
						y: 352,
						velocity: 1
					}
				},
				//8
				{
					
					end: {
						x: sw - 430,
						y: whatWeHeight / 2.5 - 476, // - 99,
						velocity: 1.25
					}
				},
				//9
				{
					

					end: {
						x: sw - 440,
						y: whatWeHeight / 2.5 - 428,
						velocity: 1.15
					}
				},
				//10
				{

					end: {
						x: sw - 610,
						y: 1072,
						velocity: 1.25
					}
				},
				//11
				{
					

					end: {
						x: 473,
						y: whatWeHeight / 2.5 - 555,
						velocity: 1
					}
				},
				//12
				{
					

					end: {
						x: 344,
						y: whatWeHeight / 2.5 + 1040,
						velocity: 1.75
					}
				}
			];

			var n = 0,
				$whatWeContainer = $('#js-whatwedo-container'),
				$whatWeBg = $('#js-whatwedo-bg');


		

			$rocks.each(function() {
				var $this = $(this),
				// assign data for skrollr
					frames = meteor1RocksKeyframes[n],
					endData = 'left[sqrt]:' + (frames.end.x) + 'px;top[swing]:' + (frames.end.y) + 'px;';


				$this.attr('data-0', endData);

				// Move rocks out of screen
				var posData = 'top:' + (frames.end.y - (sha * 5 )) + 'px;';
				
				

				switch (frames.end.velocity) {
					case 2.25:
						// Middle point data
						
						// Final pos
						$this.attr('data--5800-top', posData);
					break;
					case 2:
						// Middle point data
						
						// Final pos
						$this.attr('data--6400-top', posData);
					break;
					case 1.75:

						// Final pos
						$this.attr('data--7400-top', posData);
					break;
					case 1.5:

						// Final pos
						$this.attr('data--8400-top', posData);
					break;
					case 1.25:

						// Final pos
						$this.attr('data--10400-top', posData);
					break;
					case 1.15:

						// Final pos
						$this.attr('data--11400-top', posData);
					break;
					case 1:

						// Final pos
						$this.attr('data--12400-top', posData);
					break;
				}
				


				n++;
			});

			// Meteor animation control
			$meteor.attr('data-0', 'top[outCubic]:' + (sh) + 'px;display:!block;');
			$meteor.attr('data-top-bottom', 'top:' + (scv - 200) + 'px;display:!none;');
			

			// Text Container
			var whatWeHalfHeight = Math.round($whatWeContainer.height() / 2);

			$whatWeContainer.attr('data-0', 'top:' + (sh ) + 'px;position:!fixed;display:!block;');
			$whatWeContainer.attr('data--200-top-bottom', 'top:' +  (-whatWeHalfHeight * 2) + 'px;margin-top:0px;display:!none;');
			
			// Set the what we do section behaviour
			var $whatWeSection = $('#js-whatwedo-section');

			$whatWeSection.attr('data-0', 'visibility:!visible;');
			$whatWeSection.height(whatWeHeight);


			// Address bg what we do situation
			$whatWeBg.height(sh);
			$whatWeBg.css('position', 'fixed');
			$whatWeBg.attr('data-0', 'top:' + sh + 'px;');
			$whatWeBg.attr('data-' + Math.round(sh + sh), 'top:0px;');
			$whatWeBg.attr('data-' + (whatWeHeight), 'top:0px');
			$whatWeBg.attr('data-' + (whatWeHeight + sh), 'top:-' + sh + 'px');

			// Hide home panel after bg reaches top + 100px
			$('#js-homepage-section').attr('data-' + Math.round(sh + sh + 100), 'visibility:!hidden;');

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
			


			// Individual meteors in our work area (non relative values to prevent flicking)
			var $ourworkMeteor1 = $('#js-ourwork-meteor-1'),
				$ourworkMeteor2 = $('#js-ourwork-meteor-2'),
				$ourworkMeteor3 = $('#js-ourwork-meteor-3'),
				ourworkMeteor1Keyframes = {
					start: 560,
					end: -570
				},
				ourworkMeteor2Keyframes = {
					start: 500,
					end: -300
				},
				ourworkMeteor3Keyframes = {
					start: 510,
					end: -410
				},
				startOurWorkMeteors = whatWeHeight,
				// assume up to 4 pages to save some processing and time
				endOurWorkMeteors = startOurWorkMeteors + Math.round($('#js-ourwork-section').innerHeight() * 4);


			// Starting point
			$ourworkMeteor1.attr('data-' + startOurWorkMeteors, 'transform:translate(0,' + ourworkMeteor1Keyframes.start + 'px);');
			$ourworkMeteor2.attr('data-' + startOurWorkMeteors, 'transform:translate(0,' + ourworkMeteor2Keyframes.start + 'px);');
			$ourworkMeteor3.attr('data-' + startOurWorkMeteors, 'transform:translate(0,' + ourworkMeteor3Keyframes.start + 'px);');

			// End point => assume up to 4 pages to save some processing and time
			$ourworkMeteor1.attr('data-' + endOurWorkMeteors, 'transform:translate(0,' + ourworkMeteor1Keyframes.end * 4 + 'px);');
			$ourworkMeteor2.attr('data-' + endOurWorkMeteors, 'transform:translate(0,' + ourworkMeteor2Keyframes.end * 4 + 'px);');
			$ourworkMeteor3.attr('data-' + endOurWorkMeteors, 'transform:translate(0,' + ourworkMeteor3Keyframes.end * 4 + 'px);');


			// Meteors wrapper
			var $meteors = $('#js-ourwork-meteors');

			$meteors.attr('data-0', 'transform:translate(0, 100px);position:!absolute;display:!block;');
			$meteors.attr('data-' + startOurWorkMeteors, 'transform:translate(0, 100px);position:!fixed;display:!block;');
			
			$meteors.attr('data-' + endOurWorkMeteors, 'transform:translate(0,' + 50 * 4 + 'px);display:!none;');
			$meteors.attr('data-top-bottom', 'display:!none;');
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
