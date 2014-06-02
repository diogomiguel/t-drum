/**
 * Module video
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */

define(['jquery', 'modules/ourwork', 'modules/nav', 'modules/scrolling', 'modules/rocks'], function ($, ourwork, nav, scrolling, rocks) {

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
			/* Check what's current media. 
				If different than past one, execute changes. */
			window.mqSync();

			// Call based on viewport width change
			if ($win.width() !== windowWidth) {
				windowWidth = $win.width();

				if (window.currentMQ === "S" || window.currentMQ === "XS") {
					ourwork.relayoutGrid(1000);
				} else {
					// Refresh parallax positionings
					rocks.refresh();
					scrolling.refresh();
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

				switch (window.currentMQ) {
					case 'L':
					case 'M':
						// Case desktops

						if (pastMQ === "S" || pastMQ === "XS") {
							scrolling.reinstate();
						}

						if (window.currentMQ === "L") {
							ourwork.rearrangeGrid(282);
						} else {
							ourwork.rearrangeGrid(236);
						}
						
						ourwork.destroyMobileVideoInstances();
					break;
					case 'S':
					case 'XS':
						// Case devices
						if (pastMQ === "M" || pastMQ === "L") {
							scrolling.destroy();
						}
					break;
				}
				pastMQ = window.currentMQ;
			}
		}
	};

});