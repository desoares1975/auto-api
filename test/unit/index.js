/* jshint esversion: 6, strict: true */

console.log('Unit testing starting...');

var fs = require('fs'),
    files = fs.readdirSync(__dirname + '/');

files.forEach(function (file) {
    'use strict';

    if (file !== 'index.js'){
        module.exports[file.replace('.js', '')] = require('./' + file);
    }
});


