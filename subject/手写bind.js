//  有问题
Function.prototype.myBind = function (context) {
   if (context === null || context === undefined) {
    context = window;
   }
    self = this;
   return function (...args) {
    return self.apply(context, args);
   }
}
const foo = {
    value:1
}
function bar (name, age){
    console.log(name);
    console.log(age);
    console.log(this.value);
}
// 有问题
const bindFoo = bar.myBind(foo, 'zhangsan');
bindFoo(18);