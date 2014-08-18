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
	'modules/mediaqueries',
	'jwplayer'
	
], function (video, ourwork, nav, mediaqueries, jwplayer) {
	'use strict';


	// Set JWPlayer key
	jwplayer.key = "fu2u0kgoWvXIFOm4Iiq7xsU3LJRLkDIfHE8ZKQ==";

	// Set Current Mediaquery
	window.currentMQ = "unknown";
	
	video.init();
	
	

	// hold ready == start only when window loaded

	jQuery.holdReady(true);

	

	var $window = $(window);

	$window.load(function() {
		jQuery.holdReady(false);
	});
	

	nav.init();

	// Start ourwork
	ourwork.init();

	// Loading Complete = fade out loader
	var $loadingSection = $('#js-loading-section');
	$loadingSection.fadeOut(800, function(){
		$loadingSection.hide();
		$('html').removeAttr('style');
	});

	

	// SSM MANAGER INIT
	mediaqueries.init();


});
