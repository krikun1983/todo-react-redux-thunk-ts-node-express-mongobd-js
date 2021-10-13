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
    var stringOut = document.querySelector('.task-03-out');

    if (!stringIn || !stringDate) {
        return stringOut.innerText = 'Please, you must fill in the fields: New Date and String';
    }

    stringOut.innerText = new Date(stringDate).format(stringIn);
}

Date.prototype.format = function (dateString) {
    var regOfString = /y{4}|y{2}|M{1,4}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}/g;
    var arrayOfString = dateString.match(regOfString);

    var date = {
        year: this.getFullYear(),
        month: this.getMonth(),
        day: this.getDay(),
        hours: this.getHours(),
        minutes: this.getMinutes(),
        seconds: this.getSeconds(),
    }

    function addZeroToDate(dateOfString) {
        return dateOfString.length !== 1 ? dateOfString : '0' + dateOfString;
    }

    const monthsEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (var i = 0; i < arrayOfString.length; i++) {
        if (arrayOfString[i] === 'yyyy') {
            dateString = dateString.replace('yyyy', date.year.toString());
        } else if (arrayOfString[i] === 'yy') {
            dateString = dateString.replace('yy', date.year.toString().substring(2));
        } else if (arrayOfString[i] === 'MMMM') {
            dateString = dateString.replace('MMMM', monthsEng[date.month.toString()]);
        } else if (arrayOfString[i] === 'MMM') {
            dateString = dateString.replace('MMM', monthsEng[date.month.toString()].substring(0,3));
        } else if (arrayOfString[i] === 'MM') {
            dateString = dateString.replace('MM', addZeroToDate(date.month.toString()));
        } else if (arrayOfString[i] === 'M') {
            dateString = dateString.replace('M', date.month.toString());
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
            dateString = dateString.replace('h', (date.hours % 12).toString());
        } else if (arrayOfString[i] === 'mm') {
            dateString = dateString.replace('mm', addZeroToDate(date.minutes.toString()));
        } else if (arrayOfString[i] === 'm') {
            dateString = dateString.replace('m', date.minutes.toString());
        } else if (arrayOfString[i] === 'ss') {
            dateString = dateString.replace('ss', addZeroToDate(date.seconds.toString()));
        } else if (arrayOfString[i] === 's') {
            dateString = dateString.replace('s', date.seconds.toString());
        }
    }

    return dateString;

    // console.log(this);
    // console.log(arrayOfString);

    // console.log(date);
    // console.log(date);
    // console.log('dateString: ' + dateString);
    // // console.log('dateOutString: ' + dateOutString.join(''));
}

document.querySelector('.task-03-btn').onclick = fn3;
