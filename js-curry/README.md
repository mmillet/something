# JS-Curry
让某个方法可以Curry化

```code```
var add = function(x, y, z) {
  return x + y + z;
};

var addCurried = makeCurry(add, 1);
addCurried(2, 3); //6

var addCurried = makeCurry(add, 1, 2);
addCurried(3); //还是6
