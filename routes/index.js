/* jshint esversion: 6 */
var get = require('./get'),
    post = require('./post'),
    put = require('./put');

function resolvePath(req, res, next) {
    'use strict';

    let lastSlash = req.path.lastIndexOf('/');

    if (lastSlash !== 0) {
        req.params._id = req.path.substring(lastSlash + 1, req.path.length);
        req.url = req.path.substring(0, lastSlash);
    }
    return next();
}

function routes(app) {
	'use strict';

    app.all('/', (req, res)=>{ return res.status(200).json(app.rootPage); });
	app.post('*', post.create);
    app.get('*', resolvePath, get.read);
	app.put('*', resolvePath, put.update);
	app.delete('*');
}

module.exports = routes;