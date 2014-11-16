/**
 * Модуль контроллера списка картинок
 *
 * @module ListIndex
 */
define([
	'underscore',
	'backbone',
	'./list-view',
	'./list-model'
], function(
	_,
    Backbone,
    ListView,
    ListModel
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

	ListIndex = function() {
		this.initialize();
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
		 * @returns {undefined}
		 */
		initialize: function() {
			this.view = new this.viewConstructor();
			this.view.render();
		}

	};

	ListIndex.prototype = _.extend(Object.create(Backbone.Events), indexInterface);
	return ListIndex;
});