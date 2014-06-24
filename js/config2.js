/**
 * RequireJS configuration
 */
require.config({

	// Initialize the application with the main application file
	deps: ['plugins/console', 'plugins/istouch', 'plugins/mqsync', 'plugins/jwplayer', 'plugins/jwplayer.html5', 'main2'],

	paths: {
		'jquery'	: '../components/jquery/jquery.min',
		'isotope'	: '../components/isotope/jquery.isotope',
		'imagesLoaded' :  '../components/imagesloaded/imagesloaded.pkgd',
		'bridget'	: '../components/jquery-bridget/jquery.bridget',
		'skrollr'	: '../components/bower-skrollr/skrollr.min',
		'lazyload'	: '../components/jquery.lazyload/jquery.lazyload.min'
	},

	shim: {
		// If you need to shim anything, put it here
		'bridget' : {
			deps : ['jquery']
		},
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
		}
	},

	// Prevent caching issues, by adding an additional URL argument
	urlArgs: 'bust=' + (new Date()).getDate()

});