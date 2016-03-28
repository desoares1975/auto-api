/* jshint esversion: 6, strict: true */

var expect = require('chai').expect,
    fs = require('fs'),
    db = require('../../db-sim'),
    Response = require('mock-response');

describe('Testing dbSim CRUD ',  () => {
    'use strict';

    beforeEach(() => {
        let file = __dirname + '/../../db-sim/data/user.json';

        fs.open(file, 'a+', (err, fd) => {
            if (err) {
                throw err;
            }

            let data = require(__dirname + '/../fixtures/user.json');

            fs.append(file, JSON.stringify(',' + data), (err, fd) => {
                if (err) {
                    throw err;
                }
            });
        });
    });

    // after(() => {
    //     fs.unlink(__dirname + '/../../db-sim/data/test.json', (err, fd) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    //     fs.unlink(__dirname + '/../../db-sim/data/user.json', (err, fd) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    // });

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
        //req.body = {'data': ' test'};
        var test = db.create(req, res, (err, data) => {

            expect(data).to.deep.equal([]);
            done();
        });
    });

    it('Test create method for an exiting file', (done) => {
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

            expect(data.data0).to.deep.equal('Test data 0');
            expect(data.data3).to.be.an('number');
            expect(data.data4).to.be.an('Array');
            expect(data.data4.length).to.deep.equal(5);
            done();
        });
    });

    it('Test create method, with data for a non exiting file', (done) => {
        let res = new Response('/test_new_file'),
            req = {};

        req.path = 'test';
        req.body = {
            'data0': 'Test data 0',
            'data1': 'Test data 1',
            'data3': 1000,
            'data4': ['a', 'b', 'c', 'd', 'e']
        };
        db.create(req, res, (err, data) => {

            expect(data.data0).to.deep.equal('Test data 0');
            expect(data.data3).to.be.an('number');
            expect(data.data4).to.be.an('Array');
            expect(data.data4.length).to.deep.equal(5);
            done();
        });
    });

    it('Test read method', (done) => {
        let res = new Response('/user'),
            req = {};

        req.path = 'user';
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
        let res = new Response('/user'),
            req = {};

        req.path = 'user';
        req.limit = 12;
        db.read(req, res, function (err, dados) {
            if (err) {
                throw err;
            }

            expect(dados.length).to.deep.equal(10);
            expect(dados[0].name).to.deep.equal("Abe Abeson");
            done();
        });
    });

    it('Test read method limit 5', (done) => {
        let res = new Response('/user'),
            req = {};

        req.path = 'user';
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

        let res = new Response('/user'),
            req = {};

        req.path = 'user';
        db.read(req, res, function (err, dados) {
            if (err) {
                throw err;
            }

            expect(dados.length).to.deep.equal(10);
            expect(dados[0].name).to.deep.equal("Abe Abeson");
            done();
        });
    });

    it('Test read method with limit and skip', (done) => {

        let res = new Response('/user'),
            req = {};

        req.path = 'user';
        req.skip = 2;
        req.limit = 3;
        db.read(req, res, function (err, dados) {
            if (err) {
                throw err;
            }

            expect(dados.length).to.deep.equal(3);
            expect(dados[0].name).to.deep.equal("Chalie Charlison");
            expect(dados[2].name).to.deep.equal("Eliot Otson");
            done();
        });
    });
});
