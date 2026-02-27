const arr = [1, 2, [2, 3], [4, [5, 5.5, 5.6], [6, 7, 8], 9], 10];
/**
 * 输出 [1,2,2,3,4,5,5.5,5.6,6,7,8,9,10]
 */
// function flatArr(arr, initArr = []) {
//     return arr.reduce((pre, ele) => {
//         if (Array.isArray(ele)) {
//             return flatArr(ele, pre)
//         } else {
//             return pre.concat([ele])
//         }
//     }, initArr)
// }
// const result = flatArr(arr)
// console.log(result)

function flatArr1(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result.push(...flatArr1(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result;
}

const result1 = flatArr1(arr);
console.log(result1);