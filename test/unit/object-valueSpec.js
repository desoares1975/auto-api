/* jshint esversion: 6, strict: true */
var expect = require('chai').expect,
	objectValue = require('../../lib/object-value'),
	myObject = {
		key0: 'value0',
		key1: 1,
		key2: 'value2'
	},
	myObject1 = {
		'one': 'first',
		'two': 'second',
		'three': 'trird'
	},
	empty = {},
	requester = {
		"_requesterId" : "556538d485630fb03481c81c",
		"ignored" : false
	},
	otherRequester = {
		"ignored" : false,
		"_requesterId" : "556538d485630fb03481c81c"
	};
describe('Testing object-value', function() {
	'use strict';

	var myObjArray = [
		myObject,
		myObject1,
		empty,
		requester
	];

	it('Should return the -1 array because the array is empty', function (done) {
		var checkObjInEmpArray = objectValue([], 'ignored', false);

		expect(checkObjInEmpArray).to.deep.equal(-1);
		done();
	});
	it('Should return the index of a specific object in the array', function (done) {
		var checkObjInArray = objectValue(myObjArray, 'ignored', false);

		expect(checkObjInArray).to.deep.equal(3);
		done();
	});
});