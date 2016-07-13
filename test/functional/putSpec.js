/*jshint esversion: 6, strict:true */
var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../auto-api'),
    fs = require('fs'),
    _ = require('lodash');

describe('PUT routes', ()=>{
    'use strict';
    let file = __dirname + '/../../db-sim/data/user_put.lzdb';

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

    describe('PUT', ()=>{
	    it('Should change Francine Farncison document to Finny Finnyghan', (done)=>{
	    	let newData = {
    			"name": "Finny Finnyghan",
    			"age": 24,
    			"address": "Fake Street, 100"
	    	};

	        request(app)
	        .put('/user_put/7')
	        .set('Accept', 'application/json')
	        .send(newData)
	        .expect(200)
	        .end((err, res) => {
	        	if (err) {
	        		return done(err);
	        	}
				expect(res.body.name).to.deep.equal(newData.name);
				fs.readFile(file, 'utf-8', (err, data) => {
					if (err) {
						return done(err);
					}
					data = JSON.parse('[' + data + ']');
					let index = _.findIndex(data, {'_id': 7});

					expect(data[index].name).to.deep.equal(newData.name);
					expect(data[index].name).to.deep.equal('Finny Finnyghan');
					expect(data[index].age).to.deep.equal(24);
	        		done();
				});
	        });
	    });
	    it('Should return 404 error for inexistent _id', (done)=>{
			let newData = {
    			"name": "No name",
    			"age": 0,
    			"address": "No address"
	    	};
	    	request(app)
	    	.put('/user_put/122')
	    	.set('Accept', 'application/json')
	    	.send(newData)
	    	.expect(404)
	    	.end((err, res)=>{
	    		if (err) {return done(err);}
	    		expect(res.body.reason).to.deep.equal('No data was found under the _id 122');
	    		done();
	    	});
	    });
	});
});
