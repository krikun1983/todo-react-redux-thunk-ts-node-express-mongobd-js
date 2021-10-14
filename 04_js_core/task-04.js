'use string';

function chainSum(arg) {
    var currentSum = arg;
    if (!arg) {
        return 0;
    }

    if (arguments.length > 1) {
        return new Error('arguments more than one');
    }

    return function func(arg2) {
        if (arguments.length > 1) {
            return new Error('arguments more than one');
        }
        if (!arg2) {
            return currentSum;
        }
        if (typeof arg2 === 'string') {
            arg2 = NaN;
        }
        currentSum += arg2;
        return func;
    }
}
// console.log(chainSum());
// console.log(chainSum(2)(4)(3)());
// console.log(chainSum(2)(3)());
// console.log(chainSum(1)(2)(3)(10)());
// console.log(chainSum(1)(2)('a')(4)());
// console.log(chainSum(1)(2)('3')(4)());
// console.log(chainSum(1)(2)(3)(4)());
// console.log(chainSum());