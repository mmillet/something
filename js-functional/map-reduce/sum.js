/**
 * Created by zhengguo.chen on 2015/10/10.
 */
'use strict';
var _ = require("underscore");
var M = require("mori");

/*
  @description 有这样一个数组 [1, 2, 3]，分别求平方，再求和
               要求只遍历一次
  use: underscore reduce: http://www.css88.com/doc/underscore/#reduce
 */
var arr = [1, 2, 3];
var reduceFn = (x, y) => x + y;
var square = x => x * x;

//方法一
var result1 = _.reduce(_.map(arr, square), reduceFn, 0);
console.log(result1);

//方法二
var transformer = fn => reduceFn => (prev, next) => reduceFn(prev, fn(next));
var result2 = _.reduce(arr, transformer(square)(reduceFn), 0);
console.log(result2);

/*
  解释下reducer实现：
  假设：x(y, z(a)) === x1(y, z)(a)
  求x1的实现：
  x1 = (a1, a2) => a3 => x(a1, a2(a3));
  等价于
  var x1 = function(a1, a2) {
    return function(a3) {
      return x(a1, a2(a3));
    }
  }
 */

//方法二改进，保持reduce的API不变
//xf(reduceFn) === transformer(square)(reduceFn)
//transformer(pow2) 就是 Transducer
var reducer = (arr, xf, init) => reduceFn => _.reduce(arr, xf(reduceFn), init);
var result3 = reducer(arr, transformer(square), 0)(reduceFn);
console.log(result3);

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

/*

//Transducer用处，解耦
var fx = transformer(square);
var getMaxReduceFn = (x, y) => x > y ? x : y;

var max = reducer(arr, fx)(getMaxReduceFn);
console.log(max);

*/

//2 4 6
//4 16 36
//5 17 37

var arr = [1, 2, 3];
var double = x => x + x;
var plus100 = x => x + 100;
var square = x => x * x;

var reduceFn = (x, y) => x + y;

var transformer = fn => reduceFn => (prev, next) => reduceFn(prev, fn(next));

var fx = compose(transformer(double), transformer(square), transformer(plus100));
var value = _.reduce(arr, fx(reduceFn), 0);


var tf = fn => reduceFn => x => reduceFn(fn(x));
var fx2 = compose(tf(double), tf(square));
console.log("######", fx2(x => x)(3));

// tf(double) = reduceFn => x => reduceFn(x + x);
// tf(square) = reduceFn => x => reduceFn(x * x);

var fx3 = reduceFn => (reduceFn => x => (x * x)((x + x)))(x * x);

console.log("!!!", fx2(x => x), fx3(x => x));
// (x => reduceFn(x + x))( x => reduceFn(x * x)(x => x))
// (x => x + x)( x => x * x)


//fx2(x => x)(3) == (reduceFn => x => reduceFn(x + x))(reduceFn => x => reduceFn(x * x)(3))



console.log(value);

////查找>5的个数
//var double = x => x + x;
//var fx = transformer(double);
//var moreThanFiveReduceFn = (cnt, prev) => cnt + (prev > 5 ? 1 : 0);
//var cnt = _.reduce(arr, fx(moreThanFiveReduceFn), 0);
//console.log(cnt);
