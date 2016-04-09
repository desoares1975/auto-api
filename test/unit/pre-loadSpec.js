/* jshint esversion: 6, strict: true*/
var expect = require('chai').expect,
 	preLoad = require('../../lib/pre-load');

describe('Pre load of data', ()=>{
	'use strict';

	it('Should return an error for lacking of files', (done)=>{
		preLoad([], (err, ok)=>{
			expect(err.message).to.equal('Can\'t Load data with no file listed.');
			done();
		});
	});
	it('Should return ok for loading filles', (done)=>{

		done();
	});
});