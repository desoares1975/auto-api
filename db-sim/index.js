/* jshint esversion: 6 */
var fs = require('fs');

module.exports = {
    'create': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + req.path + '.json';

        fs.stat(file, (err, stat) => {
            let data = req.body || '';
            if (err && err.code === 'ENOENT') {
                fs.writeFile(file, JSON.stringify(data), (err, fd) => {
                    if (err) {
                        throw err;
                    }

                    return cb(null, req.body);
                });
            } else {

                fs.appendFile(file, JSON.stringify(req.body), (err) => {
                    if (err) {
                        throw err;
                    }

                    return cb(null, req.body);
                });
            }

        });
    },
    'read': (req, res, cb) => {
        'use strict';

        let data = require(__dirname + '/data/' + req.path + '.json'),
            limit = req.limit,
            skip = req.skip || 0;

        if (limit && limit <= data.length) {
            if (limit == 1) {
                return cb(null, data[0]);
            }

            let retAr = [];

            for (let i = 0, j = skip; i < limit; i++, j++) {

                retAr[i] = data[j];
            }
            return cb(null, retAr);
        }

        return cb(null, data);
    },
    'update': () => {

    },
    'delete': () => {

    }
};