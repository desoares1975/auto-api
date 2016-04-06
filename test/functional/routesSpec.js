/*jshint esversion: 6, strict:true */
var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app'),
    fs = require('fs');

describe('Create or Get route', ()=>{
    'use strict';
    let filePath = __dirname + '/../../db-sim/data/',
    	file = filePath + 'user_func_test.lzdb';
    before((done)=>{
        'use strict';

        fs.readFile(__dirname + '/../fixtures/user.md', 'utf-8', (err, data)=>{
            if (err) { return done(err); }
            fs.writeFile(file, data, (err, fd)=>{
            	if (err) {return done(err);}
            });
        	done();
        });
    });

    after((done)=>{
    	'use strict';

    	fs.unlink(file, (err)=>{
    		if (err) { done(err); }
    	});
    	fs.unlink(filePath + 'not_a_route.lzdb', (err)=>{
    		if (err) { done(err); }
    	});
    	done();
    });

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
});