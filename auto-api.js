/* jshint esversion: 6, strict: true */
var express = require('express'),
    bodyParser = require('body-parser'),
    autoAPI = express(),
    db = require('./db-sim'),
    preLoad = require('./lib/pre-load');

autoAPI.use(express.static(__dirname + '/public'));
autoAPI.use(bodyParser.json());
autoAPI.use(bodyParser.urlencoded({'extended': true}));

autoAPI.port = autoAPI.port || parseInt(process.argv[2]) || 9000;
autoAPI.db = autoAPI.db || 'default';

autoAPI.all('*', function(req, res, next) {
    'use strict';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

require('./routes')(autoAPI);

autoAPI.listen(autoAPI.port, function() {
    'use strict';
    console.log('Application up and running on port ', autoAPI.port);
    if (autoAPI.db === 'mongodb') {
        var mongodb = require('mongodb');

        autoAPI.dbpath = autoAPI.dbpath || 'mongodb://localhost:27017/autoAPI';

        mongodb.connect(autoAPI.dbpath, function (err, db) {
            if (err) {
                return console.log(err);
            }
            autoAPI.dbConnection = db;
            console.log('Auto-API connected on', autoAPI.dbpath);
        });
    }
});

autoAPI.rootPage = {
    'title': 'Welcome to autoAPI.',
    'message': 'autoAPI is originally meant for studing interface technologies such as AngulasJs,' +
        ' Ionic and others. No security is implemented so far',
    'readme': __dirname + '/public/documentation/README.md'
};

autoAPI.doPreLoad = function () {
    'use strict';

    var files = autoAPI.preLoad || [];

    if (process.argv[3]) {

        process.argv.forEach((input)=>{
        if (input !== process.argv[0] && input !== process.argv[1] && input !== process.argv[2]) {
            files.push(input);
        }
        });
    }

    preLoad(files, (err, data)=>{
        if (err) { return console.log(err); }
        console.log(data);
    });
};

if (autoAPI.preLoad || process.argv[3]) {
    autoAPI.doPreLoad();
}

module.exports = autoAPI;