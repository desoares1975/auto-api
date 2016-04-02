/* jshint esversion: 6 */
var fs = require('fs');

module.exports = {
    'create': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + req.path + '.json',
            idFile = __dirname + '/data/indexes/' + req.path + '_index' + '.md',
            coma = '',
            toSave = '';

        fs.open(file, 'a+', (err, fd)=>{
            if (err) {throw err;}

            fs.readFile(file, 'utf-8', (err, data)=>{
                if (err) {throw err;}

                if (data.slice(-1)[0] == '}') {
                    coma = ',';
                }

                if (req.body){
                    toSave = JSON.stringify(req.body);
                }

                fs.appendFile(file, coma + toSave, (err)=>{
                    if (err) {throw err;}

                    fs.close(fd);
                    return cb(null, req.body);
                });
            });
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

    'update': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + req.path + '.json',
            data = require(file);

        data[req.body.index - 1] = req.body;

        fs.writeFile(file, JSON.stringify(data), (err) => {
            if (err) {
                throw err;
            }

            return cb(null, req.body);
        });
    },

    'delete': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + req.path + '.json',
            data = require(file),
            toRemove = data.indexOf({'index': req.body.index});

        data.splice((req.body.index -1), 1);
        return cb(null, true);
    }
};