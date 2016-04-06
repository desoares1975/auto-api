/*jshint esversion: 6, strict:true */
var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app'),
    fs = require('fs');

describe('Routes', ()=>{
    'use strict';
    let filePath = __dirname + '/../../db-sim/data/',
    	file = filePath + 'user_get.lzdb';

    before((done)=>{
        fs.readFile(__dirname + '/../fixtures/user.md', 'utf-8', (err, data)=>{
            if (err) { return done(err); }
            fs.writeFile(file, data, (err, fd)=>{
            	if (err) {return done(err);}
            });

            fs.writeFile(filePath + 'user_post.lzdb', data, (err, fd)=>{
                if (err) {return done(err);}
            });
        });

        done();
    });

    after((done)=>{

    	fs.unlink(file, (err)=>{
    		if (err) { done(err); }
    	});
    	fs.unlink(filePath + 'not_a_route.lzdb', (err)=>{
    		if (err) { done(err); }
    	});
        fs.unlink(filePath + 'user_post.lzdb', (err)=>{
            if (err) { done(err); }
        });
    	done();
    });

    describe('POST', ()=>{
        it('Should create a new user and return it', (done)=>{
            let newUser = {
                'name': 'Fabio Dias Soare',
                'age': '41',
                'address': 'Dr. Jaci, 307'
            };

            request(app)
            .post('/user_post')
            .set('Accept', 'application/json')
            .send(newUser)
            .expect(200)
            .end((err, res)=>{
                if (err) {return done(err);}
                expect(res.body).to.have.property('_id');
                expect(res.body.name).to.deep.equal(newUser.name);
                fs.readFile(filePath + 'user_post.lzdb', 'utf-8', (err, data)=>{
                    if (err) {return done(err);}
                    data = JSON.parse('['+data+']');

                    expect(data[data.length - 1].name).to.deep.equal(newUser.name);
                    done();
                });
            });
        });
    });

    describe('Root directory', ()=>{
    	it('Should return default app.rootPage', (done)=>{
    		request(app)
    		.get('/')
    		.expect(200)
    		.end((err, res)=>{
    			expect(res.body.title).to.deep.equal('Welcome to LazyAPI.');
    			expect(res.body).to.have.property('message');
    			expect(res.body.readme).to.deep.equal('/home/desoares/projetos/lazy-apipublic/documentation/README.md');
    			done();
    		});
    	});
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
    describe('GET', ()=>{
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
	    		expect(res.body).to.be.an('array');
	    		expect(res.body.length).to.deep.equal(10);
	    		expect(res.body[0].name).to.deep.equal('Abe Abeson');
	    		expect(res.body[6].name).to.deep.equal('Francine Farncison');
	    		done();
	    	});
	    });
	    it('Should return only one document', (done)=>{
	    	request(app)
	    	.get('/user_get/3')
	    	.expect(200)
	    	.end((err, res)=>{
	    		expect(res.body).to.be.an('object');
	    		expect(res.body.name).to.deep.equal('Jonah James Jameson');
	    		expect(res.body.age).to.deep.equal(56);
	    		done();
	    	});
	    });
	    it('Should nor return a document for a invalid _id', (done)=>{
	    	request(app)
	    	.get('/user_get/12')
	    	.expect(404)
	    	.end((err, res)=>{
	    		expect(res.body).to.be.an('object');
	    		expect(res.body).to.have.property('reason');
	    		expect(res.body.reason).to.deep.equal('Data in /user_get/12 not found.');
	    		done();
	    	});
	    });
    });
});