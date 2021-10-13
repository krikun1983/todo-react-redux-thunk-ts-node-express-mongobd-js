"use strict";

function solutionTaskOne() {
    var stringIn = document.querySelector('.task-01-in').value;
    var stringOut = document.querySelector('.task-01-out');
    var stringInValidEqualsContains = stringIn.indexOf('=') === -1;
    var stringInValidEqualsOne = stringIn.match(/=/g).length > 1;
    var stringInValid = /((-|\+|\*|\/)(\s*[а-яА-ЯЁёa-zA-Z\[\]()!&?`,#$@^_%<>]+)|((-|\+|\*|\/){2,})|(\d+[-|\+|\*|\/]\W+))/g;
    var regForStringWithoutExtra = /\s+|[а-яА-ЯЁёa-zA-Z\[\]()!&?`,#$@^_%<>=]+(=\s*\d*)/g;

    if (stringInValidEqualsContains || stringInValidEqualsOne || stringInValid.test(stringIn)) {
        return stringOut.innerHTML = 'valid error';
    }

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

document.querySelector('.task-01-btn').onclick = solutionTaskOne;