/* jshint esversion: 6 */
var get = require('./get');

function resolvePath(req, res, next) {
    'use strict';

    let lastSlash = req.path.lastIndexOf('/');

    if (lastSlash !== 0) {
        req.params._id = req.path.substring(lastSlash + 1, req.path.length);
        req.url = req.path.substring(0, lastSlash);
    }

    return next();
}

function resRoot(req, res) {
    return  res.status(200).json(app.rootPage);
}

function routes(app) {
	'use strict';

    app.get('/', resRoot);
    app.get('*', resolvePath, get.read);
	app.post('*');
	app.put('*');
	app.delete('*');
}

module.exports = routes;