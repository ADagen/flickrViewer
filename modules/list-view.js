/**
 * Модуль вида списка картинок
 *
 * @module ListView
 */
define([
	'backbone',
	'handlebars',
	'text!templates/item.hbs'
], function(
	Backbone,
	Handlebars,
	itemSource
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
		template: Handlebars.compile(itemSource),

		/**
		 * @method
		 * @name ListView.initialize
		 * @param {Object} options
		 *      @param {Backbone.Model} options.model
		 * @returns {undefined}
		 */
		initialize: function(options) {

		},

		/**
		 * @method
		 * @name ListView.render
		 * @returns {undefined}
		 */
		render: function() {
			// https://www.flickr.com/services/api/misc.urls.html
			$(function() {
				var $body = $('body');
				window.response && window.response.items.forEach(function(item) {
					$body.append(this.template(item));
				}.bind(this));
			}.bind(this));
		}

	};

	ListView = Backbone.View.extend(viewInterface);
	return ListView;
});