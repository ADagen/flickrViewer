/**
 * Модуль модели списка картинок
 *
 * @module ListModel
 */
define([
	'backbone'
], function(
	Backbone
) {
	'use strict';
	var
		/**
		 * @class
		 * @name ListModel
		 * @type {Backbone.View}
		 */
		ListModel,
		modelInterface;

	/**
	 * @lends ListModel
	 * @type {Object}
	 */
	modelInterface = {

		/**
		 * @method
		 * @name ListModel.initialize
		 * @returns {undefined}
		 */
		initialize: function () {

		},

		/**
		 * @method
		 * @name ListModel.fetch
		 * @returns {undefined}
		 */
		fetch: function () {

		}

	};

	ListModel = Backbone.Model.extend(modelInterface);
	return ListModel;
});
