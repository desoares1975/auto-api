/* jshint esversion: 6 */
var get = require('./get');

function routes(app) {
	'use strict';

	app.get('*', get.read);
	app.post('*');
	app.put('*');
	app.delete('*');
}

module.exports = routes;