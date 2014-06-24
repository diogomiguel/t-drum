/**
 * Module video
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */
// Set default


define(['jquery', 'modules/ourwork', 'modules/nav', 'modules/scrolling', 'modules/rocks', 'modules/video', 'simpleStateManager'], function ($, ourwork, nav, scrolling, rocks, video, ssm) {

	// Strict mode to prevent sloppy JS
	'use strict';

	var documentHeight = 0,
		$doc = $(document),
		initScrolling = false;

	// Public API
	return {
		
		init: function() {
			documentHeight = $doc.height();

			var that = this,
				checkNavSections = function() {
					
					
					if (documentHeight !== $doc.height()) {
					
						// Set new break points for navigation when height of document changes
						nav.setSectionPositions();

						documentHeight = $doc.height();
					}
				},
				touchOnEnter = function() {
					video.setMobileVideoDimensions();
			        setTimeout(function(){
						ourwork.rearrangeGrid(1000);
					}, 500);
					ourwork.playVideos();

					// Destroy scrolling on enter
					scrolling.destroy();

					checkNavSections();
				},
				touchOnResize = function() {
					
					// On resize set new height for the main video
					video.setMobileVideoDimensions();

					// On resize re-arrange the our works grid
					setTimeout(function(){
						ourwork.rearrangeGrid(1000);
					}, 500);

					checkNavSections();
				},
				desktopOnEnter = function() {

					// If not initialized init scrolling here
					if (!initScrolling) {
						scrolling.init({
							smoothScrolling: false
						});
						initScrolling = true;
					}
					

					checkNavSections();
					ourwork.playVideos();

					// Every resize refreshes the parallax
					that.refreshParallax();
				},
				desktopOnResize = function() {
					// Every resize refreshes the parallax
					that.refreshParallax();
				};
			
			ssm.addState({
			    id: 'mobile',
			    maxWidth: 767,
			    onEnter: function() {
					window.currentMQ = 'XS';
					touchOnEnter();
					console.log('enter mobile');
			    },
			    onResize: function() {
					touchOnResize();
			    }
			});

			ssm.addState({
			    id: 'tabletS',
			    minWidth: 768,
			    maxWidth: 960,
			    onEnter: function() {
					window.currentMQ = 'S';
					touchOnEnter();
					console.log('enter S - tablet');
			    },
			    onResize: function() {
					touchOnResize();
			    }
			});

			ssm.addState({
			    id: 'desktopM',
				minWidth: 961,
			    maxWidth: 1132,
			    onEnter: function(){
					window.currentMQ = 'M';

					setTimeout(function(){
						ourwork.rearrangeGrid(236);
					}, 500);

					// Scrolling is destroyed for onTouch. When moving to desktop reinstante
					scrolling.reinstate();
					// Video is restored to what it should be
					video.setDesktopVideoDimensions();

					desktopOnEnter();
					
					console.log('enter M - desktop');
			    },
				onResize: function(){
					desktopOnResize();
				}
			});

			ssm.addState({
			    id: 'desktopL',
			    minWidth: 1133,
			    onEnter: function(){
					window.currentMQ = 'L';
					setTimeout(function(){
						ourwork.rearrangeGrid(282);
					}, 500);
					
					desktopOnEnter();

					console.log('enter L - desktop');
			    },
				onResize: function(){
					desktopOnResize();
				}
			});

			ssm.ready();
			
			
		},

		refreshParallax: function() {
			rocks.refresh();
			scrolling.refresh();
		}
	};

});