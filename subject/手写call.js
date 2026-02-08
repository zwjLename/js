Function.prototype.myCall = function (context, ...args) {
  if (context === null || context === undefined) {
    context = window;
  }
  let fnSymbol = Symbol();
  context[fnSymbol] = this;
  let fn = context[fnSymbol](...args);
  delete context[fnSymbol];
  return fn;
};

// 测试一下
const foo = {
  value: 1,
};
function bar(name, age) {
  console.log(name, age);
  console.log(this.value);
}
bar.myCall(foo, "zhangsan", 18);
