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


const cu1 = (fn, args = []) => (..._args) => (rest => rest.length >=fn.length ? fn(...rest) : cu1(fn,rest))([...args,..._args]);

const cu2= (fn, args = []) => (..._args) => {
    const rest = [...args, ..._args];    // 更新后的参数列表
    return rest.length >= fn.length
      ? fn(...rest)                      // 参数够了，执行原函数
      : cu1(fn, rest);                   // 参数不够，继续返回一个柯里化函数
  };

const func2 = cu2(add);
console.log(func2(1, 2, 3));
console.log(func2(1)(2, 3));
console.log(func2(1)(2)(3))

const cu3 = (fn, args = []) => {
    return (..._args) => {
        const rest = [...args, ..._args];
        return rest.length >= fn.length ? fn(...rest) : cu3(fn, rest);
    };
};

const func3 = cu3(add);
console.log(func3(1, 2, 3));
console.log(func3(1)(2, 3));
console.log(func3(1)(2)(3));
