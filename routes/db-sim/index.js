'use strict';

const create = require('./post'),
    read = require('./get'),
    update = require('./put'),
    remove = require('./delete');

module.exports = {
    'create': create,
    'read': read,
    'update': update,
    'remove': remove
};
