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

function fn3() {
    var stringIn = document.querySelector('.task-03-in-string').value;
    var stringDate = document.querySelector('.task-03-in-date').value;
    var stringSelect = document.querySelector('.task-03-in-select').value;
    var stringOut = document.querySelector('.task-03-out');
    var seconds = new Date().getSeconds();

    if (!stringIn || !stringDate) {
        return stringOut.innerText = 'Please, you must fill in the fields: New Date and String';
    }
    stringOut.innerHTML = new Date(stringDate).format(stringIn, seconds, stringSelect);
}

Date.prototype.format = function (dateString, seconds, stringSelect) {
    var regOfString = /y{4}|y{2}|M{1,4}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}/g;
    var arrayOfString = dateString.match(regOfString);

    var date = {
        year: this.getFullYear(),
        month: this.getMonth(),
        day: this.getDate(),
        hours: this.getHours(),
        minutes: this.getMinutes(),
        seconds: seconds,
    }

    function addZeroToDate(dateOfString) {
        return dateOfString.length !== 1 ? dateOfString : '0' + dateOfString;
    }

    if (stringSelect === 'english') {
        var monthsSelect = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    } else if (stringSelect === 'russian') {
        var monthsSelect = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    } else {
        var monthsSelect = ['&#128512;', '&#128515;', '&#128516;', '&#128513;', '&#128518;', '&#128517;', '&#129315;', '&#128514;', '&#128578;', '&#128579;', '&#128521;', '&#128522;'];
    }

    for (var i = 0; i < arrayOfString.length; i++) {
        if (arrayOfString[i] === 'yyyy') {
            dateString = dateString.replace('yyyy', date.year.toString());
        } else if (arrayOfString[i] === 'yy') {
            dateString = dateString.replace('yy', date.year.toString().substring(2));
        } else if (arrayOfString[i] === 'MMMM') {
            dateString = dateString.replace('MMMM', monthsSelect[date.month.toString()]);
        } else if (arrayOfString[i] === 'MMM') {
            dateString = dateString.replace('MMM', stringSelect !== 'emoji' ? monthsSelect[date.month.toString()].substring(0,3) : monthsSelect[date.month.toString()] );
        } else if (arrayOfString[i] === 'MM') {
            dateString = dateString.replace('MM', addZeroToDate((date.month + 1).toString()));
        } else if (arrayOfString[i] === 'M') {
            dateString = dateString.replace('M', (date.month + 1).toString());
        } else if (arrayOfString[i] === 'dd') {
            dateString = dateString.replace('dd', addZeroToDate(date.day.toString()));
        } else if (arrayOfString[i] === 'd') {
            dateString = dateString.replace('d', date.day.toString());
        } else if (arrayOfString[i] === 'HH') {
            dateString = dateString.replace('HH', addZeroToDate(date.hours.toString()));
        } else if (arrayOfString[i] === 'H') {
            dateString = dateString.replace('H', date.hours.toString());
        } else if (arrayOfString[i] === 'hh') {
            dateString = dateString.replace('hh', addZeroToDate((date.hours % 12).toString()));
        } else if (arrayOfString[i] === 'h') {
            dateString = dateString.replace(/(?<!c)h/, (date.hours % 12).toString());
        } else if (arrayOfString[i] === 'mm') {
            dateString = dateString.replace('mm', addZeroToDate(date.minutes.toString()));
        } else if (arrayOfString[i] === 'm') {
            dateString = dateString.replace(/m(?!b)/, date.minutes.toString());
        } else if (arrayOfString[i] === 'ss') {
            dateString = dateString.replace('ss', addZeroToDate(date.seconds.toString()));
        } else if (arrayOfString[i] === 's') {
            dateString = dateString.replace(/(?<!u)s/, date.seconds.toString());
        }
    }
    return dateString;
}

document.querySelector('.task-03-btn').onclick = fn3;
