/*jshint esversion: 6, strict:true */
var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app'),
    fs = require('fs'),
    obj = require('../../lib/object-value').index;

describe('DELETE routes', ()=>{
    'use strict';
    let file = __dirname + '/../../db-sim/data/user_delete.lzdb';

    before((done)=>{
        fs.readFile(__dirname + '/../fixtures/user.md', 'utf-8', (err, data)=>{
            if (err) { return done(err); }

            fs.writeFile(file, data, (err, fd)=>{
            	if (err) {return done(err);}

                done();
            });
        });
    });

    after((done)=>{

    	fs.unlink(file, (err)=>{
    	   if (err) { done(err); }
    	   done();
        });
    });

    describe('DELETE', ()=>{
	    it('', (done)=>{

	        request(app)
	        .delete('/user_delete/7')
	        .set('Accept', 'application/json')
	        .expect(200)
	        .end((err, res)=>{
	        	if (err) { return done(err); }
	        	done();
	        });
	    });
	});
});