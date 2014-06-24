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


	// Set JWPlayer key
	window.jwplayer.key = "fu2u0kgoWvXIFOm4Iiq7xsU3LJRLkDIfHE8ZKQ==";

	// Set Current Mediaquery
	window.currentMQ = "unknown";
	
	video.init();
	ourwork.init();
	
	// Lazyload all images
	

	// hold ready == start only when window loaded

	jQuery.holdReady(true);

	

	var $window = $(window);

	$window.load(function() {
		jQuery.holdReady(false);
	});

	if (!window.isTouchDevice()) {
		rocks.init();
	}
	

	nav.init();

	mediaqueries.init();
	
	
	

	if (window.currentMQ === "S" || window.currentMQ === "XS") {
		video.setMobileVideoDimensions();
	}
});
