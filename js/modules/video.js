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
			$audiobtn.click();


			
			//$video.fitVids();
			
			
		},

		setMobileVideoAttributes: function() {
			var that = this;

			if (typeof $video !== "object") {
				// Redefining $video
				$video = document.getElementById('js-video');

			}

			$video.setAttribute('poster', 'dist/img/video-mobile-poster.png');
			$video.addEventListener('click', function(){
				that.togglePlay();
			});
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


		setVideoContainerMinHeight: function() {
			var $homeSection = $('#js-homepage-section'),
				$win         = $(window);

			var winHeight = $win.height();

			$homeSection.css('min-height', winHeight);

			// Remove mobile configurations
			$($video).attr('style', '');
		},

		setMobileVideoHeight: function() {
			// Because mobile is rubbish addressing this

			var $win = $(window),
				winWidth = $win.width(),
				newHeight = Math.round(winWidth * 0.5625);

			$($video).width(winWidth);
			$($video).height(newHeight);

		}

		
	};

});
