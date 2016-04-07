/* jshint esversion: 6 */
var get = require('./get'),
    post = require('./post'),
    put = require('./put'),
    del = require('./delete'),
    resolvePath = require('../middleware/resolve-path');



function routes(app) {
	'use strict';

    app.all('/', (req, res)=>{ return res.status(200).json(app.rootPage); });
	app.post('*', post.create);
    app.get('*', resolvePath, get.read);
	app.put('*', resolvePath, put.update);
	app.delete('*', resolvePath, del.delete);
}

module.exports = routes;