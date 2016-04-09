/* jshint esversion: 6 */
var read = require('../db-sim').read,
    objIndex = require('../lib/object-value');

module.exports.read = (req, res)=>{
    'use strict';

    read(req, res, (err, doc)=>{

        if (err) {
            return res.status(500).json(err);
        }

        if (!req.params._id && (!doc || doc.length === 0)) {
            return res.status(200).json([]);
        }

        if (req.params._id) {
            let index = objIndex(doc, '_id', req.params._id);
            if (!doc[index]){
                return res.status(404).json({'reason': 'Data in ' + (req.url || req.path) + '/' +
                req.params._id + ' not found.'});
            }

            return res.status(200).json(doc[index]);
        }

        return res.status(200).json(doc);
    });
};