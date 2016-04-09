/* jshint esversion: 6, strict: true */
module.exports = (fileList, cb)=>{
	'use strict';

	if (!fileList || !fileList.length){
		return cb(new Error('Can\'t Load data with no file listed.'));
	}

	return cb(err, true);
};