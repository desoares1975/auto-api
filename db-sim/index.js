/* jshint esversion: 6 */
var fs = require('fs'),
    obj = require('../lib/object-value');

function filePromiseAplus(file) {
    return new Promise((resolve, reject)=>{
        'use strict';

        fs.open(file, 'a+', (err, fileDesc)=>{
            if (err) {
                return reject(err);
            }

            resolve(fileDesc);
        });
    });
}
function pathPromise(path) {
    'use strict';

    return new Promise((resolve, reject)=>{
        let lastSla = path.lastIndexOf('/');

        if (err) {return reject(err);}

        if (lastSla !== 1){
            let path = path.substring(0, lastSla);
            return resolve(path);
        } else {
            return resolve(path);
        }

    });
}
module.exports = {
    'create': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + (req.url || req.path) + '.lzdb',
            coma = '',
            doc;

        filePromiseAplus(file)
        .then((fdCreate)=>{

            fs.readFile(file, 'utf-8', (err, data)=>{
                if (err) {return cb(err);}

                if (data) {
                    coma = ',';
                }

                if (req.body instanceof Object){
                    req.body._id = Date.now();
                    try {
                        doc = JSON.stringify(req.body);
                    } catch(err) {
                        return cb(err);
                    }

                    fs.appendFile(file, coma + doc, (err)=>{
                        if (err) {return cb(err);}

                        fs.close(fdCreate);
                        return cb(null, req.body);
                    });
                } else {

                    fs.close(fdCreate);
                    return cb(null, req.body);
                }
            });
        }).catch((reason)=>{
            console.log('REASON->create', reason);
            return cb(reason);
        });
    },

    'read': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + req.path + '.lzdb',
            limit = req.limit,
            skip = req.skip || 0;

        filePromiseAplus(file)
        .then((readFd)=>{
            fs.readFile(file, 'utf-8', (err, data)=>{
                if (err) {return cb(err);}

                data = '[' + data + ']';
                data = JSON.parse(data);

                if (!limit){
                    limit = data.length;
                }

                if (limit == 1) {

                    fs.close(readFd);
                    return cb(null, data[skip]);
                } else {

                    let retAr = [];

                    for (let i = 0, j = skip; i < limit; i++, j++) {
                        if (data[j] instanceof Object) {
                            retAr[i] = data[j];
                        }
                    }

                    fs.close(readFd);
                    return cb(null, retAr);
                }
            });
        })//then for filePromiseAplus
        .catch((reason)=>{
            console.log('REASON->read', reason);
            return cb(reason);
        });
    },
    'update': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + req.path + '.lzdb';
        filePromiseAplus(file)
        .then((updateFd)=>{
            fs.readFile(file, 'utf-8', (err, data)=>{
                data = JSON.parse('[' + data + ']');

                let index = obj.index(data, '_id', req.body._id);

                data[index] = req.body;
                data = JSON.stringify(data);

                data = data.substring(1, data.length - 1);

                fs.writeFile(file, data, (err)=>{
                    if (err) {return cb(err);}

                    fs.close(updateFd);
                    return cb(null, req.body);
                });
            });
        })
        .catch((reason)=>{
            console.log('REASON->update', reason);
            return cb(reason);
        });
    },

    'delete': (req, res, cb) => {
        'use strict';

        let file = __dirname + '/data/' + req.path + '.lzdb';
        filePromiseAplus(file)
        .then((deleteFd)=>{
            fs.readFile(file, 'utf-8', (err, data)=>{
                data = JSON.parse('[' + data + ']');

                let index = obj.index(data, '_id', req.body._id);

                if (index === -1) {return  cb('NO_DATA_TO_DELETE');}

                data.splice(index, 1);

                data = JSON.stringify(data);
                data = data.substring(1, data.length - 1);

                fs.writeFile(file, data, (err)=>{

                    fs.close(deleteFd);
                    return cb(null, true);
                });
            });
        })
        .catch((reason)=>{
            console.log('REASON->x', reason);
            return cb(reason);
        });
    }
};