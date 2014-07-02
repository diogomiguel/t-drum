/**
 * RequireJS configuration
 */
require.config({

	// Initialize the application with the main application file
	deps: ['plugins/console', 'plugins/istouch', 'plugins/jwplayer', 'plugins/jwplayer.html5', 'main'],

	paths: {
		'jquery'	: '../components/jquery/jquery.min',
		'isotope'	: '../components/isotope/jquery.isotope',
		'imagesLoaded' :  '../components/imagesloaded/imagesloaded.pkgd',
		'skrollr'	: '../components/bower-skrollr/skrollr.min',
		'lazyload'	: '../components/jquery.lazyload/jquery.lazyload.min',
		'simpleStateManager'	: '../components/SimpleStateManager/src/ssm'
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
		}
	}

});
