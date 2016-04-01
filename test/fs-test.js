/* jshint esversion: 6, strict: true */
var fs = require('fs');
var file = 'test_file';
fs.open(file, 'a+',function(err, fd) {
    'use strict';
    if (err) {
        throw err;
    }

    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        var coma = '';
        if (data.slice(-1)[0] == '}') {
            coma = ","
        }

        var teste = '[' + data + ']';
console.log(teste);
        teste = JSON.parse(teste);
console.log(teste.length);
        fs.appendFile(file, coma + JSON.stringify({'teste': true}), (err) => {

            if (err) {
                throw err;
            }

            fs.close(fd, function (err) {
                if (err) {
                    throw err;
                }
            })
        });
    });
});
