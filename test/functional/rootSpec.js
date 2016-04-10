/*jshint esversion: 6, strict:true */
var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../auto-api');

describe('Root routes', ()=>{
    'use strict';

    describe('GET', ()=>{
    	it('Should return default app.rootPage', (done)=>{
    		request(app)
    		.get('/')
    		.expect(200)
    		.end((err, res)=>{
    			expect(res.body.title).to.deep.equal('Welcome to autoAPI.');
    			expect(res.body).to.have.property('message');
    			done();
    		});
    	});
    });
    describe('POST', ()=>{
    	it('Should return a diferent app.rootPage', (done)=>{
    		app.rootPage = {
    			'title': 'Hello, world!',
    			'message': 'Testing object change!'
    		};
    		request(app)
    		.post('/')
    		.expect(200)
    		.end((err, res)=>{
    			expect(res.body.title).to.deep.equal('Hello, world!');
    			expect(res.body.message).to.deep.equal('Testing object change!');
    			expect(res.body).to.not.have.property('readme');
    			done();
    		});
    	});
    });
});