/* jshint esversion: 6, strict: true*/
module.exports = (req, res, next)=>{
    'use strict';

    let indexes = [];

    for (let i in req.path) {
    	if (req.path[i] === '/') {
    		indexes.push(parseInt(i));
    	}
    }

//console.log(indexes, lastSlash)

	if (indexes.length === 2){
        req.params._id = req.path.substring(indexes[1] + 1, req.path.length);
        req.url = req.path.substring(0, indexes[1]);
	}

	if (indexes.length === 3) {
		req.params.limit = parseInt(req.path.substring(indexes[1] + 1, indexes[2]));
		req.params.skip = parseInt(req.path.substring(indexes[2] + 1, req.path.length));
		req.url = req.path.substring(0, indexes[1]);

		if (isNaN(req.params.limit) || isNaN(req.params.skip)) {
			return next(new Error('Limit and Skip must be an number'));
		}
	}
    return next();
};