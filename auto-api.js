/* jshint esversion: 6, strict: true */
var express = require('express'),
      bodyParser = require('body-parser'),
      autoAPI = express(),
      db = require('./db-sim'),
      preLoad = require('./lib/pre-load');

autoAPI.use(express.static(__dirname + '/public'));
autoAPI.use(bodyParser.json());
autoAPI.use(bodyParser.urlencoded({'extended': true}));

autoAPI.port = parseInt(process.argv[2]) || 9000;

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
});

autoAPI.rootPage = {
  'title': 'Welcome to LazyAPI.',
  'message': 'LazyAPI is originally meant for studing frontend technologies such as AngulasJs,'+
    ' Ionic and others. No security is implemented so far',
  'readme': __dirname + 'public/documentation/README.md'
};

if (autoAPI.preLoad || process.argv[3])
{
  var files = autoAPI.preLoad;

  if (process.argv[3]) {
    var files = [];

    process.argv.forEach((input)=>{
      'use strict';

      if (input !== process.argv[0] && input !== process.argv[1] && input !== process.argv[2]) {
        files.push(input);
      }
    });
  }

  preLoad(files);
}

module.exports = autoAPI;