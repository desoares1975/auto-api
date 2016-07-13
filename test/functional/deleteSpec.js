'use strict';

const expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../auto-api'),
    fs = require('fs'),
    _ = require('lodash');

describe('DELETE routes', ()=>{
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
	    it('Should delete the frist document', (done)=>{
	        request(app)
	        .delete('/user_delete/1')
	        .set('Accept', 'application/json')
	        .expect(200)
	        .end((err, res)=>{
	        	if (err) { return done(err); }
	        	fs.readFile(file, 'utf-8', (err, data)=>{
	        		if (err) { return done(err); }
	        		data = JSON.parse('[' + data + ']');
	        		let index = _.findIndex(data, {'_id': 1});
	        		expect(data.length).to.deep.equal(9);
	        		expect(index).to.deep.equal(-1);
	        		done();
	        	});
	        });
	    });
	    it('Should return 404 when trying to delete inexitent document', (done)=>{
	    	request(app)
	    	.delete('/user_delete/1')
	    	.expect(404)
	    	.end((err, res)=>{
	    		if (err) { return done(err); }
	    		fs.readFile(file, 'utf-8', (err, data)=>{
	    			if (err) { return done(err); }
	    			data = JSON.parse('[' + data + ']');
	    			expect(data.length).to.deep.equal(9);
	    			done();
	    		});
	    	});
	    });
	});
});
