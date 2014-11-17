/**
 * Модуль контроллера списка картинок
 *
 * @module ListIndex
 */
define([
	'underscore',
	'backbone',
	'handlebars',
	'./list-view',
	'./list-model',
	'text!templates/item.hbs'
], function(
	_,
    Backbone,
    Handlebars,
    ListView,
    ListModel,
    itemPartial
) {
	'use strict';

	var
		/**
		 * @class
		 * @name ListIndex
		 * @type {Backbone.Events}
		 */
		ListIndex,
		indexInterface;

	ListIndex = function(options) {
		this.initialize(options);
	};

	/**
	 * @lends {ListIndex}
	 * @type {Object}
	 */
	indexInterface = {

		/**
		 * @property
		 * @name ListIndex.constructor
		 * @type {Function}
		 */
		constructor: ListIndex,

		/**
		 * @property
		 * @name ListIndex.viewConstructor
		 * @type {Function}
		 */
		viewConstructor: ListView,

		/**
		 * @property
		 * @name ListIndex.modelConstructor
		 * @type {Function}
		 */
		modelConstructor: ListModel,

		/**
		 * @method
		 * @constructs ListIndex
		 * @name ListIndex.initialize
		 * @param {Object} options
		 *      @param {string} options.el
		 * @returns {undefined}
		 */
		initialize: function(options) {
			Handlebars.registerPartial('item', itemPartial);

			this.model = new this.modelConstructor();
			this.view = new this.viewConstructor({
				model: this.model,
				el   : options.el
			});
			this.view.render();
			this.model.fetch();
		}

	};

	ListIndex.prototype = _.extend(Object.create(Backbone.Events), indexInterface);
	return ListIndex;
});