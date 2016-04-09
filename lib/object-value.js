/* jshint esversion: 6, strict: true */
module.exports = (array, property, value)=>{
    'use strict';
    if (!array.length) { return -1; }
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