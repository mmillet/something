/**
 * Created by chenzhengguo on 2015/3/26.
 *
 */
"use strict";
(function(window) {
  function makeCurry(fn) {
    var slice = Array.prototype.slice;
    var savedArguments = slice.call(arguments, 1); //保存后面参数
    return function () {
      var fullArguments = Array.prototype.concat.apply(savedArguments, arguments); //合并保存的参数
      return fn && fn.apply(this, fullArguments); //执行
    };
  }
  window.makeCurry = makeCurry;
}(window));
