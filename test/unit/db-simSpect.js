/* jshint esversion: 6, strict: true */

var expect = require('chai').expect,
    fs = require('fs'),
    db = require('../../db-sim'),
    Response = require('mock-response');

describe('Testing dbSim CRUD ',  () => {
    'use strict';

    before(() => {

            fs.readFile(__dirname + '/../fixtures/user.md', 'utf-8', (err, data)=>{
                if (err) {throw err;}

                fs.writeFile(__dirname + '/../../db-sim/data/user_test.lzdb', data, (err, beforeFd) => {
                    if (err) {throw err;}

                });
            });
    });

    after((done)=>{

        fs.unlink(__dirname + '/../../db-sim/data/test.lzdb', (err) => {
            if (err) {done(err);}

        });
        fs.unlink(__dirname + '/../../db-sim/data/user_test.lzdb', (err) => {
            if (err) {done(err);}

        });
        fs.unlink(__dirname + '/../../db-sim/data/test_new_file.lzdb', (err) => {
            if (err) {done(err);}
        });

        done();
    });

    describe('Crud object', ()=>{
        it('Should return the CRUD object', (done) => {
            expect(db).to.be.an('object');
            done();
        });
        it('Should have all the four methods', (done) => {
            expect(db).to.have.property('create');
            expect(db).to.have.property('read');
            expect(db).to.have.property('update');
            expect(db).to.have.property('delete');
            done();
        });
    });

    describe('create', ()=>{
        it('Should return no document and create db file', (done) => {
            let res = new Response('/test'),
                req = {};

            req.path = 'test';
            var test = db.create(req, res, (err, data) => {
                if (err) {throw err;}

                expect(data).to.deep.equal(undefined);
                done();
            });
        });
        it('Should save document and return it', (done) => {
            let res = new Response('/test'),
                req = {};

            req.path = 'test';
            req.body = {
                'data0': 'Test data 0',
                'data1': 'Test data 1',
                'data3': 1000,
                'data4': ['a', 'e', 'i', 'o', 'u']
            };

            db.create(req, res, (err, data) => {
                //let file = __dirname + '/../../db-sim/data/test.lzdb';

                if (err) {
                    throw err;
                }
                expect(data).to.have.property('_id');
                expect(data.data0).to.deep.equal('Test data 0');
                expect(data.data3).to.be.an('number');
                expect(data.data4).to.be.an('Array');
                expect(data.data4.length).to.deep.equal(5);

            });
                done();

        });
        it('Should create file, save document and return it', (done) => {
            let fileName = 'test_new_file',
                file = __dirname + '/../../db-sim/data/' + fileName + '.lzdb',
                res = new Response('/' + fileName),
                req = {};

            req.path = fileName;
            req.body = {
                'data0': 'Test data 0',
                'data1': 'Test data 1',
                'data3': 1000,
                'data4': ['a', 'b', 'c', 'd', 'e']
            };

            db.create(req, res, (err, data) => {
                expect(data).to.have.property('_id');
                expect(data.data0).to.deep.equal('Test data 0');
                expect(data.data3).to.be.an('number');
                expect(data.data4).to.be.an('Array');
                expect(data.data4.length).to.deep.equal(5);
                //testing data on the file
                fs.open(file, 'r', (err, fd)=>{

                    fs.readFile(file, 'utf-8', (err, storedData)=>{
                        if (err) {throw err;}

                        storedData = '[' + storedData + ']';

                        storedData = JSON.parse(storedData);
                        expect(storedData.length).to.deep.equal(1);
                        expect(storedData[0]._id).to.deep.equal(data._id);
                        expect(storedData[0].data0).to.deep.equal('Test data 0');
                        expect(storedData[0].data3).to.be.an('number');
                        expect(storedData[0].data4).to.deep.equal(['a', 'b', 'c', 'd', 'e']);

                        done();
                    });
                });
            });
        });
        it('Should append document to file and return it', (done) => {
            let fileName = 'test_new_file',
                res = new Response('/' + fileName),
                req = {};

            req.path = fileName;
            req.body = {
                'data0': 'Test data 0-1',
                'data1': 'Test data 1-1',
                'data3': 3000,
                'data4': [1, 2, 3, 4, 5]
            };

            db.create(req, res, (err, data) => {
                if (err) {throw err;}

                let file = __dirname + '/../../db-sim/data/' + fileName + '.lzdb';

                expect(data.data0).to.deep.equal('Test data 0-1');
                expect(data.data3).to.be.an('number');
                expect(data.data4).to.be.an('Array');
                expect(data.data4.length).to.deep.equal(5);
                fs.open(file, 'r', (err, fdRead)=>{

                    fs.readFile(file, 'utf-8', (err, storedData)=>{
                        if (err) {throw err;}

                        storedData = '[' + storedData + ']';
                        storedData = JSON.parse(storedData);
                        expect(storedData.length).to.deep.equal(2);
                        expect(storedData[0].data0).to.deep.equal('Test data 0');
                        expect(storedData[0].data3).to.be.an('number');
                        expect(storedData[0].data4).to.deep.equal(['a', 'b', 'c', 'd', 'e']);

                        done();
                    });
                });
            });
        });
        it('Should parse req.path, save document and return it', (done) => {
            let fileName = 'test_new_file',
                res = new Response('/' + fileName + '/2'),
                req = {};

            req.path = fileName + '/2';
            req.url = fileName;
            req.body = {
                'data0': 'Test data 15',
                'data1': 'Test data 02',
                'data3': 1975,
                'data4': [15,7,11,13]
            };

            db.create(req, res, (err, data) => {
                if (err) {throw err;}

                let file = __dirname + '/../../db-sim/data/' + fileName + '.lzdb';

                expect(data.data0).to.deep.equal('Test data 15');
                expect(data.data3).to.be.an('number');
                expect(data.data4).to.be.an('Array');
                expect(data.data4.length).to.deep.equal(4);
                fs.open(file, 'r', (err, fdRead)=>{

                    fs.readFile(file, 'utf-8', (err, storedData)=>{
                        if (err) {throw err;}

                        storedData = '[' + storedData + ']';
                        storedData = JSON.parse(storedData);
                        expect(storedData.length).to.deep.equal(3);
                        expect(storedData[0].data0).to.deep.equal('Test data 0');
                        expect(storedData[0].data3).to.be.an('number');
                        expect(storedData[0].data4).to.deep.equal(['a', 'b', 'c', 'd', 'e']);

                        done();
                    });
                });
            });
        });
    });

    describe('read', ()=>{
        it('Should find first document of data set', (done) => {
            let res = new Response('/user_test'),
                req = {};

            req.path = 'user_test';
            req.limit = 1;
            db.read(req, res, function (err, data) {
                if (err) {throw err;}

                expect(data).to.be.an('object');
                expect(data.name).to.deep.equal("Abe Abeson");
                done();
            });
        });
        it('Should return array of length 10 with limit 12', (done) => {
            let res = new Response('/user_test'),
                req = {};

            req.path = 'user_test';
            req.limit = 12;
            db.read(req, res, function (err, data) {
                if (err) {
                    throw err;
                }

                expect(data.length).to.deep.equal(10);
                expect(data[0].name).to.deep.equal("Abe Abeson");
                done();
            });
        });
        it('Should return array of 5 with limit 5', (done) => {
            let res = new Response('/user_test'),
                req = {};

            req.path = 'user_test';
            req.limit = 5;
            db.read(req, res, function (err, data) {
                if (err) {throw err;}

                expect(data.length).to.deep.equal(5);
                expect(data[0].name).to.deep.equal("Abe Abeson");
                done();
            });
        });
        it('Should return all the documents in the collection', (done) => {

            let res = new Response('/user_test'),
                req = {};

            req.path = 'user_test';
            db.read(req, res, function (err, data) {
                if (err) {throw err;}

                expect(data.length).to.deep.equal(10);
                expect(data[0].name).to.deep.equal("Abe Abeson");
                done();
            });
        });
        it('Should return array of 3 documents skipping first 2', (done) => {

            let res = new Response('/user_test'),
                req = {};

            req.path = 'user_test';
            req.skip = 2;
            req.limit = 3;
            db.read(req, res, function (err, data) {
                if (err) {throw err;}

                expect(data.length).to.deep.equal(3);
                expect(data[0].name).to.deep.equal("Jonah James Jameson");
                expect(data[2].name).to.deep.equal("Eliot Otson");
                done();
            });
        });
    });
    describe('update', ()=>{
        it ('Should update _id: 10 document, return it and check data file for the changes', (done) => {
            let res = new Response('/user_test'),
                req = {};

                fs.readFile(__dirname + '/../../db-sim/data/user_test.lzdb', 'utf-8', (err, data)=>{
                    if (err) {throw err;}

                    data = JSON.parse('['+ data +']')[9];

                    expect(data.age).to.deep.equal(83);
                    data.address = 'Dead Street, 1000';
                    data.age = 99;
                    req.path = 'user_test';
                    req.body = data;
                    req.params = {};
                    req.params._id = data._id;

                    db.update(req, res, (err, change) => {
                        expect(change._id).to.deep.equal(10);
                        expect(change.address).to.deep.equal('Dead Street, 1000');

                        fs.readFile(__dirname + '/../../db-sim/data/user_test.lzdb', 'utf-8', (err, retriveData)=>{
                            if (err) {throw err;}

                            retriveData = JSON.parse('[' + retriveData + ']')[9];
                            expect(retriveData._id).to.deep.equal(10);
                            expect(retriveData.address).to.deep.equal('Dead Street, 1000');
                            expect(retriveData.age).to.deep.equal(99);
                            done();
                        });
                    });
                });

        });
        it ('Should update _id: 6 document, return it and check data file for the changes', (done) => {
            let res = new Response('/user_test'),
                req = {},
                file = __dirname + '/../../db-sim/data/user_test.lzdb';

                fs.readFile(file, 'utf-8', (err, data)=>{
                    if (err) {throw err;}

                    data = JSON.parse('['+ data +']')[5];

                    expect(data.name).to.deep.equal('David Davidson');
                    expect(data.age).to.deep.equal(32);
                    data.name = "Fabio Desoares";
                    data.address = 'Dr. Girlfriend, 101';
                    data.age = 41;
                    req.path = 'user_test';
                    req.body = data;
                    req.params = {};
                    req.params._id = data._id;

                    db.update(req, res, (err, change) => {
                        expect(change._id).to.deep.equal(6);

                        fs.readFile(file, 'utf-8', (err, retriveData)=>{
                            if (err) {throw err;}

                            retriveData = JSON.parse('[' + retriveData + ']')[5];
                            expect(retriveData._id).to.deep.equal(6);
                            expect(retriveData.name).to.deep.equal('Fabio Desoares');
                            expect(retriveData.address).to.deep.equal('Dr. Girlfriend, 101');
                            expect(retriveData.age).to.deep.equal(41);
                            done();
                        });
                    });
                });

        });
    });
    describe('delete', ()=>{
        it('Should delete _id: 4 document', (done) => {
            let res = new Response('/user_test'),
                req = {},
                file = __dirname + '/../../db-sim/data/user_test.lzdb';

            req.path = 'user_test';
            req.body = {'_id': 4};
            db.delete(req, res, (err, deleted) => {
                if (err) {
                    throw err;
                }

                expect(deleted).to.deep.equal(true);
                fs.readFile(file, 'utf-8', (err, data)=>{
                    data = JSON.parse('[' + data + ']');

                    expect(data.length).to.deep.equal(9);
                });
                done();
            });
        });

        it('Should not delete alread deleted document', (done)=>{
            let res = new Response('/user_test'),
                req = {},
                file = __dirname + '/../../db-sim/data/user_test.lzdb';

            req.path = 'user_test';
            req.body = {'_id': 4};
            db.delete(req, res, (err, deleted) => {
                expect(err).to.deep.equal('NO_DATA_TO_DELETE');
                expect(deleted).to.deep.equal(undefined);
                fs.readFile(file, 'utf-8', (err, data)=>{
                    data = JSON.parse('[' + data + ']');
                    expect(data.length).to.deep.equal(9);
                });
                done();
            });
        });
    });
});
