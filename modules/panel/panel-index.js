/**
 * Модуль контроллера панели с тегами и сортировкой
 *
 * @module PanelIndex
 */
define([
	'underscore',
	'backbone',
	'handlebars',
	'./panel-view',
	'./panel-model',
	'text!templates/sorting.hbs',
	'text!templates/tags.hbs'
], function(
	_,
	Backbone,
	Handlebars,
	PanelView,
	PanelModel,
    sorting,
    tags
) {
	'use strict';

	var
		/**
		 * @class
		 * @name PanelIndex
		 * @type {Backbone.Events}
		 */
		PanelIndex,
		indexInterface;

	PanelIndex = function(options) {
		this.initialize(options);
	};

	/**
	 * @lends {PanelIndex}
	 * @type {Object}
	 */
	indexInterface = {

		/**
		 * @property
		 * @name PanelIndex.constructor
		 * @type {Function}
		 */
		constructor: PanelIndex,

		/**
		 * @property
		 * @name PanelIndex.viewConstructor
		 * @type {Function}
		 */
		viewConstructor: PanelView,

		/**
		 * @property
		 * @name ListIndex.modelConstructor
		 * @type {Function}
		 */
		modelConstructor: PanelModel,

		/**
		 * @method
		 * @constructs PanelIndex
		 * @name PanelIndex.initialize
		 * @param {Object} options
		 *      @param {string} options.el
		 * @returns {undefined}
		 */
		initialize: function(options) {
			Handlebars.registerPartial('sorting', sorting);
			Handlebars.registerPartial('tags', tags);

			this.model = new this.modelConstructor();
			this.view = new this.viewConstructor({
				model   : this.model,
				el      : options.el
			});
			this.view.render();
		}

	};

	PanelIndex.prototype = _.extend(Object.create(Backbone.Events), indexInterface);
	return PanelIndex;
});