/**
 * Модуль модели списка картинок
 *
 * @module PanelModel
 */
define([
	'backbone',
	'dispatcher'
], function(
	Backbone,
    dispatcher
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
		 * @property
		 * @name PanelModel.dispatcher
		 * @type {Backbone.Events}
		 */
		dispatcher: dispatcher,

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
				current     : '',
				tags        : []
			};
		},

		/**
		 * @method
		 * @name PanelModel.initialize
		 * @returns {undefined}
		 */
		initialize: function() {
			_.bindAll(
				this,
				'sortHandler',
				'sortBy'
			);
		},

		/**
		 * @method
		 * @name PanelModel.updateTags
		 * @returns {*}
		 */
		sortHandler: function() {},

		/**
		 * Обработка нового списка тегов
		 *
		 * @method
		 * @name PanelModel.updateTags
		 * @param {Array} tags
		 * @returns {undefined}
		 */
		updateTags: function(tags) {
			var current = this.get('tags'),
				diff = _.difference(tags, current);
			if (diff.length === 0) { return; }
			this.set('tags', tags);
			this.dispatcher.trigger('tagsChanged', tags);
		},

		/**
		 * Удаляет таг по индексу
		 *
		 * @method
		 * @name PanelModel.deleteTagByIndex
		 * @param {number} index
		 * @returns {string} - новая строка тегов
		 */
		deleteTagByIndex: function(index) {
			var current = this.get('tags'),
				newTags = [];
			current[index] = null;
			newTags = _.compact(current);
			this.set('tags', newTags);
			this.dispatcher.trigger('tagsChanged', newTags);
			return newTags.join(' ');
		},

		/**
		 * Сортирует по произвольному полю,
		 * при повторном клике изменяет направление сортировки
		 *
		 * @method
		 * @name PanelModel._sortByPublishHandler
		 * @param {string} sortName
		 * @returns {undefined}
		 */
		sortBy: function(sortName) {
			var current     = this.get('current'),
				secondClick = current === sortName,
				directions  = this.get('directions');

			if (secondClick) {
				directions[sortName] = -1 * directions[sortName];
				this.set('directions', directions);
			} else {
				this.set('current', sortName);
			}

			this.dispatcher.trigger('sortingChanged', sortName, directions[sortName]);
		}

	};

	PanelModel = Backbone.Model.extend(modelInterface);
	return PanelModel;
});
