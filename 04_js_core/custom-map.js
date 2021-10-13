"use strict";

Array.prototype.customMap = function (callback, thisValue) {
    var arrayNew = [];

    if (thisValue) {
        for (var index = 0; index < this.length; index++) {
            arrayNew[index] = callback.call(thisValue, this[index], index, this);
        }
    } else {
        for (var index = 0; index < this.length; index++) {
            arrayNew[index] = (callback(this[index], index, this));
        }
    }

    return arrayNew;
}

console.log([1,2,3,4,5].customMap(function(x){return ++x;}));