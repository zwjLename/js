function myApply(context, args) {
    if (context === null || context === undefined) {
        context = window;
    }
    let fnSymbol = Symbol();
    context[fnSymbol] = this;
    let fn = context[fnSymbol](...args);
    delete context[fnSymbol];
    return fn;
}
