/* jshint esversion: 6, strict: true*/
var expect = require('chai').expect,
 	preLoad = require('../../lib/pre-load'),
 	fs = require('fs');

describe('Pre load of data', ()=>{
	'use strict';

	it('Should return an error for lacking of files', (done)=>{
		preLoad([], (err, ok)=>{
			expect(err.message).to.equal('Can\'t Load data with no file listed.');
			done();
		});
	});
	it('Should return ok for loading filles', (done)=>{
		preLoad([__dirname + '/../fixtures/cities_test.json', __dirname + '/../fixtures/social_test'], (err, ok)=>{
			expect(ok).to.equal(true);
			fs.readFile(__dirname + '/../../db-sim/data/cities.lzdb', 'utf-8', (err, data)=>{
				if (err) {return done(err); }
				//////////need to test the data in the final files
				done();
			});
		});
	});
});