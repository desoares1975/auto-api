'use strict';

const fs = require('fs'),
    _ = require('lodash');

function filePromiseAplus(file) {
    return new Promise((resolve, reject)=>{

        fs.open(file, 'a+', (err, fileDesc) => {
            if (err) {
                return reject(err);
            }

            resolve(fileDesc);
        });
    });
}

module.exports = {
    'create': (req, res, cb) => {

        let file = __dirname + '/data/' + (req.url || req.path) + '.lzdb',
            coma = '',
            doc;

        filePromiseAplus(file)
        .then(fdCreate => {

            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    return cb(err);
                }

                if (data) {
                    coma = ',';
                }

                if (req.body instanceof Object){
                    req.body._id = req.body._id || Date.now();
                    try {
                        doc = JSON.stringify(req.body);
                    } catch (error) {
                        return cb(error);
                    }

                    fs.appendFile(file, coma + doc, err => {
                        if (err) {
                            return cb(err);
                        }

                        fs.close(fdCreate);
                        return cb(null, req.body);
                    });
                } else {

                    fs.close(fdCreate);
                    return cb(null, req.body);
                }
            });
        }).catch(reason => {
            console.log('REASON->create', reason);
            return cb(reason);
        });
    },

    'read': (req, res, cb) => {

        let file = __dirname + '/data/' + (req.url || req.path) + '.lzdb',
            limit = req.params.limit,
            skip = req.params.skip || 0;

        filePromiseAplus(file)
        .then(readFd => {
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    return cb(err);
                }

                try {
                    data = JSON.parse('[' + data + ']');
                } catch (error) {
                    return cb(error);
                }
                limit = limit || data.length;

                if (limit === 1) {

                    fs.close(readFd);
                    return cb(null, [data[skip]]);
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
        })
        .catch(reason => {
            console.log('REASON->read', reason);
            return cb(reason);
        });
    },
    'update': (req, res, cb) => {

        let file = __dirname + '/data/' + req.path + '.lzdb';
        filePromiseAplus(file)
        .then(updateFd => {
            fs.readFile(file, 'utf-8', (err, data) => {
                try {
                    data = JSON.parse('[' + data + ']');
                } catch (error) {
                    return cb(error);
                }

                let index = _.findIndex(data, {
                    '_id': parseInt(req.params._id)
                });

                if (index === -1) {
                    return cb(null, {
                        'reason': 'No data was found under the _id ' + req.params._id
                    });
                }
                data[index]._id = parseInt(req.params._id);
                for (let key in data[index]) {
                    if (key !== '_id'){
                        data[index][key] = req.body[key];
                    }
                }
                try {
                    data = JSON.stringify(data);
                } catch (error) {
                    return cb(error);
                }
                data = data.substring(1, data.length - 1);

                fs.writeFile(file, data, err => {
                    if (err) {
                        return cb(err);
                    }

                    fs.close(updateFd);
                    return cb(null, req.body);
                });
            });
        })
        .catch(reason => {
            console.log('REASON->update', reason);
            return cb(reason);
        });
    },

    'delete': (req, res, cb) => {

        let file = __dirname + '/data/' + req.path + '.lzdb';
        filePromiseAplus(file)
        .then(deleteFd => {
            fs.readFile(file, 'utf-8', (err, data) => {
                try {
                    data = JSON.parse('[' + data + ']');
                } catch (error) {
                    return cb(error);
                }

                let index = _.findIndex(data, {
                    '_id': parseInt(req.params._id)
                });

                 if (index === -1) {
                    return cb(null, {
                        'reason': 'No data was found under the _id ' + req.params._id
                    });
                }

                data.splice(index, 1);
                try {
                    data = JSON.stringify(data);
                } catch (error) {
                    return  cb(error);
                }
                data = data.substring(1, data.length - 1);

                fs.writeFile(file, data, err => {
                    if (err) {
                        return cb(err);
                    }

                    fs.close(deleteFd);
                    return cb(null, true);
                });
            });
        })
        .catch(reason => {
            console.log('REASON->x', reason);
            return cb(reason);
        });
    }
};
