/**
 * Created by zhengguo.chen on 2016/3/21.
 */
var Model = function() {
  this.loc = 'Hello';
};

Model.prototype.__defineGetter__('greeting', function() {
  console.log('**getting!**');
  return this.loc;
});
Model.prototype.__defineSetter__('greeting', function(value) {
  // change view
  console.log('**setting!**', value);
  this.loc = value;
});

var model = new Model();

console.log(model.greeting);
model.greeting = 'Hi~~';
console.log(model.greeting);

HTMLElement.prototype.__defineGetter__('COMMENT_NODE', function() {
  console.log('getting comment node');
});


