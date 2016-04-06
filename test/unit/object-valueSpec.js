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
	describe('indexOfTwo', function ()  {

		it('Should find specific object in array', function (done) {
			var myObjArray = [
				myObject,
				myObject1,
				empty,
				requester
			],
			checkObjInArray = objectValue.indexOfTwo(myObjArray, '_requesterId', 'ignored', '556538d485630fb03481c81c', false);

			expect(checkObjInArray).to.deep.equal(3);
			done();
		});
		it('Should find inverse of specific object in array', function (done) {
			var myObjArray = [
				otherRequester,
				myObject,
				myObject1,
				empty
			],
			checkInvObjInArray = objectValue.indexOfTwo(myObjArray, '_requesterId', 'ignored', '556538d485630fb03481c81c', false);

			expect(checkInvObjInArray).to.deep.equal(0);
			done();
		});
		it('Should find inverse keys of specific object in array', function (done) {
			var myObjArray = [
				myObject,
				otherRequester,
				myObject1,
				empty
			],
			checkInvObjInArray = objectValue.indexOfTwo(myObjArray, 'ignored', '_requesterId', false,  '556538d485630fb03481c81c');

			expect(checkInvObjInArray).to.deep.equal(1);
			done();
		});
		it('Should not find object with only one matchng key in array', function (done) {
			var myObjArray = [
				myObject,
				requester,
				myObject1,
				empty
			],
			checkInvObjInArray = objectValue.indexOfTwo(myObjArray, 'ignored', '_requesterId', true,  '556538d485630fb03481c81c');

			expect(checkInvObjInArray).to.deep.equal(-1);
			done();
		});
	});

	describe('index', function () {
		var myObjArray = [
			myObject,
			myObject1,
			empty,
			requester
		];

		it('Should return the -1 array because the array is empty', function (done) {
			var checkObjInEmpArray = objectValue.index([], 'ignored', false);

			expect(checkObjInEmpArray).to.deep.equal(-1);
			done();
		});
		it('Should return the index of a specific object in the array', function (done) {
			var checkObjInArray = objectValue.index(myObjArray, 'ignored', false);

			expect(checkObjInArray).to.deep.equal(3);
			done();
		});
	});

	describe('value', function () {
		var myObjArray = [
			myObject,
			myObject1,
			empty,
			requester
		];

		it('Should return false for an empty array.', function (done) {
			var checkNoArrayValue = objectValue.value([], '', '');

			expect(checkNoArrayValue).to.deep.equal(false);
			done();
		});
		it('Should return true', function (done) {
			var checkValue = objectValue.value(myObjArray, 'one', 'first');

			expect(checkValue).to.deep.equal(true);
			done();
		});
	});
});