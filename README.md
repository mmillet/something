# something
> 这里堆放一些几乎只有自己能看懂的杂物


```javascript
/**
 * 取出集合中最小值(min)和最大值(max)，映射到另一段数据(MIN_SIZE, MAX_SIZE)
 */
var GetSymbolSizer = (data) => {
  var [min, max] = data.reduce((cur, item) => {
    (cur[0] > item.count) && (cur[0] = item.count);
    (cur[1] < item.count) && (cur[1] = item.count);
    return cur;
  }, [1, 20]);

  const MIN_SIZE = 3;
  const MAX_SIZE = 20;

  //min,max ---> MIN,MAX
  //(y-MIN)/(MAX-y) = (x-min)/(max-x)
  // (y-MIN)*(max-x) = (x-min)*(MAX-y)
  // ---> y*max - MIN*max - x*y + x*MIN = x*MAX - min*MAX - x*y + y*min
  // ---> y*max - MIN*max + x*MIN = x*MAX - min*MAX + y*min
  // ---> y*(max-min) - x*(MAX-MIN) = MIN*max - min*MAX
  // ---> y = ((MIN*max - min*MAX) + x(MAX-MIN)) / (max-min)
  // ---> y = (MIN_SIZE * max - min * MAX_SIZE) / (max-min) + ((MAX_SIZE - MIN_SIZE) / (max - min)) * x;

  var offset = (MIN_SIZE * max - min * MAX_SIZE) / (max-min);
  var ratio = (MAX_SIZE - MIN_SIZE) / (max - min);

  return val =>  val * ratio + offset;
};
```

```
git pull aliyun
```
