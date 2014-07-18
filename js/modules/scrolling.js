/**
 * Module scrolling
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */

define(['jquery', 'skrollr'], function ($, skrollr) {

	// Strict mode to prevent sloppy JS
	'use strict';

	var $window,
		winH,
		$clientTransition,
		s;

	// Public API
	return {
		
		init: function() {
			$window = $(window);

			// Adjust client area height
			winH = $window.height();
			$clientTransition = $('#js-client-transitions-container');

			
			s = skrollr.init({forceHeight: false});
			$clientTransition.height(winH * 3.5);
			s.refresh($clientTransition);
		},

		destroy: function() {
			// Destroy skrollr
			$clientTransition = $('#js-client-transitions-container');
			$clientTransition.hide();

			if (s) {
				s.destroy();
			}

			// Reset all elements manually
			$('#js-homepage-section, #js-whatwedo-meteor, #js-whatwedo-section,#js-whatwedo-container, #js-whoweare-section, #js-ourwork-section').removeAttr('style');
			$('#js-ourwork-meteors, #js-whoweare-meteor-1, #js-whoweare-container, #js-client-wrapper, #js-client-section, #js-video, #js-client-transitions-container').removeAttr('style');
			

			console.log("Scrollr destroy");

			$('html').removeAttr('style');
		},

		refresh: function() {
			
			// Do not refresh if not the right mediaquery
			if (window.currentMQ === "L" || window.currentMQ === "M") {
				if (s) {
					// Sometimes timings go bananas
					try {
						s.refresh();
					} catch(error) {
						console.log("ERROR: " + error);
						this.init();
					}
					
				} else {
					this.init();
				}
			}
		},

		reinstate: function() {
			this.init();

			// Reinstate skrollr
			$clientTransition = $('#js-client-transitions-container');
			$clientTransition.show();
		},

		getSkrollrInstance: function() {
			return s;
		}
	};

});
