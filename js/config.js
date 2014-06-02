/**
 * RequireJS configuration
 */
require.config({

	// Initialize the application with the main application file
	deps: ['plugins/console', 'plugins/mqsync', 'main', 'plugins/jwplayer'],

	paths: {
		'jquery'	: '../components/jquery/jquery.min',
		'isotope'	: '../components/isotope/jquery.isotope',
		'bridget'	: '../components/jquery-bridget/jquery.bridget',
		'skrollr'	: '../components/bower-skrollr/skrollr.min'
	},

	shim: {
		// If you need to shim anything, put it here
		'bridget' : {
			deps : ['jquery']
		},
		'isotope' : {
			deps: ['jquery'],
			exports: 'Isotope'
		},
		'skrollr' : {
			exports: 'skrollr'
		}
	},

	// Prevent caching issues, by adding an additional URL argument
	urlArgs: 'bust=' + (new Date()).getDate()

});
