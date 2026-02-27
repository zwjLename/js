function deepClone(obj) {
    // 处理继承的属性和不可枚举的属性
    const cloneObj = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
    // 处理Symbol的属性和普通的属性
    for (let key of Reflect.ownKeys(obj)) {
        let value = obj[key];
        cloneObj[key] = typeof value === 'object' && value !== null ? deepClone(value) : value
    }
    return cloneObj;
}

function deepClone1(obj) {
    const cloneObj = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
    for (let key of Reflect.ownKeys(obj)) {
        let value = obj[key];
        cloneObj[key] = typeof value === 'object' && value !== null ? deepClone1(value) : value
    }
    return cloneObj;

}

const obj = {
    a: 123,
    b: '123',
    arr: [
        {
            a: 'abc'
        },
        false,
        undefined,
        null
    ],
    [Symbol('symbol')]: 'symbol',
    function: function () {
        console.log('function')
    },
    date: new Date(),
    regex: /^\d+$/,
    error: new Error('error'),
    map: new Map(),
    set: new Set(),
    json: {
        hello: 'world'
    },
   
}
console.log(deepClone(obj))