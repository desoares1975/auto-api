/* jshint esversion: 6, strict: true */
var fs = require('fs'),
	async = require('async'),
 	evrIndOf = require('every-index-of');

module.exports = (fileList, encoding, cb)=>{
	'use strict';

	if (!cb) {
		cb = encoding;
		encoding = 'utf-8';
	}


	if (!fileList || !fileList.length){
		let err = 'Can\'t Load data with no file listed.';

		console.log(err);
		return cb(new Error(err));
	}

	if (fileList instanceof String) {
		fileList = [fileList];
	}

	async.series([
		(cbA)=>{
			console.log('Loadin filles, please wait...');
			cbA(null, true);
		},
		(cbA)=>{
			async.each(fileList, (file, next)=>{
				let data = fs.readFileSync(file, encoding),
					indexes = evrIndOf('/', file, (err, indexes)=>{
					if (err) { throw err; }
					return indexes;
				});

				file = file.substring(indexes[indexes.length - 1], file.length);
				let dot = file.indexOf('.');
				if (dot !== -1){
					file = file.substring(0, dot);
				}
				fs.writeFileSync(__dirname + '/../db-sim/data' + file + '.lzdb',data);
				console.log('Loading file', file);
				return next(null, fileList);
			},
			(err, data)=>{
				return cbA(null, data);
			});
		}],
		(err, result)=>{
			console.log('Done loading files.');
			return cb(null, true);
	});
};