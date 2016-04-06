/* jshint esversion: 6*/
var expect = require('chai').expect,
	fs = require('fs'),
	get = require('../../routes/get').read,
    mock = require('node-mocks-http');

describe('Test get verb methods', ()=>{
    'use strict';

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

	it('test main GET route', (done)=>{
        var req = mock.createRequest({
                'method': 'GET',
                'url': '/user_test'
            });

        req.limit = 4;
        req.skip = 5;
        var res = mock.createResponse();
        var test = get(req, res);
	   done();
	});
});