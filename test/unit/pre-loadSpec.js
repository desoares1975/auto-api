/* jshint esversion: 6, strict: true*/
var expect = require('chai').expect,
 	preLoad = require('../../lib/pre-load'),
 	fs = require('fs');

describe('Pre load of data', ()=>{
	'use strict';

	let file1 = __dirname + '/../../db-sim/data/cities_test.lzdb',
		file2 = __dirname + '/../../db-sim/data/social_test.lzdb';

	after((done)=>{
		fs.unlink(file1, (err)=>{
			 if (err) { return done(err); }
		});
		fs.unlink(file2, (err)=>{
			 if (err) { return done(err); }
		});
		done();
	});

	it('Should return an error for lacking of files', (done)=>{
		preLoad([], (err, ok)=>{
			expect(err.message).to.equal('Can\'t Load data with no file listed.');
			done();
		});
	});
	it('Should return ok for loading filles', (done)=>{
		preLoad([__dirname + '/../fixtures/cities_test.json', __dirname + '/../fixtures/social_test'], (err, ok)=>{
			expect(ok).to.equal(true);
			fs.readFile(file1, 'utf-8', (err, data)=>{
				if (err) { return done(err); }
				data = JSON.parse( '[' + data + ']');
				expect(data[0].city).to.equal('Sao Paulo');
				fs.readFile(file2, 'utf-8', (err, data)=>{
					if (err) { return done(err); }
					data = JSON.parse('[' + data + ']');
					expect(data[4].site).to.equal('ares.net');
					done();
				});
			});
		});
	});
});
