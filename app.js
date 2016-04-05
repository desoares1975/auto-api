var express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      db = require('./db-sim');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var port = null;

app.port = port || 10000;

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
//base route
// app.get('*', function(req, res) {
//   test = db.read(req, res);
//   console.log(test);
//    return res.status(200).json({data: test});
// });
/*
app.post('/contatos', function(req, res) {
  contatos.push(req.body);
  fs.writeFile('./contatos.json', JSON.stringify(contatos), function (err) {
  });

  res.status(200).json(req.body);
});

app.get('/operadoras', function(req, res) {
  res.status(200).json(operadoras);
});*/