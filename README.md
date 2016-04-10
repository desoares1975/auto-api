# auto-api
Small REST API with db simulation for practice purpose

The genaral idea is to use GET, POST, PUT and DELETE HTTP verbs to access a non secure route to studia frontend tecnologies abstracting the backend.
If you post on any route it will create the routo and store the data automatically.

# Notice

Not yeat complete


## Installation

```bash
$ npm install auto-api
```

# Usage

```js
var autoAPI = require('auto-api');

```
```bash
$ npm start (will start on port 9000, with nodemon and jshint)
```
```bash
$ node app.js 8000 (will start on port 8000)
```
```js
//angular example
$http.get('/anystring'); //wil return every document in a file
$http.get('/anystring/1234556'); //wil return the document in a _id:1234556
$http.get('/anystring/10/0'); //wil return the first 10 document in array (/anystring/limit/skip)
$http.get('/anystring/4/10'); //wil return 4 document skipping the first 10 (/anystring/limit/skip)
$http.post('/anystring', {'name': 'Some Name'});/*will save and return a new anystring document,
even if you did not pre-loaded any files*/
$http.put('/anystring/12456', {'name': 'Some Name'});/* will update a  document with _id:12456
(_id was implemented as a Date.now())*/
$http.delete('/anystring/4561234')//will delete de document with _id:4561234
```
## Features

  * Can consume GET, POST, PUT or DELETE
  * It will persist the data in files, simulating a database
  * Can use both limit and skip for listing
  * Perfect to abstract server on Angular studing
  * Can pre load data on starting application

