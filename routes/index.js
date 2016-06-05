/* jshint esversion: 6 */
var bdSim = require('./db-sim'),
    resolvePath = require('../middleware/resolve-path');



function routes(app) {
	'use strict';

    app.all('/favicon.ico', (req, res)=>{ return false; });
    app.all('/', (req, res)=>{ return res.status(200).json(app.rootPage); });
    app.post('*', bdSim.create);
    app.get('*', resolvePath, bdSim.read);
    app.put('*', resolvePath, bdSim.update);
    app.delete('*', resolvePath, bdSim.remove);
}

module.exports = routes;