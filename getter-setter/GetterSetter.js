/**
 * Created by zhengguo.chen on 2016/3/21.
 */
function Model() {
  this.loc = 'Hello';
}

Model.prototype = {
  get greeting() {
    console.log('get');
    return this.loc;
  },
  set greeting(x) {
    console.log('set');
    this.loc = x;
  }
};

var model = new Model();

model.greeting = 123;
console.log(model);
