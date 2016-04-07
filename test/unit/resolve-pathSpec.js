/* jshint esversion: 6, strict: true*/
var expect = require('chai').expect,
	Response = require('mock-response'),
	resolvePath = require('../../middleware/resolve-path');

describe('resolvePath', ()=>{
	'use strict';

	it('Should return an url and an _id', (done)=>{
		let res = new Response('/user/15'),
			req = {
				'path': '/user/15',
				'params': {},
				'body': {}
			};
		resolvePath(req, res, (err)=>{
			if (err) { return done(err); }

			expect(req.url).to.deep.equal('/user');
			expect(req.params._id).to.deep.equal('15');
		});
		done();
	});
	it('Should return an limit and a skip', (done)=>{
		let res = new Response('/user/5/0'),
			req = {
				'path': '/user/5/0',
				'params': {},
				'body': {}
			};

		resolvePath(req, res, (err)=>{
			if (err) { return done(err); }

			expect(req.url).to.deep.equal('/user');
			expect(req.params.limit).to.deep.equal(5);
			expect(req.params.skip).to.deep.equal(0);
		});
		done();
	});
	it('Should return error for char as limit', (done)=>{
		let res = new Response('/user/a/0'),
			req = {
				'path': '/user/a/0',
				'params': {},
				'body': {}
			};

		resolvePath(req, res, (err)=>{
			expect(err);
			done();
		});
	});
});
