# auto-api
Small REST API with db simulation for practice purpouses

The genaral idea is to use GET, POST, PUT and DELETE HTTP verbs to access a non secure route to studie front end tecnologies,
abstracting the back end.
If you post on any route it will create the route and store the data automatically.

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

  * Can consume GET, POST, PUT or DELETE
  * It will persist the data in files, simulating a database
  * Can use both limit and skip for listing
  * Perfect to abstract server on Angular studing
  * Can pre load data on starting application (data have to be in an array a json file ot in come separated JS object):
  * Can pre load as many files as needed