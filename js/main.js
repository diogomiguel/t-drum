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
	'modules/mediaqueries'
	
], function (video, ourwork, nav, mediaqueries) {
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
	

	nav.init();

	

	// Loading Complete = fade out loader
	var $loadingSection = $('#js-loading-section');
	$loadingSection.fadeOut(800, function(){
		$loadingSection.hide();
		$('html').removeAttr('style');
	});

	// SSM MANAGER INIT
	mediaqueries.init();
});
