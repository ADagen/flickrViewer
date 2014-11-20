/**
 * Модуль вида панели с тегами и сортировкой
 *
 * @module PanelView
 */
define([
	'backbone',
	'handlebars',
	'dispatcher',

	'text!templates/panel.hbs',
	'text!templates/sorting.hbs',
	'text!templates/tags.hbs'
], function(
	Backbone,
	Handlebars,
	dispatcher,

	templatePanel,
	templateSorting,
	templateTags
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
		template: Handlebars.compile(templatePanel),

		/**
		 * @property
		 * @name PanelView.templateSorting
		 * @type {Function}
		 */
		templateSorting: Handlebars.compile(templateSorting),

		/**
		 * @property
		 * @name PanelView.templateTags
		 * @type {Function}
		 */
		templateTags: Handlebars.compile(templateTags),

		/**
		 * Локальная ссылка на диспатчер
		 *
		 * @property
		 * @name
		 * @type {Backbone.Events}
		 */
		dispatcher: dispatcher,

		/**
		 * Список используемых селекторов
		 *
		 * @property
		 * @name PanelView.elements
		 * @type {Object}
		 */
		selectors: {
			input : 'input[type=text]',
			tags  : '.panel__tags',
			sort  : '.panel__sorting'
		},

		/**
		 * Закешированный набор элементов
		 *
		 * @property
		 * @name PanelView.elements
		 * @type {Object}
		 */
		elements: {},

		/**
		 * @property
		 * @name PanelView.events
		 * @type {Object}
		 */
		events: {
			'keyup input'            : '_inputKeyHandler',
			'click .tag'             : '_tagClickHandler',
			'click .js-sort-name'    : '_sortByNameHandler',
			'click .js-sort-taken'   : '_sortByTakenHandler',
			'click .js-sort-publish' : '_sortByPublishHandler'
		},

		/**
		 * @method
		 * @name PanelView.initialize
		 * @param {Object} options
		 *      @param {Backbone.Model} options.model
		 * @returns {undefined}
		 */
		initialize: function(options) {
			this.elements = {};
			_.bindAll(
				this,
				'render'
			);

			this.listenTo(this.dispatcher, 'sortingChanged', this.renderSort);
			this.listenTo(this.dispatcher, 'tagsChanged',    this.renderTags);
		},

		/**
		 * @method
		 * @name PanelView.render
		 * @returns {undefined}
		 */
		render: function() {
			var data = this.serialize();
			this.$el.html(this.template(data));

			_.forEach(this.selectors, function(selector, name) {
				this.elements[name] = this.$(selector);
			}, this);
		},

		/**
		 * @method
		 * @event sortingChange
		 * @name PanelView.renderSort
		 * @returns {undefined}
		 */
		renderSort: function() {
			var data = this.serialize(),
				rendered = this.templateSorting(data);
			this.elements.sort.html(rendered);
		},

		/**
		 * @method
		 * @event tagsChange
		 * @name PanelView.renderTags
		 * @returns {undefined}
		 */
		renderTags: function() {
			var data = this.serialize(),
				rendered = this.templateTags(data);
			this.elements.tags.html(rendered);
		},

		/**
		 * @callback
		 * @private
		 * @name PanelView._inputKeyHandler
		 * @returns {undefined}
		 */
		_inputKeyHandler: function() {
			var value = this.elements.input.val(),
				tags  = _.compact(value.split(' '));
			this.model.updateTags(tags);
		},

		/**
		 * @callback
		 * @private
		 * @name PanelView._tagClickHandler
		 * @returns {undefined}
		 */
		_tagClickHandler: function(event) {
			var $element = $(event.currentTarget),
				index    = $element.data('index'),
				newText  = this.model.deleteTagByIndex(index);
			this.elements.input.val(newText)
		},

		/**
		 * Обработчик клика по сортировке по имени
		 *
		 * @callback
		 * @private
		 * @name PanelView._sortByNameHandler
		 * @returns {undefined}
		 */
		_sortByNameHandler: function() {
			this.model.sortBy('name');
		},

		/**
		 * Обработчик клика по сортировке по дате съёмки
		 *
		 * @callback
		 * @private
		 * @name PanelView._sortByTakenHandler
		 * @returns {undefined}
		 */
		_sortByTakenHandler: function() {
			this.model.sortBy('taken');
		},

		/**
		 * Обработчик клика по сортировке по дате публикации
		 *
		 * @callback
		 * @private
		 * @name PanelView._sortByPublishHandler
		 * @returns {undefined}
		 */
		_sortByPublishHandler: function() {
			this.model.sortBy('publish');
		},

		/**
		 * @method
		 * @name PanelView.serialize
		 * @returns {Object}
		 */
		serialize: function() {
			var data = this.model.toJSON();
			data = this._addSortNames(data);
			data = this._addDirections(data);
			return data;
		},

		/**
		 * Добавляет в подготовленные данные для вьюшки флаги признаков сортировок по именам
		 *
		 * @method
		 * @private
		 * @name PanelView._addSortNames
		 * @param {Object} data
		 * @returns {Object}
		 */
		_addSortNames: function(data) {
			var sorters = Object.keys(data.directions);
			sorters.forEach(function(name) {
				data['sort' + name] = false;
			});
			data['sort' + data.current] = true;
			return data;
		},

		/**
		 * Добавляет в подготовленные данные для вьюшки флаги направлений сортировки
		 *
		 * @method
		 * @private
		 * @name PanelView._addDirections
		 * @param {Object} data
		 * @returns {Object}
		 */
		_addDirections: function(data) {
			_.forEach(data.directions, function(direction, name) {
				data['direction' + name] = {
					'1': 'ascending',
					'-1': 'descending'
				}[direction];
			});
			return data;
		}

	};

	PanelView = Backbone.View.extend(viewInterface);
	return PanelView;
});