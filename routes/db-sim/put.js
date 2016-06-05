/* jshint esversion: 6 */
var update = require('../../db-sim').update;

module.exports = (req, res)=>{
    'use strict';
    if (!req.params._id) { return res.status(404).json({'reason': 'Missing _id for data update.'}); }

    update(req, res, (err, doc)=>{
        if (err) { return res.status(500).json(err); }

        if(doc.reason) {
        	return res.status(404).json(doc);
        }
        return res.status(200).json(doc);
    });
};