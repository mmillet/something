/**
 * Created by zhengguo.chen on 2015/10/10.
 */
'use strict';
var _ = require("underscore");
var R = require("ramda");


var tasks = [
  {id: 6, completed: true},
  {id: 8, completed: false},
  {id: 9, completed: true},
  {id: 3, completed: true},
  {id: 7, completed: false},
  {id: 2, completed: true}
];

//利用underscore实现 http://www.css88.com/doc/underscore/#chain
//链式
console.log(
  _(tasks)
  .chain()
  .filter(task => task.completed === true)
  .sortBy(task => task.id)
  .value()
);
//嵌套
console.log(
  _.sortBy(_.filter(tasks, task => task.completed === true), task => task.id)
);


//ramda
console.log(
  R.compose(
    R.sortBy(task => task.id),
    R.filter(task => task.completed === true)
  )(tasks)
);

//进一步tasks内部有分组了
var groupedTasks = [
  [
    {id: 6, completed: true},
    {id: 8, completed: false},
    {id: 9, completed: true}
  ], [
    {id: 3, completed: true},
    {id: 7, completed: false},
    {id: 2, completed: true}
  ]
];

//利用underscore实现
console.log(
  _.map(groupedTasks, //underscore一开始就需要消费数据
        tasks => _(tasks)
                  .chain()
                  .filter(task => task.completed === true)
                  .sortBy(task => task.id)
                  .value()
  )
);

//ramda compose
var completedAndSorted = R.compose(
  R.sortBy(task => task.id),
  R.filter(task => task.completed === true)
);
var completedAndSortedGrouped = R.map(completedAndSorted); //最后组合出来的方法

console.log(
  completedAndSortedGrouped(groupedTasks)
);

//ramda pipe
var completedAndSortedByPipe = R.pipe(
  R.filter(task => task.completed === true),
  R.sortBy(task => task.id)
);
var completedAndSortedGrouped2 = R.map(completedAndSortedByPipe); //最后组合出来的方法

console.log(
  completedAndSortedGrouped2(groupedTasks)
);

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


var plus = x => x+1;
var minus = x => x-1;
var multi = x => x*2;
//multi(minus(plus(3)));

console.log(compose(plus, minus, multi)(3));