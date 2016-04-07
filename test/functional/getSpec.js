/*jshint esversion: 6, strict:true */
var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app'),
    fs = require('fs');

describe('GET routes', ()=>{
    'use strict';
    let file = __dirname + '/../../db-sim/data/user_get.lzdb';

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
    	   	fs.unlink(__dirname + '/../../db-sim/data/not_a_route.lzdb', (err)=>{
    			if (err) { done(err); }
    	   		done();
        	});
        });
    });

    describe('simple GET', ()=>{
	    it('Should return an empty array', (done)=>{
	        request(app)
	        .get('/not_a_route')
	        .expect(200)
	        .end((err, res)=>{
	            if (err) {return done(err);}
	            expect(res.body).to.be.an('array');
	            expect(res.body.length).to.deep.equal(0);

	            done();
	        });
	    });
	    it('Should return a colection of users', (done)=>{
	    	request(app)
	    	.get('/user_get')
	    	.expect(200)
	    	.end((err, res)=>{
	    		if (err) {return done(err);}
	    		expect(res.body).to.be.an('array');
	    		expect(res.body.length).to.deep.equal(10);
	    		expect(res.body[0].name).to.deep.equal('Abe Abeson');
	    		expect(res.body[6].name).to.deep.equal('Francine Farncison');
	    		done();
	    	});
	    });
    });
    describe('GET:_id routes', ()=>{
	    it('Should return only one document', (done)=>{
	    	request(app)
	    	.get('/user_get/3')
	    	.expect(200)
	    	.end((err, res)=>{
	    		if (err) {return done(err);}
	    		expect(res.body).to.be.an('object');
	    		expect(res.body.name).to.deep.equal('Jonah James Jameson');
	    		expect(res.body.age).to.deep.equal(56);
	    		done();
	    	});
	    });
	    it('Should not return a document for a invalid _id', (done)=>{
	    	request(app)
	    	.get('/user_get/12')
	    	.expect(404)
	    	.end((err, res)=>{
	    		if (err) {return done(err);}
	    		expect(res.body).to.be.an('object');
	    		expect(res.body).to.have.property('reason');
	    		expect(res.body.reason).to.deep.equal('Data in /user_get/12 not found.');
	    		done();
	    	});
	    });
    });
});