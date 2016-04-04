/* jshint esversion: 6*/
var expect = require('chai').expect,
	fs = require('fs')
	get = require('../../routes/get'),
	Response = require('mock-response');

describe('Test get verb methods', ()=>{
	before((done)=>{
		fs.readFile(__dirname + '/../fixtures/user.md', 'utf-8', (err, data)=>{
            if (err) {throw err;}

            fs.writeFile(__dirname + '/../../db-sim/data/user_test.lzdb', data, (err, beforeFd) => {
                if (err) {throw err;}

				done();
            });
        });
	});

	after((done)=>{
		done();
	});

	it('test main get route', (done)=>{
		done();
	});
});