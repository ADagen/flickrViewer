requirejs.config({
	paths   : {
		underscore  : 'vendor/underscore.1.7.0',
		backbone    : 'vendor/backbone.1.1.2',
		handlebars  : 'vendor/handlebars.1.1.2',
		jquery      : 'vendor/jquery.2.1.1.min',
		text        : 'vendor/text.2.0.12'
	},
	shim    : {
		backbone    : {
			deps    : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		jquery      : {
			exports : '$'
		},
		underscore  : {
			exports : '_'
		},
		handlebars  : {
			exports : 'Handlebars'
		}
	}
});

requirejs([
	'modules/list-index'
], function(
    ListIndex
) {
	new ListIndex();
});