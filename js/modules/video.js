/**
 * Module video
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */

define(['jquery'], function ($) {

	// Strict mode to prevent sloppy JS
	'use strict';

	var $video,
		$playbtn,
		$audiobtn;

	// Public API
	return {
		
		init: function() {
			$video		= document.getElementById('js-video');
			$playbtn	= $('#js-video-play');
			$audiobtn	= $('#js-video-audio');

			// Bind Video Api Controls to it's buttons
			$playbtn.on('click', this.togglePlay);

			$audiobtn.on('click', this.toggleAudio);

			// Make Home area 100% toggleAudio accomodate full size video
			var $homeSection = $('#js-homepage-section'),
				$win         = $(window);

			$win.resize(function(){
				var winHeight = $win.height();

				$homeSection.css('min-height', winHeight);
			});

			$win.resize();

			
			
			
			
		},

		setAttributes: function() {
			$video.setAttribute('autoplay', 'autoplay');
			// Load poster for mobile
			if (window.isTouchDevice()) {
				$video.setAttribute('poster','dist/img/mobile/video-bg.jpg');
				$video.setAttribute('controls', 'controls');
			}
		},

		togglePlay: function() {
			$playbtn.toggleClass('homepage__video__play--paused');
			if ($video.paused) {
				$video.play();
			} else {
				$video.pause();
			}
		},

		toggleAudio: function() {
			$audiobtn.toggleClass('homepage__video__audio--muted');
			if ($video.muted) {
				$video.muted = false;
			} else {
				$video.muted = true;
			}
		},

		disableControls: function() {
			// To prevent menu overlay in mobile bug
			$video.style.visibility = 'hidden';
		},

		enableControls: function() {
			$video.style.visibility = 'visible';
		},

		setMobileVideoDimensions: function() {
			console.log(this.isTouchDevice);
			if (window.isTouchDevice()) {
				$('#js-video').css('height', Math.round($(window).width() * 0.5625));
			}
		},

		setDesktopVideoDimensions: function() {
			$('#js-video').css('height', 'auto');
		}

		
	};

});
