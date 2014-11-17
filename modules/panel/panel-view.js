/**
 * Модуль вида панели с тегами и сортировкой
 *
 * @module PanelView
 */
define([
	'backbone',
	'handlebars',
	'text!templates/panel.hbs'
], function(
	Backbone,
	Handlebars,
	templateSource
) {
	'use strict';
	var
		/**
		 * @class
		 * @name PanelView
		 * @type {Backbone.View}
		 */
		PanelView,
		viewInterface;

	/**
	 * @lends PanelView
	 * @type {Object}
	 */
	viewInterface = {

		/**
		 * @property
		 * @name PanelView.template
		 * @type {Function}
		 */
		template: Handlebars.compile(templateSource),

		/**
		 * @method
		 * @name PanelView.initialize
		 * @param {Object} options
		 *      @param {Backbone.Model} options.model
		 * @returns {undefined}
		 */
		initialize: function(options) {
			_.bindAll(
				this,
				'render'
			);

			this.listenTo(this.model, 'sortingChange', this.renderSort);
			this.listenTo(this.model, 'tagsChange', this.renderTags);
		},

		/**
		 * @method
		 * @name PanelView.render
		 * @returns {undefined}
		 */
		render: function() {
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
		},

		/**
		 * @method
		 * @event sortingChange
		 * @name PanelView.renderSort
		 * @returns {undefined}
		 */
		renderSort: function() {
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
		},

		/**
		 * @method
		 * @event tagsChange
		 * @name PanelView.renderTags
		 * @returns {undefined}
		 */
		renderTags: function() {

		}

	};

	PanelView = Backbone.View.extend(viewInterface);
	return PanelView;
});