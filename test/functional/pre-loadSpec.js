/* jshint esversion: 6, strict: true */
var expect = require('chai').expect,
	fs = require('fs'),
	preLoad = require('../../lib/pre-load'),
	app = require('../../auto-api');


describe('Pre-load', ()=>{
	'use strict';

	process.argv[4] = __dirname + '/../fixtures/social_test';
	process.argv[3] = __dirname + '/../fixtures/cities_test.json';

	let file1 = __dirname + '/../../db-sim/data/cities_test.lzdb',
		file2 = __dirname + '/../../db-sim/data/social_test.lzdb';
	afterEach((done)=>{
		fs.unlink(file1, (err)=>{
			 if (err) { return done(err); }
		});
		fs.unlink(file2, (err)=>{
			 if (err) { return done(err); }
		});
		done();
	});

	it('Should load test file using the app call for process.argv', (done)=>{
		app.doPreLoad();
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
	it('Should load test file using the app call app.preLoad', (done)=>{
		process.argv[4] = null;
		process.argv[3] = null;

		app.preLoad = [ __dirname + '/../fixtures/social_test', __dirname + '/../fixtures/cities_test.json'];
		app.doPreLoad();
		fs.readFile(file1, 'utf-8', (err, data)=>{
			if (err) { return done(err); }
			data = JSON.parse( '[' + data + ']');
			expect(data[2].city).to.equal('Palmas');
			fs.readFile(file2, 'utf-8', (err, data)=>{
				if (err) { return done(err); }
				data = JSON.parse('[' + data + ']');
				expect(data[0].site).to.equal('www.none.com');
				done();
			});
		});
	});
});