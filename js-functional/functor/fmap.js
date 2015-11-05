/**
 * Created by zhengguo.chen on 2015/10/11.
 */
'use strict';

var compose = function() {
  var args = Array.prototype.slice.call(arguments);
  return function (x) {
    var result = x ;
    var i = args.length;
    while(i--) {
      result = args[i](result);
    }
    return result;
  }
};

var types = obj => {throw new TypeError("fmap called on unregistered type: " + obj)};

var Functor = (type, defs) => {
  var oldTypes = types;
  types = obj => {
    if (type.prototype.isPrototypeOf(obj)) {
      return defs; // 这是递归的出口, 判断类型, 确定 fmap 的 Functor 实例属于注册的哪一个 Functor
    }
    return oldTypes(obj); //不断递归寻找 types, 这个效率会很低, 因为调用栈上好多闭包, 每个闭包都保持着 type 和 defs
  }
};

var fmap = (fn, obj) => types(obj).fmap(fn, obj);

// ------------数组 Functor----------------
Functor(Array, {fmap: (f, arr) => arr.map(x => f(x))});
var plus1 = x => x + 1;
console.log(fmap(plus1, [2, 4, 6, 8])); //=> [3, 5, 7, 9]

// -------------函数 Functor------------------------
Functor(Function, {fmap: (f, g) => compose(f, g)});
var times2 = x => x * 2;
console.log(fmap(plus1, times2)(3)); //=> 7 (= 3 * 2 + 1)