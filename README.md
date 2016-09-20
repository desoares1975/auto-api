# auto-api
Small REST API with DB simulation for practice purpouses

The genaral idea is to use GET, POST, PUT, PATCH and DELETE HTTP verbs to access a non secure route to studie front end tecnologies,
abstracting the back end.
If you post on any route it will create the route and store the data automatically.

## Installation

```bash
$ npm install auto-api
```

# Usage

```js
var autoAPI = require('auto-api');
autoAPI.load(3000);

```
```bash
$ node app.js (will start on port 3000)
```
```js
var autoAPI = require('auto-api');
autoAPI.load();

```
```bash
$ node app.js 8000 (will start on port 8000)
```
```bash
node_modules/auto-api$ npm start (will start on port 9000, with nodemon and jshint (dev dependencies required))
```

```js
//angular example
$http.get('/anystring'); //will return every document in a file
$http.get('/anystring/1234556'); //will return the document in a _id:1234556
$http.get('/anystring/10/0'); //will return the first 10 documents in an array (/anystring/limit/skip)
$http.get('/anystring/4/10'); //will return 4 document skipping the first 10 (/anystring/limit/skip)
$http.post('/anystring', {'name': 'Some Name'});
// or
$http.post('/anystring', {'_id':'some-id', 'name': 'Some Name'});
/*will save and return a new anystring document,
even if you did not pre-loaded any files*/
$http.put('/anystring/12456', {'name': 'Some Name'});/* will update a  document with _id:12456
(If not given one, _id will be Date.now(), which is an integer)*/
$http.delete('/anystring/4561234')//will delete de document with _id:4561234
```
## File preloading example:

###File format:
####text file
```js
{"key1": "value1", "key2": "value2"},{"key1": "value3", "key2": "value4"},{"key1": "value5", "key2": "value6"}
```
####JSON file -
```json
[
	{"key1": "value1", "key2": "value2"},
	{"key1": "value3", "key2": "value4"},
	{"key1": "value5", "key2": "value6"}
]
```
or

```json
[
	{"_id": "value1", "key1": "value2"},
	{"_id": "value3", "key1": "value4"},
	{"_id": "value5", "key1": "value6"}
]
```
### File Loading
In your main application file:

```js
var autoAPI = require('auto-api');
autoAPI.preload = ['/path/to/file1', '/path/to/file2',[...] '/path/to/fileN'];
autoAPI.doPreload();
```
Or on the terminal:
```bash
$ node app.js 8000 /home/current_user/filename (will start on port 8000 and pre-load data from file filename)
$ node app.js 8000 /home/current_user/filename1 /home/current_user/filename2 ... /home/current_user/filenameN
$ node app.js 8000 ./file1 ./file2 ./file3 (if the files ar in the applicatio directory)
```


## Features

  * Can consume GET, POST, PUT, PATCH or DELETE
  * It will persist the data in files, simulating a database
  * Can use both limit and skip for listing
  * Perfect to abstract server on Angular studing
  * Can pre load data on starting application (data have to be in an array a json file ot in come separated JS object):
  * Can pre load as many files as needed
  * Can set "_id" as needed
