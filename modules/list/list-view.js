/**
 * Модуль вида списка картинок
 *
 * @module ListView
 */
define([
	'jquery',
	'backbone',
	'handlebars',
	'text!templates/list.hbs',
	'fancybox'
], function(
	$,
	Backbone,
	Handlebars,
	templateSource
) {
	'use strict';
	var
		/**
		 * @class
		 * @name ListView
		 * @type {Backbone.View}
		 */
		ListView,
		viewInterface;

	/**
	 * @lends ListView
	 * @type {Object}
	 */
	viewInterface = {

		/**
		 * @property
		 * @name ListView.template
		 * @type {Function}
		 */
		template: Handlebars.compile(templateSource),

		/**
		 * @method
		 * @name ListView.initialize
		 * @param {Object} options
		 *      @param {Backbone.Model} options.model
		 * @returns {undefined}
		 */
		initialize: function(options) {
			_.bindAll(
				this,
				'render'
			);

			this.listenTo(this.model, 'change', this.render);
		},

		/**
		 * @method
		 * @name ListView.render
		 * @returns {undefined}
		 */
		render: function() {
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			this.$el.find('.item__icon>a').fancybox({
				'titlePosition'		: 'outside',
				'overlayColor'		: '#000',
				'overlayOpacity'	: 0.9,
				'transitionIn'	    : 'elastic',
				'transitionOut'	    : 'elastic'
			});
		}

	};

	ListView = Backbone.View.extend(viewInterface);
	return ListView;
});