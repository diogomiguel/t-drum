/**
 * RequireJS configuration
 */
require.config({

	// Initialize the application with the main application file
	deps: ['plugins/console', 'plugins/istouch', 'main'],

	paths: {
		'jquery'	: '../components/jquery/jquery.min',
		'isotope'	: '../components/isotope/jquery.isotope.min',
		'imagesLoaded' :  '../components/imagesloaded/imagesloaded.pkgd.min',
		'skrollr'	: '../components/bower-skrollr/skrollr.min',
		'lazyload'	: '../components/jquery.lazyload/jquery.lazyload.min',
		'simpleStateManager'	: '../components/SimpleStateManager/src/ssm',
		'jwplayer': 'plugins/jwplayer',
		'jwplayer.html5': 'plugins/jwplayer.html5'
	},

	shim: {
		// If you need to shim anything, put it here
		'imagesLoaded' : {
			deps: ['jquery'],
			exports: 'imagesLoaded'
		},
		'isotope' : {
			deps: ['jquery'],
			exports: 'Isotope'
		},
		'skrollr' : {
			exports: 'skrollr'
		},
		'lazyload' : {
			deps: ['jquery']
		},
		'simpleStateManager': {
			exports: 'ssm'
		},
		'jwplayer.html5': {
			deps: ['jwplayer']
		},
		'jwplayer': {
			exports: 'jwplayer'
		}
	}

});
