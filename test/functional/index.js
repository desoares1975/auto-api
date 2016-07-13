'use strict';

console.log('Functional testing starting...');

const fs = require('fs'),
    files = fs.readdirSync(__dirname + '/');

files.forEach(file => {

    if (file !== 'index.js') {
        module.exports[file.replace('js', '')] = require('./' + file);
    }
});
