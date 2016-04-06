var express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      db = require('./db-sim');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.port = process.argv[2] || 9000;

app.listen(app.port, function() {
  console.log('Application up and running on port ', app.port);
});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

require('./routes')(app);