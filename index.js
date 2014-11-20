requirejs.config({
	paths   : {
		underscore  : 'vendor/underscore.1.7.0',
		backbone    : 'vendor/backbone.1.1.2',
		handlebars  : 'vendor/handlebars.1.1.2',
		//jquery      : 'vendor/jquery.2.1.1.min',
		jquery      : 'vendor/jquery.1.11.1.min',
		text        : 'vendor/text.2.0.12',
		fancybox    : 'vendor/fancybox.1.3.4',
		migrate     : 'vendor/jquery.migrate.1.2.1',
		dispatcher  : 'modules/dispatcher/dispatcher'
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
		},
		migrate      : {
			deps    : ['jquery'],
			exports : '$'
		},
		fancybox    : {
			deps    : ['migrate'],
			exports : '$'
		}
	}
});

requirejs([
	'modules/list/list-index',
	'modules/panel/panel-index'
], function(
    ListIndex,
    PanelIndex
) {
	new ListIndex({
		el: '#list'
	});
	new PanelIndex({
		el: '#panel'
	});
});