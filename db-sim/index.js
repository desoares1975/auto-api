/* jshint esversion: 6 */
var fs = require('fs');

module.exports = {
    'create': (req, res) => {
        'use strict';

        var file = __dirname + '/data/' + req.path + '.json';

            fs.open(file, 'a+', (err, fd) => {
                if (err) {
                    throw err;
                }

                fs.writeFile(file, JSON.stringify([]), (err, data) => {
                    if (err) {
                        throw err;
                    }
                });

            });
            return true;
    },
    'read': (req, res, cb) => {
        'use strict';

        let data = require(__dirname + '/data/' + req.path + '.json'),
            limit = req.limit;

        if (limit && limit <= data.length) {
            if (limit == 1) {
                return cb(null, data[0]);
            }

            data.splice(limit, data.length - limit);
            return cb(null, data);
        }

        return cb(null, data);
    },
    'update': () => {

    },
    'delete': () => {

    }
};