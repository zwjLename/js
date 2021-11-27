const arr = [1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5]
/**
 * 
 * @param {*} arr 
 * @returns 输出[1,2,3,4,5]
 */
function singleArr(arr) {
    return arr.reduce((pre, ele) => {
        if (!pre.includes(ele)) {
            return pre.concat(ele)
        }
        return pre
    }, [])
}
console.log(singleArr(arr))