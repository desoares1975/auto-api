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

## Features

  * Can consume GET, POST, PUT or DELETE
  * It will persist the data in files, simulating a database
  * Super-high test coverage
  * Can use both limit and skip for listing