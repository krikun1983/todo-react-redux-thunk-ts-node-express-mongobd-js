"use strict";

function solutionTaskOne() {
    var stringIn = document.querySelector('.task-01-in').value;
    var stringOut = document.querySelector('.task-01-out');
    var stringInValidEqualsContains = stringIn.indexOf('=') === -1;
    var regStringInValid = /((-|\+|\*|\/)(\s*[а-яА-ЯЁёa-zA-Z\[\]()!&?`,#$@^_%<>]+)|((-|\+|\*|\/){3,})|(\d+[-|\+|\*|\/]+(\s)*=)|(\/{2})|(\*{2})|^(\+|-|\/|\*){2,})/g;
    var regForStringWithoutExtra = /\s+|[а-яА-ЯЁёa-zA-Z\[\]()!&?`,#$@^_%<>=]+(=\s*\d*)/g;
    var regForArrayNumber = /(((?<=\+|-|\*|\\)(\+|-))([0-9]))|(\d+)(\.)?(\d*)?/g;
    var regSymbols = /\+|-|\/|\*/g;

    if (stringInValidEqualsContains || stringIn.match(/=/g).length > 1 || regStringInValid.test(stringIn)) {
        return stringOut.innerHTML = 'valid error';
    }

    var stringWithoutExtra = stringIn.replace(regForStringWithoutExtra, '');
    var arrayNumber = stringWithoutExtra.match(regForArrayNumber);
    var stringWithoutExtraAndWithOutUnary = stringWithoutExtra.replace(regForArrayNumber, '');
    var arrayMathSymbols = stringWithoutExtraAndWithOutUnary.match(regSymbols);
    var result = 0;
    var startIndexOfNumber = 0;

    if (!(regSymbols.test(stringWithoutExtra[0]))) {
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

document.querySelector('.task-01-btn').onclick = solutionTaskOne;