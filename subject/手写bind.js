// 手写 bind，实现参数预置及构造函数场景
Function.prototype.myBind = function (context, ...bindArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('myBind must be called on a function');
  }

  // null / undefined 默认指向全局对象
  if (context === null || context === undefined) {
    context = typeof window !== 'undefined' ? window : globalThis;
  } else {
    context = Object(context);
  }

  const self = this;

  function boundFn(...callArgs) {
    // 作为构造函数使用时，忽略显式绑定的 context
    if (this instanceof boundFn) {
      return new self(...bindArgs, ...callArgs);
    }
    return self.apply(context, [...bindArgs, ...callArgs]);
  }

  // 让实例通过原型链拿到原函数原型上的属性
  boundFn.prototype = Object.create(self.prototype);

  return boundFn;
}


Function.prototype.myBindSimple = function (context, ...bindArgs) {
    if (context == null) context = globalThis;   // 兼容 node / 浏览器
    context = Object(context);                   // 原始值也包装成对象
    const fn = this;
    return function (...callArgs) {
      return fn.apply(context, [...bindArgs, ...callArgs]);
    };
  };
const foo = {
    value:1
}
function bar (name, age){
    console.log(name);
    console.log(age);
    console.log(this.value);
}
// 有问题
const bindFoo = bar.myBindSimple(foo, 'zhangsan');
bindFoo(18);