/* jshint esversion: 6 */
var update = require('../db-sim').update;

module.exports.update = (req, res)=>{
    'use strict';
    if (!req.params._id) { return res.status(404).json(new Error('No data was found.')); }

    update(req, res, (err, doc)=>{
        if (err) { return res.status(500).json(err); }

        return res.status(500).json(doc);
    });
};