mvc: m-->v
     v-->m
     视图层常常因渲染页面而直接引用数据层的数据，但是控制器不得而知
     数据层内的数据修改，影响到视图层的呈现，但是控制器不知情

mvp： p-->管理层：负责管理数据、UI视图创建、交互逻辑、动画特效等事务，
           业务独立并且单一


(function (window) {
    var MVP = function() {};
    MVP.model = function() {};
    MVP.view = function() {};
    MVP.presenter = function() {};
    MVP.init = function() {};
    // expose
    window.MVP = MVP;
})(window)

MVP.model = function () {
    var M = {};
    M.data = {};
    M.conf = {}
    return {
        getData: function(m) {
            return M.data[m]
        },
        /**
        * m: module's name
        * v: module's data
        */
        setData: function(m, v) {
            M.data[m] = v;
            return v;
        },
        getConf: function(c) {
            return M.conf[c]
        },
        /**
        * c: configuration's name
        * v: configuration's value
        */
        setConf: function(c, v) {
            M.conf[c] = v;
            return v;
        }
    }
}()

var tpl = ['<li>', '<a>', '<i>', '<span>'].join('');
li.@mode@choose@last[data-mode=@mode] > a#nav-@mode.nav-@mode[href=@url title=@text] > i.@mode + span{@text}

> + 

MVP.view = function() {
    return function(str) {
        var REPLACEKEY = '__REPLACEKEY__';
        function getHTML(str, replacePos) {}
        function eachArray(arr, fn) {
            for (var i = 0, len = arr.length; i < len; i++) {
                fn(i, arr[i], len);
            }
        }
        function formateItem(str, rep) {
            return str.replace(new RegExp(REPLACEKEY, 'g'), rep);
        }

        return function (str) {
            var part = str
            //remove leading and trailing whitespace
            .replace(/^\s+|\s+$/g, '')
            //remove whitespace of both sides of >
            .replace(/^\s+(>)\s+/g, '$1')
            //group by >
            .split('>'),
            // view module's root
            html = REPLACEKEY,
            //sibling element
            item,
            //template of sibling element
            nodeTpl;
            eachArray(part, function(partIndex, partValue, partLen){
                item = partValue.split('+');
                nodeTpl = REPLACEKEY;
                eachArray(item, function(itemIndex, itemValue, itemLen){
                    nodeTpl = formateItem(nodeTpl, getHTML(itemValue, itemIndex === itemLen - 1 ? (partIndex === partLen - 1 ? '' : 'in': 'add'));
                })
                html = formateItem(html nodeTpl);
            })
        return html;
    }
}();

MVP.presenter = function () {
    var V = MVP.view;
    var M = MVP.model;
    var C = {};
    return {
        init: function() {
            for (var i in C){
                C[i] && C[i](M, V, i);
            }
        },
        add: function(modName, pst) {
            C[modName] = pst;
            return this;
        }
    }
}

MVP.init = function(){
    this.presenter.init();
}

window.onload = function () {
    MVP.init()
}

F.module('lib/MVP', function () {
    var MVP = function() {};
    return MVP;
})

var MVP = function (modName, pst, data) {
    MVP.model.setData(modName, data);
    MVP.presenter.add(modName, pst);
}


MVVM:  直接通过html创建视图
<div class="first" data-bind="type: 'slider', data: demo1"></div>
view-- vm -- model
视图    通讯   数据
DOM     观察者  js对象

(function () {
    ....
    var VM = function () {}();
    window.VM = VM;
})

var VM = function () {
    var Method = {
        progressbar: function () {}
        slider: function() {}
    }

    function getBindData(dom) {
        var data = dom.getAttribute('data-bind')
        return !!data && (new Function ("return ({" + data + "})"))();
    }
}

const vm = new Mvvm({
    el: '#app',
    data: {
        title: 'mvvm title',
        name: 'mvvm name'
    },
})

function Mvvm (options) {
  this.data = options.data

  const self = this
  Object.keys(this.data).forEach(key =>
    self.proxyKeys(key)
  )
}

Mvvm.prototype = {
  proxyKeys: function(key) {
    const self = this
    Object.defineProperty(this, key, {
      get: function () { // 这里的 get 和 set 实现了 vm.data.title 和 vm.title 的值同步
        return self.data[key]
      },
      set: function (newValue) {
        self.data[key] = newValue
      }
    })
  }
}

实现了代理方法后，就步入主流程的实现
function Mvvm (options) {
  this.data = options.data
  // ...
  observe(this.data)
  new Compile(options.el, this)
}
observer(观察者) 的实现
observer 的职责是监听 Model(JS 对象) 的变化，最核心的部分就是用到了 Object.defineProperty() 的 get 和 set 方法，当要获取 Model(JS 对象) 的值时，会自动调用 get 方法；当改动了 Model(JS 对象) 的值时，会自动调用 set 方法；从而实现了对数据的劫持，代码如下所示。
let data = {
  number: 0
}

observe(data)

data.number = 1 // 值发生变化

function observe(data) {
  if (!data || typeof(data) !== 'object') {
    return
  }
  const self = this
  Object.keys(data).forEach(key =>
    self.defineReactive(data, key, data[key])
  )
}

function defineReactive(data, key, value) {
  observe(value) // 遍历嵌套对象
  Object.defineProperty(data, key, {
    get: function() {
      return value
    },
    set: function(newValue) {
      if (value !== newValue) {
        console.log('值发生变化', 'newValue:' + newValue + ' ' + 'oldValue:' + value)
        value = newValue
      }
    }
  })
}Dep(订阅者数组) 和 watcher(订阅者) 的关系
观测到变化后，我们总要通知给特定的人群，让他们做出相应的处理吧。为了更方便地理解，我们可以把订阅当成是订阅了一个微信公众号，当微信公众号的内容有更新时，那么它会把内容推送(update) 到订阅了它的人。

那么订阅了同个微信公众号的人有成千上万个，那么首先想到的就是要 new Array() 去存放这些人(html 节点)吧。于是就有了如下代码：
// observer.js
function Dep() {
  this.subs = [] // 存放订阅者
}

Dep.prototype = {
  addSub: function(sub) { // 添加订阅者
    this.subs.push(sub)
  },
  notify: function() { // 通知订阅者更新
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}

function observe(data) {...}

function defineReactive(data, key, value) {
  var dep = new Dep()
  observe(value) // 遍历嵌套对象
  Object.defineProperty(data, key, {
    get: function() {
      if (Dep.target) { // 往订阅器添加订阅者
        dep.addSub(Dep.target)
      }
      return value
    },
    set: function(newValue) {
      if (value !== newValue) {
        console.log('值发生变化', 'newValue:' + newValue + ' ' + 'oldValue:' + value)
        value = newValue
        dep.notify()
      }
    }
  })
}
复制代码初看代码也比较顺畅了，但可能会卡在 Dep.target 和 sub.update，由此自然而然地将目光移向 watcher，
// watcher.js
function Watcher(vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  update: function() {
    this.run()
  },

  run: function() {
    // ...
    if (value !== oldVal) {
      this.cb.call(this.vm, value) // 触发 compile 中的回调
    }
  },

  get: function() {
    Dep.target = this // 缓存自己
    const value = this.vm.data[this.exp] // 强制执行监听器里的 get 函数
    Dep.target = null // 释放自己
    return value
  }
}
复制代码从代码中可以看到当构造 Watcher 实例时，会调用 get() 方法，接着重点关注 const value = this.vm.data[this.exp] 这句，前面说了当要获取 Model(JS 对象) 的值时，会自动调用 Object.defineProperty 的 get 方法，也就是当执行完这句的时候，Dep.target 的值传进了 observer.js 中的 Object.defineProperty 的 get 方法中。同时也一目了然地在 Watcher.prototype 中发现了 update 方法，其作用即触发 compile 中绑定的回调来更新界面。至此解释了 Observer 中 Dep.target 和 sub.update 的由来。
来归纳下 Watcher 的作用，其充当了 observer 和 compile 的桥梁。
1 在自身实例化的过程中，往订阅器(dep) 中添加自己
2 当 model 发生变动，dep.notify() 通知时，其能调用自身的 update 函数，并触发 compile 绑定的回调函数实现视图更新
最后再来看下生成 Watcher 实例的 compile.js 文件。
compile(编译) 的实现
首先遍历解析的过程有多次操作 dom 节点，为提高性能和效率，会先将跟节点 el 转换成 fragment(文档碎片) 进行解析编译，解析完成，再将 fragment 添加回原来的真实 dom 节点中。代码如下：
function Compile(el, vm) {
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el) // 将节点转为 fragment 文档碎片
      this.compileElement(this.fragment) // 对 fragment 进行编译解析
      this.el.appendChild(this.fragment)
    }
  },
  nodeToFragment: function(el) {
    const fragment = document.createDocumentFragment()
    let child = el.firstChild // △ 第一个 firstChild 是 text
    while(child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },
  compileElement: function(el) {...},
}
复制代码这个简单的 mvvm 框架在对 fragment 编译解析的过程中对 {{}} 文本元素、v-on:click 事件指令、v-model 指令三种类型进行了相应的处理。
Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el) // 将节点转为 fragment 文档碎片
      this.compileElement(this.fragment) // 对 fragment 进行编译解析
      this.el.appendChild(this.fragment)
    }
  },
  nodeToFragment: function(el) {...},
  compileElement: function(el) {...},
  compileText: function (node, exp) { // 对文本类型进行处理，将 {{abc}} 替换掉
    const self = this
    const initText = this.vm[exp]
    this.updateText(node, initText) // 初始化
    new Watcher(this.vm, exp, function(value) { // 实例化订阅者
      self.updateText(node, value)
    })
  },

  compileEvent: function (node, vm, exp, dir) { // 对事件指令进行处理
    const eventType = dir.split(':')[1]
    const cb = vm.methods && vm.methods[exp]

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  },

  compileModel: function (node, vm, exp) { // 对 v-model 进行处理
    let val = vm[exp]
    const self = this
    this.modelUpdater(node, val)
    node.addEventListener('input', function (e) {
      const newValue = e.target.value
      self.vm[exp] = newValue // 实现 view 到 model 的绑定
    })
  },
}