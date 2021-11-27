/**
 * throttle节流函数
 */
function throttle(fn, timeout) {
    let timer;
    return () => {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, timeout)
    }
}

var count = 0;
const func = throttle(function () {
    count++;
    console.log(`count=${count}`)
}, 1000)
var interval = setInterval(() => {
    if (count >= 5) {
        clearInterval(interval);
    }
    func();
}, 50)

// 输出
// count=1 (时间间隔1s)
// count=2 (时间间隔1s)
// count=3 (时间间隔1s)
// count=4 (时间间隔1s)
// count=5 (时间间隔1s)
// count=6 (时间间隔1s)


/**
 * 防抖函数debounce
 */
function debounce(fn, timeout) {
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, timeout)
    }
}
let count1 = 0;
const test = debounce(() => {
    count1++;
    console.log(`count1=${count1}`)
}, 1000);
test();
test();
test();
test();
// 输出
// count1=1