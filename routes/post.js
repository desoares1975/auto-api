/* jshint esversion: 6, strict: true */
var db = require('../db-sim').create;

module.exports.create = (req, res)=>{
	'use strict';

	db(req, res, (err, data)=>{
		if (err) {return res.status(500).json(err);}

		return res.status(200).json(data);
	});
};
