/**
 * func(1,2,3) 输出6
 * func(1)(2,3) 输出6
 * func(1)(2)(3) 输出6
 */

function add(x, y, z) {
    return x + y + z
}

// function curry(fn) {
//     let argArr = [];
//     return function re() {
//         argArr.push(...arguments);
//         if (argArr.length >= fn.length) {
//             let exeArr = [...argArr];
//             argArr = [];
//             return fn.call(this, ...exeArr)
//         } else {
//             return re;
//         }
//     }
// }

// const func = curry(add);
// console.log(func(1, 2, 3));
// console.log(func(1)(2, 3));
// console.log(func(1)(2)(3))

const cu = (fn) => {
    let argArr =[];
    return function re(...args){
        argArr.push(...args);
        if (argArr.length >= fn.length) {
            let exeArr = [...argArr];
            argArr = [];
            return fn.call(this, ...exeArr)
        } else {
            return re;
        }
    }
}

const func2 = cu(add);
console.log(func2(1, 2, 3));
console.log(func2(1)(2, 3));
console.log(func2(1)(2)(3))
