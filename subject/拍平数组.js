const arr = [1, 2, [2, 3], [4, [5, 5.5, 5.6], [6, 7, 8], 9], 10];
/**
 * 输出 [1,2,2,3,4,5,5.5,5.6,6,7,8,9,10]
 */
function flatArr(arr, initArr = []) {
    return arr.reduce((pre, ele) => {
        if (Array.isArray(ele)) {
            return flatArr(ele, pre)
        } else {
            return pre.concat([ele])
        }
    }, initArr)
}
const result = flatArr(arr)
console.log(result)