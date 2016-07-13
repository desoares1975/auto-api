'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    autoAPI = express(),
    preLoad = require('./lib/pre-load');

autoAPI.use(express.static(__dirname + '/public'));
autoAPI.use(bodyParser.json());
autoAPI.use(bodyParser.urlencoded({'extended': true}));

autoAPI.all('*', (req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

require('./routes')(autoAPI);

autoAPI.load = port => {

    port =  port || parseInt(process.argv[2]) || 9000;

    autoAPI.listen(port, function() {
        console.log('Application up and running on port ', port);
    });
};

autoAPI.rootPage = {
    'title': 'Welcome to autoAPI.',
    'message': 'autoAPI is originally meant for studing interface technologies such as AngulasJs,' +
        ' Ionic and others. No security is implemented so far',
    'readme': __dirname + '/public/documentation/README.md'
};

autoAPI.doPreLoad = () => {

    let files = autoAPI.preLoad || [];

    if (process.argv[3]) {

        process.argv.forEach(input => {
        if (input !== process.argv[0] && input !== process.argv[1] && input !== process.argv[2]) {
            files.push(input);
        }
        });
    }

    preLoad(files, (err, data) => {
        if (err) {
            return console.log(err);
        }

        console.log(data);
    });
};

if (autoAPI.preLoad || process.argv[3]) {
    autoAPI.doPreLoad();
}

module.exports = autoAPI;
