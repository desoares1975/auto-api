/* jshint esversion: 6, strict: true */
var express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      db = require('./db-sim');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.port = parseInt(process.argv[2]) || 9000;

app.all('*', function(req, res, next) {
    'use strict';
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

require('./routes')(app);

app.listen(app.port, function() {
    'use strict';

    console.log('Application up and running on port ', app.port);
});
app.rootPage = {
  'title': 'Welcome to LazyAPI.',
  'message': 'LazyAPI is originally meant for studing frontend technologies such as AngulasJs,'+
  ' Ionic and others. No security is implemented so far',
  'readme': __dirname + 'public/documentation/README.md'
};
module.exports = app;