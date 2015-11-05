/**
 * Created by zhengguo.chen on 2015/10/10.
 */
'use strict';

let add = inc => n => n + inc;

let multiple = multi => n => n * multi;

let concat = (x, y) => "" + x + y;

let concatArray = (arr, fn) => arr.map(fn).reduce(concat);

module.export = concatArray;

var arr = [1, 2, 3];

//test
console.log(concatArray(arr, add(1)));
console.log(concatArray(arr, multiple(2)));

//进一步改进concatArray为curry
let concatArrayCurry = arr => fn => arr.map(fn).reduce(concat);
console.log(concatArrayCurry(arr)(add(1)));
console.log(concatArrayCurry(arr)(multiple(2)));

