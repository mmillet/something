/**
 * Created by zhengguo.chen on 2015/10/9.
 */
'use strict';
var co = require("co");
var assert = require("assert");
var thunkify = require("thunkify");
/*
//pure generator call
function *pureGenerator() {
  yield "Hello";
  yield "ES6";
}
var pure = pureGenerator();
console.log(pure.next());
console.log(pure.next());
console.log(pure.next());

//co generator
function *coGenerator() {
  return yield Promise.resolve("World");
}
co(coGenerator).then((value) => {console.log(value)});

var onerror = (err) => {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}

// errors can be try/catched
co(function *(){
  yield Promise.reject(new Error('boom'));
}).catch(onerror);


co(function *(){
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(onerror);

*/

//请实现「thunkify」方法

var hello = (a, b, callback) => callback(null, a + b);
var helloT = thunkify(hello);

//hello(1, 2, value => console.log(value)); //3
//helloT(3, 4)(value => console.log(value)); //7

function _thunkify(fn) {
  if(typeof fn !== "function") {
    throw `Argument should be function`;
  }
  return function() {
    var ctx = this;
    var args = Array.prototype.slice.call(arguments, 0, arguments.length);
    return function(done) {
      var called;

      args.push(function() {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
}

var helloThunkify2 = _thunkify(hello);
//dhelloThunkify2(3, 4)(value => console.log(value));


//console.log(thunkFuncHello()(123));
//console.log(readFile("xxx")(function(){console.log(666)}));


// wrap the function to thunk
var readFile = filename => {
  return callback => {
    //require('fs').readFile(filename, 'utf8', callback);
    setTimeout(() => {
      callback(null, `Read ` + filename);
    }, 500);
  };
}

let _co = generator => {
  return fn => {
    var gen = generator();
    var next = (err, result) => {
      if(err){
        return fn(err);
      }
      var step = gen.next(result);
      if (!step.done) {
        step.value(next);
      } else {
        fn(null, step.value);
      }
    }
    next();
  }
}

function *readMultiFileGenerator (initData) {

  console.log(`Here we go!`, initData||"");

  let file1 = yield readFile(`./file/a.txt`);
  let file2 = yield readFile(`./file/b.txt`);

  //other thunks
  let cnt = yield helloT(3, 4);

  //promise
  var x = yield Promise.resolve(`promise`);

  //object
  let obj = yield {a: Promise.resolve(`object`)};

  //array
  let arr = yield [1, Promise.resolve(2), 3];

  //make an error
  //anUndefinedFunction();

  console.log(file1, file2, cnt, x, obj, arr);

  return `done`;
}

co(readMultiFileGenerator)
  .then(val => console.log(val), err => console.log(`Error occurs`, err))
  //.catch(err => console.log(`Error occurs`, err))

co.wrap(readMultiFileGenerator)("Millet");


