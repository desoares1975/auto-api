'use strict';

const evrIndexOf = require('every-index-of');

module.exports = (req, res, next) => {

    let indexes;

    evrIndexOf('/', req.path, (err, list) => {
		if (err) {
			return next(err);
		}

		indexes = list;

		if (indexes.length === 2){
			req.params._id = req.path.substring(indexes[1] + 1, req.path.length);
			req.url = req.path.substring(0, indexes[1]);
		}

		if (indexes.length === 3) {
			req.params.limit = parseInt(req.path.substring(indexes[1] + 1, indexes[2]));
			req.params.skip = parseInt(req.path.substring(indexes[2] + 1, req.path.length));
			req.url = req.path.substring(0, indexes[1]);

			if (isNaN(req.params.limit) || isNaN(req.params.skip)) {
				return next(new Error('Limit and Skip must be numbers'));
			}
		}

		return next();
    });

};
