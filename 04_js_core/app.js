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

    if (/\+|-|\/|\*/.test(stringNew[0])) {
        var result = 0;
        for (var i = 0, k = 0; k < arrayMathSymbols.length; i++, k++) {
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
    } else {
        var result = +arrayNumber[0];
        for (var i = 1, k = 0; k < arrayMathSymbols.length; i++, k++) {
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
    }
    stringOut.innerHTML = result.toFixed(2);
}
document.querySelector('.task-01-btn').onclick = fn1;