/**
 * Created by zhengguo.chen on 2016/4/26.
 */

var eventSrc  = new EventSource("/event");
var handler = function(event) {
  console.log(event.data);
};
// ["open", "message"].forEach(function( name ) {
  eventSrc.addEventListener('message', handler);
// });

var getData = function() {
  console.log('get data');
}