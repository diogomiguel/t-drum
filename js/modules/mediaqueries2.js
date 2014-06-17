/**
 * Module video
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */

define(['jquery', 'modules/ourwork', 'modules/nav', 'modules/scrolling', 'modules/rocks2', 'modules/video'], function ($, ourwork, nav, scrolling, rocks, video) {

	// Strict mode to prevent sloppy JS
	'use strict';

	var pastMQ = '',
		scrollIntervalID = 0,
		windowWidth = 0,
		windowHeight = 0,
		documentHeight = 0,
		$win = $(window),
		$doc = $(document);

	// Public API
	return {
		
		init: function() {
			var that = this;

			// Start tracking media queries changes
			scrollIntervalID = setInterval(function(){
				that.checkQueries.call(that);
			}, 100);
			
			windowWidth = $win.width();
			windowHeight = $win.height();
			documentHeight = $doc.height();


		},

		checkQueries: function() {
			var that = this;
			/* Check what's current media. 
				If different than past one, execute changes. */
			window.mqSync();

		
			// Call based on viewport width change
			if ($win.width() !== windowWidth) {
				windowWidth = $win.width();
				that.refreshParallax();
				if (window.currentMQ === "S" || window.currentMQ === "XS") {
					ourwork.rearrangeGrid(1000);
					video.setMobileVideoDimensions();
				}
			}


			// Call based on document height change
			if ($doc.height() !== documentHeight) {
				documentHeight = $doc.height();

				nav.setSectionPositions();
			}
			if ($win.height() !== windowHeight) {
				windowHeight = $win.height();

				// Refresh parallax positionings
				if (window.currentMQ === "L" || window.currentMQ === "M") {
					rocks.refresh();
					scrolling.refresh();
				}
			}
			

			// Call if query changed == faster!!
			if (window.currentMQ !== pastMQ) {

				// Change Grid with timeout to prevent styling hazard
				setTimeout(function(){
					
					if (window.currentMQ === "S" || window.currentMQ === "XS") {

						ourwork.rearrangeGrid(1000);
					} else if(window.currentMQ === "L") {
						ourwork.rearrangeGrid(282);
						that.refreshParallax();
					} else {
						ourwork.rearrangeGrid(236);
						that.refreshParallax();
					}
				}, 500);

				switch (window.currentMQ) {
					case 'L':
					case 'M':
						// Case desktops
						if (pastMQ === "S" || pastMQ === "XS") {
							scrolling.reinstate();
							video.setDesktopVideoDimensions();
						}

					break;
					case 'S':
					case 'XS':
						// Case devices
						if (pastMQ === "M" || pastMQ === "L") {
							scrolling.destroy();

						}
					break;
				}
				ourwork.playVideos();
				pastMQ = window.currentMQ;
			}
		},

		refreshParallax: function() {
			if (window.currentMQ === "L" || window.currentMQ === "M") {
				rocks.refresh();
				scrolling.refresh();
			}
		}
	};

});