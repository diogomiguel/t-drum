/**
 * Module Description
 *
 * @author Author Name
 * @date 2013-01-01
 */

require([
	// Require the modules
	'modules/video',
	'modules/ourwork',
	'modules/nav',
	'modules/scrolling',
	'modules/mediaqueries',
	'modules/rocks'
], function (video, ourwork, nav, scrolling, mediaqueries, rocks) {
	'use strict';

	video.init();

	ourwork.init();

	// hold ready == start only when window loaded

	jQuery.holdReady(true);

	

	var $window = $(window);

	$window.load(function() {
		jQuery.holdReady(false);
	});

	
	rocks.init();

	if (window.currentMQ === "L" || window.currentMQ === "M") {
		scrolling.init({
			smoothScrolling: false
		});
	}
	
	mediaqueries.init();
	
	nav.init();
});
