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

			// Make Home area 100% to accomodate full size video
			var $homeSection = $('#js-homepage-section'),
				$win         = $(window);

			$win.resize(function(){
				var winHeight = $win.height();

				$homeSection.css('min-height', winHeight);
			});

			$win.resize();

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
		}
	};

});
