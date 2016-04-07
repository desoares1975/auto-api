/*jshint esversion: 6, strict:true */
var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app'),
    fs = require('fs');

describe('POST routes', ()=>{
    'use strict';
    let file = __dirname + '/../../db-sim/data/user_post.lzdb',
        newFile = __dirname + '/../../db-sim/data/test_document.lzdb';

    before((done)=>{
        fs.readFile(__dirname + '/../fixtures/user.md', 'utf-8', (err, data)=>{
            if (err) { return done(err); }
            fs.writeFile(file, data, (err, fd)=>{
                if (err) {return done(err);}
            });
            done();
        });
    });

    after((done)=>{

    	fs.unlink(file, (err)=>{
    	   if (err) { done(err); }
        });
        fs.unlink(newFile, (err)=>{
           if (err) { done(err); }
        });
        done();
    });

    describe('POST', ()=>{
        it('Should create a new user in exiting file and return it', (done)=>{
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
                fs.readFile(file, 'utf-8', (err, data)=>{
                    if (err) {return done(err);}
                    data = JSON.parse('[' + data +']');
                    let index = data.length - 1;

                    expect(data[index].name).to.deep.equal(newUser.name);
                    expect(data[index].age).to.deep.equal(newUser.age);
                    expect(data[index].address).to.deep.equal(newUser.address);
                    done();
                });
            });
        });
        it('Should save a document in a new collection an return it', (done)=>{
            let newDoc = {
                'title': 'Testing Document Creation on Route',
                'content': 'Asynchronous programming with callbacks may not be something unique to JavaScript and Node.js, ' +
                'but they are responsible for its popularity. With other programming languages, we are accustomed to the' +
                'predictable order of execution where two statements will execute one after another...',
                'arrayData': [1, 'a', {'b': 2}],
                'objectData': {'1': 'a', 'c': 12}
            };

            request(app)
            .post('/test_document')
            .set('Accept', 'application/json')
            .send(newDoc)
            .expect(200)
            .end((err, res)=>{
                if (err) {return done(err);}
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('content');
                expect(res.body).to.have.property('arrayData');
                expect(res.body).to.have.property('objectData');
                expect(res.body.arrayData).to.be.an('array');
                expect(res.body.arrayData[2]).to.be.an('object');
                fs.readFile(newFile, 'utf-8', (err, data)=>{
                    if (err) {return done(err);}
                    data = JSON.parse('[' + data +']');
                    let index = data.length - 1;

                    expect(data[index].arrayData).to.deep.equal(newDoc.arrayData);
                    expect(data[index].title).to.deep.equal(newDoc.title);
                    expect(data[index].objectData).to.deep.equal(newDoc.objectData);
                    expect(data[index].content).to.deep.equal(newDoc.content);
                    done();
                });
            });
        });
    });
});