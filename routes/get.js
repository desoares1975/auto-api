/* jshint esversion: 6 */
var db = require('../db-sim').read;

module.exports.read = (req, res)=>{
    'use strict';

    db(req, res, (err, doc)=>{
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(doc);
    });
};