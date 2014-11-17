/**
 * Модуль модели списка картинок
 *
 * @module PanelModel
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
		 * @name PanelModel
		 * @type {Backbone.View}
		 */
		PanelModel,
		modelInterface;

	/**
	 * @lends PanelModel
	 * @type {Object}
	 */
	modelInterface = {

		/**
		 * @method
		 * @name PanelModel.defaults
		 * @returns {Object}
		 */
		defaults: function() {
			return {
				directions  : {
					name        : 1,
					taken       : 1,
					publish     : 1
				},
				current     : 'name',
				tags        : [
					'love',
					'war'
				]
			};
		},

		/**
		 * @method
		 * @name PanelModel.initialize
		 * @returns {undefined}
		 */
		initialize: function () {
			_.bindAll(
				this,
				'sortHandler'
			);
		},

		sortHandler: function() {}

	};

	PanelModel = Backbone.Model.extend(modelInterface);
	return PanelModel;
});
