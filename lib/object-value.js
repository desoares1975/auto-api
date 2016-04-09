/* jshint esversion: 6, strict: true */

module.exports = function (array, property, value) {
    'use strict';

    if (array.length === 0) { return -1; }

    var size = array.length;

    for (var i = 0; i < size; i++) {
        if (array[i].hasOwnProperty(property)){

            if (array[i][property] == value) {
                return i;
            }
        }
    }

    return -1;
};