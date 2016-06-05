/* jshint esversion: 6, strict: true */
var create = require('../../db-sim').create;

module.exports = (req, res)=>{
	'use strict';

	create(req, res, (err, data)=>{
		if (err) {return res.status(500).json(err);}

		return res.status(200).json(data);
	});
};
