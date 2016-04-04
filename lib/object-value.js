module.exports.value = function (array, key, value) {
    if (array.length === 0) { return false; }

    return array.some(function (elemento) {
        return elemento[key] == value;
    });
};

module.exports.index = function (array, property, value) {
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

module.exports.indexOfTwo = function (array, property1, property2, value1, value2) {
    var size = array.length;

    if (size === 0 || !property1 || !property2) {
        return -1;
    }

    for (var i = 0; i < size; i++) {

        var item = JSON.parse(JSON.stringify(array[i]));

        if (item.hasOwnProperty(property1) && item.hasOwnProperty(property2)) {

            if(item[property1] == value1 && item[property2] == value2) {
                return i;
            }
        }
    }

    return -1;
};