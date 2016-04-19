/**
 * Created by zhengguo.chen on 2016/3/21.
 */
var model = {};

Object.defineProperty(model, '$scope', {
  enumerable: false,
  configurable: false,
  set: function(value) {
    console.log('set!', value);
    this.inner = value;
  },
  get: function() {
    console.log('get!');
    return this.inner;
  }
});

var obj = {a:123};
model.$scope = obj;
obj.a = 456;
model.$scope = obj;
console.log(model.$scope);
//model.$scope.y = '13';
//console.log(model, model.$scope);
//console.log(Object.getOwnPropertyNames(model));
//console.log(Object.getOwnPropertyDescriptor(a, 'foo'));
