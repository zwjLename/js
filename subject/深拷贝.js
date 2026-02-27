function deepClone(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj;

    // 循环引用：已拷贝过的对象直接返回其副本
    if (map.has(obj)) return map.get(obj);

    const cloneObj = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
    map.set(obj, cloneObj);

    for (let key of Reflect.ownKeys(obj)) {
        const value = obj[key];
        cloneObj[key] = typeof value === 'object' && value !== null ? deepClone(value, map) : value;
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
};
// 循环引用：自引用
obj.self = obj;
obj.arr.push(obj);

const cloned = deepClone(obj);
console.log(cloned);
console.log(cloned.self === cloned);           // true，指向克隆后的自己
console.log(cloned.arr[4] === cloned);         // true