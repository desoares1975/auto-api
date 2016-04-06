/* jshint esversion: 6, strict: true */
console.log('Functional testing starting...');

var app = require('../../app.js'),
    fs = require('fs'),
    files = fs.readdirSync(__dirname + '/');

files.forEach((file)=>{
    'use strict';

    if (file != 'index.js') {
        module.exports[file.replace('js', '')] = require('./' + file);
    }
});
