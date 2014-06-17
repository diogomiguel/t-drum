/**
 * Module nav
 *
 * @author Diogo Silva
 * @date 2014-5-19
 */

define(['jquery', 'modules/video', 'modules/scrolling', 'lazyload'], function ($, video, scrolling) {

	// Strict mode to prevent sloppy JS
	'use strict';
	
	var $window,
		scrollIntervalID = 0,
		currentSection = null,
		scrollTop = 0,
		prevKeyFrame = 0,
		nextKeyFrame = 0,
		sectionElems = [],
		imagesLazyLoaded = false,
		$mainNav,
		$navParent,
		$mainNavLinks;

	// Public API
	return {
		
		init: function() {
			var that = this;

			$mainNav		= $('#js-mainnav-nav');
			$navParent		= $('#js-mainnav');
			$mainNavLinks	= $mainNav.find('li a');

			// On window load calculations
			$window = $(window);
			that.scrollSetup.call(that);


			// On mobile icon click
			var $navMobileBtn = $('#js-mainnav-mobile-btn');

			$navMobileBtn.on('click', function() {
				if (window.currentMQ === "S" || window.currentMQ === "XS") {
					var $this = $(this);
					console.log("CLICK MOBILE NAV");
					// Active
					if ($this.hasClass('mainnav__mobile__btn--active')) {
						$navParent.children('nav').removeClass('active');
						$this.removeClass('mainnav__mobile__btn--active');
						video.enableControls();
					} else {
						$navParent.children('nav').addClass('active');
						$this.addClass('mainnav__mobile__btn--active');
						setTimeout(function(){video.disableControls();},500);
					}
				}
				
				
			});

			

		},

		scrollSetup: function() {
			console.log('Kick Menu Control');
			var that = this;

			// Bind click
			this.menuNavigate();

			this.setSectionPositions();

			// Instead of attaching to scroll event which is slow as hell. We use a timeout to 
			//check when the position of the page changed.
			
			scrollIntervalID = setInterval(function(){
				that.controlMenu.call(that);
			}, 10);
			that.controlMenu.call(that);
		},

		setSectionPositions: function() {
			// Check the key points for each section
			var $sections = $('body').children('section'),
				n = 0,
				that = this;

			scrollTop = $window.scrollTop();

			sectionElems = [];

			$sections.each(function() {
				var sectionData = {},
					$this		= $(this);

				if (n === 0) {
					sectionData.keystart	= 0;
				} else {
					// Client Area
					sectionData.keystart	= Math.round($this.offset().top)  - $navParent.height();
					
				}
				
				sectionData.keyend		= sectionData.keystart + Math.round($this.innerHeight()) ;
				sectionData.element		= $this.attr('id');

				sectionElems.push(sectionData);

				// Get the current section
				if (scrollTop >= sectionData.keystart && scrollTop <= sectionData.keyend) {
					currentSection = n;
					that.setMenuActive();
				}
				
				n++;
			});

			var sectionDataLast = sectionElems[sectionElems.length - 1];
			// Add Client Area
			sectionElems.push({
				keystart: sectionDataLast.keyend,
				keyend: 10000000,
				element: 'js-client-section'
			});
			$('#js-mainnav-nav-clientarea').attr('data-menu-top', $('body').height());
		},

		controlMenu: function() {
			// Control menu state with scrolling and values only == faster
			scrollTop = $window.scrollTop();
			var scrollBottom = $(document).height() - $window.height() - scrollTop;

			

			if (scrollBottom === 0) {
				// Because sometimes client area is not big enough to trigger it's key start
				currentSection = sectionElems.length - 1;
				this.setMenuActive();
			} else if (scrollTop > nextKeyFrame) {
				currentSection++;
				this.setMenuActive();
			} else if (scrollTop < prevKeyFrame && currentSection > 0) {
				currentSection--;
				this.setMenuActive();
			}
		},

		setMenuActive: function() {
			// Set control key frame values
			var curSectionData	= sectionElems[currentSection] || {},
				$video			= document.getElementById('js-video');
			
			// Toggle menu
			if (typeof curSectionData !== "undefined") {

				if (currentSection > 0) {
					// Show menu if not in showreel
					$navParent.addClass('mainnav--active');
					// Pause showreel
					$video.pause();

					// Lazyload our work image
					if (currentSection >= 2 && !imagesLazyLoaded) {
						$(".ourwork__grid__item__image img").lazyload({
							effect : "fadeIn"
						});
						imagesLazyLoaded = true;
					}
				} else if (curSectionData) {
					$navParent.removeClass('mainnav--active');
					$video.play();
				}
				
				nextKeyFrame = curSectionData.keyend;
				prevKeyFrame = curSectionData.keystart;

				// Find nav link belonging to cur section and set it active
				$mainNavLinks.removeClass('active');
				$mainNavLinks.filter('[href="#' + curSectionData.element + '"]').addClass('active');
			}
			
		},

		menuNavigate: function() {
			// When menu clicked scroll to section
			/*
			});*/

			
			$mainNavLinks.on('click', function(e) {
				var $elem = $($(this).attr('href')),
					eOffset = $elem.offset().top + 5  - $navParent.height();

				if ($(this).attr('href') === '#js-client-section') {
					eOffset = $(document).height() - $window.height();
				}

				$("html, body").animate({ scrollTop: eOffset }, 800);

				// Close nav
				$('#js-mainnav-mobile-btn').trigger('click');
				scrolling.refresh();
				e.preventDefault();
			});
		}
	};

});
