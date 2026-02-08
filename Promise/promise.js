function rejectPromise(promise, reason) {
  if (promise._state !== "pending") {
    return;
  }
  promise._state = "rejected";
  promise._reason = reason;
  flushHandlers(promise);
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function isFunction(value) {
  return typeof value === "function";
}
function isThenable(x) {
  return (isObject(x) || isFunction(x)) && isFunction(x.then);
}

function resolvePromise(promise, x) {
  if (promise._state !== "pending") {
    return;
  }
  if (isThenable(x)) {
    // x promise是同一个对象
    if (x === promise) {
      rejectPromise(
        promise,
        new TypeError("不能将同一个promise对象作为依赖链的最后一个promise对象")
      );
      return;
    }
    // 2、promise吸收x状态,即同状态
    queueMicrotask(() => {
      x.then(
        (data) => {
          resolvePromise(promise, data);
        },
        (err) => {
          rejectPromise(promise, err);
        }
      );
    });
  } else {
    promise._state = "fulfilled";
    promise._data = x;
    flushHandlers(promise)
  }
}

function _flushHandlers(prom){}

class MyPromise {
  _state = "pending";
  _data = undefined;
  _reason = undefined;
  _settledHandlers = []; // 当前promise已决后的后续处理

  constructor(executor) {
    const resolve = (value) => {
      resolvePromise(this, value);
    };
    const reject = (err) => {
      rejectPromise(this, err);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    const prom = new MyPromise(() => {});
    this._settledHandlers.push({
      onFulfilled,
      onRejected,
      prom,
    });
    return prom;
  }
}

const p1 = new Promise((resolve) => resolve(1));
const p = new Promise((resolve) => resolve(p1));
console.log("p:", p); // pending

const p2 = new Promise((resolve) => resolve(1));
const p3 = new Promise((resolve) => resolve(p2));
queueMicrotask(() => {
  console.log("p3:", p3); // pending
});

const p4 = new Promise((resolve) => resolve(1));
const p5 = new Promise((resolve) => {
  resolve(p4);
});
queueMicrotask(() => {
  queueMicrotask(() => {
    console.log("p5:", p5); // 1
  });
});
