'use strict';

var fs = require('fs'),
    file = 'test_file.zdb';

var filePromise = new Promise((res, rej)=>{
    fs.open(file, 'a+', (err, data)=>{
        returnData(err, data, res, rej);
    });
}),
    dataPromise = new Promise((res, rej)=>{
    fs.readFile(file, 'utf8', (err, data)=>{
        returnData(err, data, res, rej);
    });
});

filePromise.then()
.catch((reason)=>{
    console.log('REASON->', reason);
});

dataPromise.then((data)=>{

    var coma = '';

    if (data != undefined && data.slice(-1)[0] == '}') {
        coma = ","
    }
    let test = JSON.parse('[' + data + ']');
    console.log(test, test instanceof Array, test.length);

    new Promise((res, rej)=>{
    fs.appendFile(file, coma + JSON.stringify({'teste': true}), (err)=>{
            returnData(err, 'OK', res, rej);
        });
    })
    .then().catch((reason)=>{
        console.log('REASON3->', reason);
    })
})
.catch((reason)=>{
    console.log('REASON2->', reason);
});


function returnData(err, data, res, rej) {
    if (!err) {
        return res(data);
    }

    return rej(err);
}