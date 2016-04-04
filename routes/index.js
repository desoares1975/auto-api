/* jshint esversion: 6 */
function routes(app) {
	'use strict';

	app.get('*', read);
	app.post('*');
	app.put('*');
	app.delete('*');
}