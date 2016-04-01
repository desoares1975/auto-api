/* jshint esversion: 6, strict: true */

var expect = require('chai').expect,
    fs = require('fs'),
    db = require('../../db-sim'),
    Response = require('mock-response');

describe('Testing dbSim CRUD ',  () => {
    'use strict';

    before(() => {
        let file = __dirname + '/../../db-sim/data/user_test.json',
            data = require(__dirname + '/../fixtures/user.json');

            fs.writeFile(file, JSON.stringify(data), (err, fd) => {
                if (err) {
                    throw err;
                }
            });
    });

    after(() => {
        fs.unlink(__dirname + '/../../db-sim/data/test.json', (err, fd) => {
            if (err) {
                console.log(err);
            }
        });
        fs.unlink(__dirname + '/../../db-sim/data/user_test.json', (err, fd) => {
            if (err) {
                console.log(err);
            }
        });
        fs.unlink(__dirname + '/../../db-sim/data/test_new_file.json', (err, fd) => {
            if (err) {
                console.log(err);
            }
        });
    });

    it('Check if object is returned', (done) => {
        expect(db).to.be.an('object');
        done();
    });

    it('Check if db object has all the methods', (done) => {
        expect(db).to.have.property('create');
        expect(db).to.have.property('read');
        expect(db).to.have.property('update');
        expect(db).to.have.property('delete');
        done();
    });

    it('Test create method', (done) => {
        let res = new Response('/test'),
            req = {};

        req.path = 'test';
        var test = db.create(req, res, (err, data) => {

            expect(data).to.deep.equal([]);
            done();
        });
    });

    it('Test create method for an exiting file.', (done) => {
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
            let file = __dirname + '/../../db-sim/data/test.json',
                storedData = require(file);

            expect(data.index).to.deep.equal(1);
            expect(data.data0).to.deep.equal('Test data 0');
            expect(data.data3).to.be.an('number');
            expect(data.data4).to.be.an('Array');
            expect(data.data4.length).to.deep.equal(5);
            //testing data on the file
            expect(storedData.length).to.deep.equal(1);
            expect(storedData[0].data0).to.deep.equal('Test data 0');
            expect(storedData[0].data3).to.be.an('number');
            expect(storedData[0].data4).to.be.an('Array');

            done();
        });

    });

    it('Test create method with data for a non exiting file.', (done) => {
        let res = new Response('/test_new_file'),
            req = {};

        req.path = 'test_new_file';
        req.body = {
            'data0': 'Test data 0',
            'data1': 'Test data 1',
            'data3': 1000,
            'data4': ['a', 'b', 'c', 'd', 'e']
        };

        db.create(req, res, (err, data) => {
            let file = __dirname + '/../../db-sim/data/test_new_file.json',
                storedData = require(file);

            expect(data.id).to.deep.equal(1);
            expect(data.data0).to.deep.equal('Test data 0');
            expect(data.data3).to.be.an('number');
            expect(data.data4).to.be.an('Array');
            expect(data.data4.length).to.deep.equal(5);
            //testing data on the file
            expect(storedData.length).to.deep.equal(1);
            expect(storedData[0].data0).to.deep.equal('Test data 0');
            expect(storedData[0].data3).to.be.an('number');
            expect(storedData[0].data4).to.deep.equal(['a', 'b', 'c', 'd', 'e']);

            done();
        });
    });

    it('Test create method with data for a exiting file with data.', (done) => {
        let res = new Response('/test_new_file'),
            req = {};

        req.path = 'test_new_file';
        req.body = {
            'data0': 'Test data 0-1',
            'data1': 'Test data 1-1',
            'data3': 3000,
            'data4': [1, 2, 3, 4, 5]
        };

        db.create(req, res, (err, data) => {
            let file = __dirname + '/../../db-sim/data/test_new_file.json',
                storedData = require(file);

            expect(data.data0).to.deep.equal('Test data 0-1');
            expect(data.data3).to.be.an('number');
            expect(data.data4).to.be.an('Array');
            expect(data.data4.length).to.deep.equal(5);
            //testing data on the file
            expect(storedData.length).to.deep.equal(2);
            expect(storedData[1].data0).to.deep.equal('Test data 0-1');
            expect(storedData[1].data3).to.be.an('number');
            expect(storedData[0].data4).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
            expect(storedData[1].data4).to.deep.equal([1, 2, 3, 4, 5]);

            done();
        });
    });

    it('Test read method', (done) => {
        let res = new Response('/user_test'),
            req = {};

        req.path = 'user_test';
        req.limit = 1;
        db.read(req, res, function (err, data) {
            if (err) {
                throw err;
            }

            expect(data).to.be.an('object');
            expect(data.name).to.deep.equal("Abe Abeson");
            done();
        });
    });

    it('Test read method limit greater than the array (12)', (done) => {
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

    it('Test read method limit 5', (done) => {
        let res = new Response('/user_test'),
            req = {};

        req.path = 'user_test';
        req.limit = 5;
        db.read(req, res, function (err, data) {
            if (err) {
                throw err;
            }

            expect(data.length).to.deep.equal(5);
            expect(data[0].name).to.deep.equal("Abe Abeson");
            done();
        });
    });

    it('Test read method with no limit', (done) => {

        let res = new Response('/user_test'),
            req = {};

        req.path = 'user_test';
        db.read(req, res, function (err, data) {
            if (err) {
                throw err;
            }

            expect(data.length).to.deep.equal(10);
            expect(data[0].name).to.deep.equal("Abe Abeson");
            done();
        });
    });

    it('Test read method with limit and skip', (done) => {

        let res = new Response('/user_test'),
            req = {};

        req.path = 'user_test';
        req.skip = 2;
        req.limit = 3;
        db.read(req, res, function (err, data) {
            if (err) {
                throw err;
            }

            expect(data.length).to.deep.equal(3);
            expect(data[0].name).to.deep.equal("Chalie Charlison");
            expect(data[2].name).to.deep.equal("Eliot Otson");
            done();
        });
    });

    it ('Test update method', (done) => {
        let res = new Response('/user_test'),
            req = {},
            data = require(__dirname + '/../../db-sim/data/user_test.json')[8];
            expect(data.age).to.deep.equal(83);
            data.address = 'Dead Street, 1000';
            data.age = 99;

        req.path = 'user_test';
        req.body = data;

        db.update(req, res, (err, data) => {
            expect(data.index).to.deep.equal(9);
            let retriveData = require(__dirname + '/../../db-sim/data/user_test.json')[8];
            expect(retriveData.address).to.deep.equal('Dead Street, 1000');
            expect(retriveData.age).to.deep.equal(99);
            done();
        });
    });

    it('Test delete method', (done) => {
        let res = new Response('/user_test'),
            req = {};

        req.path = 'user_test';
        req.body = {'index': 4};
        db.delete(req, res, (err, deleted) => {
            if (err) {
                throw err;
            }

            expect(deleted).to.deep.equal(true);

            done();
        });
    });
});
