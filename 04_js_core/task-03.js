"use strict";

function solutionTaskTree() {
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
    var arrayOfEmojis = ['&#128512;', '&#128515;', '&#128516;', '&#128513;', '&#128518;', '&#128517;', '&#129315;', '&#128514;', '&#128578;', '&#128579;', '&#128521;', '&#128522;'];
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

    function choseMonthOut(arg) {
        if (stringSelect === 'english') {
            return new Date().toLocaleString('eng', { month: arg === 'MMMM' ? 'long' : 'short'}) ;
        } else if (stringSelect === 'russian') {
            var stringOfMonth = new Date().toLocaleString('ru', { month: arg === 'MMMM' ? 'long' : 'short' }).replace('.', '');
            return stringOfMonth[0].toUpperCase() + stringOfMonth.slice(1);
        } else {
            return arrayOfEmojis[date.month.toString()];
        }
    }

    var objOfDate = {
        yyyy: date.year.toString(),
        yy: date.year.toString().substring(2),
        MMMM: choseMonthOut('MMMM'),
        MMM: choseMonthOut('MMM'),
        MM: addZeroToDate((date.month + 1).toString()),
        M: (date.month + 1).toString(),
        dd: addZeroToDate(date.day.toString()),
        d: date.day.toString(),
        HH: addZeroToDate(date.hours.toString()),
        H: date.hours.toString(),
        hh: addZeroToDate((date.hours === 12 ? date.hours.toString() : (date.hours % 12).toString()).toString()),
        h: date.hours === 12 ? date.hours.toString() : (date.hours % 12).toString(),
        mm: addZeroToDate(date.minutes.toString()),
        m: date.minutes.toString(),
        ss: addZeroToDate(date.seconds.toString()),
        s: date.seconds.toString(),
    }

    for (var i = 0; i < arrayOfString.length; i++) {
        dateString = dateString.replace(arrayOfString[i], objOfDate[arrayOfString[i]]);
    }
    return dateString;
}

document.querySelector('.task-03-btn').onclick = solutionTaskTree;