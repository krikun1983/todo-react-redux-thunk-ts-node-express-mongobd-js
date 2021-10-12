"use strict";

function fn1() {
    var stringIn = document.querySelector('.task-01-in').value;
    var stringOut = document.querySelector('.task-01-out');

    if (stringIn.indexOf('=') === -1 || stringIn.match(/=/g).length > 1 || /((-|\+|\*|\/)(\s*[а-яА-ЯЁёa-zA-Z\[\]()!&?`,#$@^_%<>]+)|((-|\+|\*|\/){2,})|(\d+[-|\+|\*|\/]\W+))/g.test(stringIn)) {
        return stringOut.innerHTML = 'valid error';
    }

    var regForStringWithoutExtra = /\s+|[а-яА-ЯЁёa-zA-Z\[\]()!&?`,#$@^_%<>=]+(=\s*\d*)/g;
    var stringNew = stringIn.replace(regForStringWithoutExtra, '');

    var arrayNumber = stringNew.match(/(\d+)(\.)?(\d*)?/g);
    var arrayMathSymbols = stringNew.match(/\+|-|\/|\*/g);
    var result = 0;
    var startIndexOfNumber = 0;

    if (!(/\+|-|\/|\*/.test(stringNew[0]))) {
        result = +arrayNumber[0];
        startIndexOfNumber = 1;
    }

    for (var i = startIndexOfNumber, k = 0; k < arrayMathSymbols.length; i++, k++) {
        switch (arrayMathSymbols[k]) {
            case '*': result *= parseFloat(arrayNumber[i]);
                break;
            case '/': result /= parseFloat(arrayNumber[i]);
                break;
            case '+': result += parseFloat(arrayNumber[i]);
                break;
            case '-': result -= parseFloat(arrayNumber[i]);
                break;
        }
    }

    stringOut.innerHTML = result.toFixed(2);
}
document.querySelector('.task-01-btn').onclick = fn1;

function fn2() {
    var stringIn = document.querySelector('.task-02-in').value;
    var stringOut = document.querySelector('.task-02-out');

    var regForStringWithoutExtra = /[^!\.?,;:\s$]+/gi;
    var arrayWords = stringIn.match(regForStringWithoutExtra);

    if (!arrayWords) {
        return stringOut.innerHTML = stringIn;
    }
    var arrayCharOfWordOne = arrayWords[0].split('');

    var result = arrayCharOfWordOne.filter(function (char) {
        return arrayWords.every(function (elem) {
            return elem.toLowerCase().includes(char.toLowerCase());
        })
    })

    if (result[0] === '^' || result[0] === '\\') {
        var reg = '[\\' + result.join('') + ']';
    } else {
        var reg = '[' + result.join('') + ']';
    }

    stringOut.innerHTML = stringIn.replace(new RegExp(reg, "gi"), '');
}
document.querySelector('.task-02-btn').onclick = fn2;