/**
 * Модуль модели списка картинок
 *
 * @module ListModel
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
		 * @property
		 * @name ListModel.url
		 * @type {string}
		 */
		url: 'https://api.flickr.com/services/feeds/photos_public.gne',

		/**
		 * @property
		 * @name ListModel.dispatcher
		 * @type {Backbone.Events}
		 */
		dispatcher: dispatcher,

		/**
		 * @method
		 * @name ListModel.initialize
		 * @returns {undefined}
		 */
		initialize: function () {
			_.bindAll(
				this,
				'parse',
				'_extendItemFields',
				'_tagsChangedHandler',
				'_sortingChangedHandler',
				'_addPositionIndexes',
				'sort'
			);
			window.jsonFlickrFeed = this.parse;
			this.dispatcher.on('tagsChanged',    this._tagsChangedHandler   );
			this.dispatcher.on('sortingChanged', this._sortingChangedHandler);
			this.fetch();
		},

		/**
		 * @method
		 * @name ListModel.fetch
		 * @param {Array} [tagsList]
		 * @returns {undefined}
		 */
		fetch: function (tagsList) {
			var format   = 'format=json',
				notJsonp = 'nojsoncallback=0',
				tags     = 'tags=' + (tagsList || []).join(','),
				noCache  = '_=' + Math.round(Math.random() * 1e10),
				target   = 'text!' + this.url + '?' + [
					format,
					notJsonp,
					tags,
					noCache
				].join('&');
			require([target]);
		},

		/**
		 * @method
		 * @name ListModel.parse
		 * @param {Object} data
		 * @returns {Object}
		 */
		parse: function(data) {
			data.items = data.items.map(this._extendItemFields);
			this.set(data);
			return data;
		},

		/**
		 * Добавляет поля каждой фотографии для дальнейшего использования
		 *
		 * @method
		 * @private
		 * @name ListModel._extendItemFields
		 * @param {Object} item
		 * @returns {Object}
		 */
		_extendItemFields: function(item) {
			var taken     = new Date(item.date_taken),
				published = new Date(item.published),
				media     = item.media.m,
				newFields = {
					authorNick      : item.author.split('(')[1].split(')')[0],
					smallPhoto      : media,
					bigPhoto        : media.replace('_m.', '_z.'),
					thumbnail       : media.replace('_m.', '_t.'),
					dateTaken       : taken.getTime(),
					formatTaken     : taken.toLocaleString(),
					datePublished   : published.getTime(),
					formatPublished : published.toLocaleString()
				};
			return _.extend(item, newFields);
		},

		/**
		 * Обработчик изменения используемых тегов
		 *
		 * @method
		 * @event tagsChanged
		 * @private
		 * @name ListModel._tagsChangedHandler
		 * @param {Array} tags
		 * @returns {undefined}
		 */
		_tagsChangedHandler: function(tags) {
			this.fetch(tags);
		},

		/**
		 * Обработчик изменения используемой сортировки
		 *
		 * @method
		 * @event sortingChanged
		 * @private
		 * @name ListModel._sortingChangedHandler
		 * @param {string} sortName
		 * @param {number} direction
		 * @returns {undefined}
		 */
		_sortingChangedHandler: function(sortName, direction) {
			var items = this._addPositionIndexes(this.get('items')),
				propertyName = {
					name      : 'authorNick',
					taken     : 'dateTaken',
					published : 'datePublished'
				}[sortName],
				sorted = this.sort(items, propertyName, direction);
			this.set('items', sorted);
		},

		/**
		 * Добавляет в массив элементов позицию элемента для использования в сортировке
		 * (делает стабильную сортировку из нестабильной)
		 *
		 * @private
		 * @method
		 * @name ListModel._addPositionIndexes
		 * @params {Array} array
		 * @returns {Array}
		 */
		_addPositionIndexes: function(array) {
			return array.map(function(element, index) {
				element.index = index;
				return element;
			});
		},

		/**
		 * Сортирует переданный массив картинок
		 *
		 * @method
		 * @name ListModel.sort
		 * @params {Array} items
		 * @params {string} propertyName
		 * @params {number} direction
		 * @returns {Array}
		 */
		sort: function(items, propertyName, direction) {
			return items.sort(function(aItem, bItem) {
				var a     = aItem[propertyName],
					b     = bItem[propertyName],
					order = (a < b) ? -1 : (a > b) ? 1 : 0;

				order = order * direction;
				if (order === 0) {
					order = bItem.index - aItem.index;
				}
				return order;
			});
		}

	};

	ListModel = Backbone.Model.extend(modelInterface);
	return ListModel;
});
