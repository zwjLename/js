Function.prototype.myApply = function (context, args) {
  if (context == null) context = globalThis;
  context = Object(context);

  const fn = Symbol('fn');
  context[fn] = this;
  const result = (args && args.length) ? context[fn](...args) : context[fn]();
  delete context[fn];
  return result;
};

