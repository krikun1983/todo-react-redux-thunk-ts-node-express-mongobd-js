'use string';

function solutionTaskTwo() {
    var stringIn = document.querySelector('.task-02-in').value;
    var stringOut = document.querySelector('.task-02-out');

    var regForStringWithoutExtra = /[^!\.?,;:\s$]+/gi;
    var arrayWords = stringIn.match(regForStringWithoutExtra);

    if (!arrayWords) {
        return stringOut.innerHTML = stringIn;
    }

    var arrayCharOfWordOne = arrayWords[0].split('');

    var arrayCharsUnique = arrayCharOfWordOne.filter(function (char) {
        return arrayWords.every(function (elem) {
            return elem.toLowerCase().includes(char.toLowerCase());
        })
    })

    if (arrayCharsUnique[0] === '^' || arrayCharsUnique[0] === '\\') {
        var reg = '[\\' + arrayCharsUnique.join('') + ']';
    } else {
        var reg = '[' + arrayCharsUnique.join('') + ']';
    }

    stringOut.innerHTML = stringIn.replace(new RegExp(reg, "gi"), '');
}

document.querySelector('.task-02-btn').onclick = solutionTaskTwo;