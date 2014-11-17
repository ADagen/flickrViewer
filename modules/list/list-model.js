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
			_.bindAll(
				this,
				'parse',
				'_extendItemFields'
			);
			window.jsonFlickrFeed = this.parse;
			this.fetch();
		},

		/**
		 * @method
		 * @name ListModel.fetch
		 * @returns {undefined}
		 */
		fetch: function () {
			var baseUrl  = 'https://api.flickr.com/services/feeds/photos_public.gne?',
				format   = 'format=json',
				notJsonp = 'nojsoncallback=0',
				noCache  = '_=' + Math.round(Math.random() * 1e10),
				target   = 'text!' + baseUrl + [format, notJsonp, noCache].join('&');
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
					bigPhoto        : media.replace('_m.', '_o.'),
					smallSquare     : media.replace('_m.', '_s.'),
					thumbnail       : media.replace('_m.', '_t.'),
					dateTaken       : +taken,
					formatTaken     : taken.toLocaleString(),
					datePublished   : +published,
					formatPublished : published.toLocaleString()
				};
			return _.extend(item, newFields);
		}

	};

	ListModel = Backbone.Model.extend(modelInterface);
	return ListModel;
});
