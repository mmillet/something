# Thunk

1.  现有方法x： x(a, b, ..., callback) => callback(fn(a, b, ...))
2.  要求实现x1，满足 x1(a, b, ...)(callback) ==> callback(fn(a, b, ...))

```javascript
x1 = a => callback => callback(fn(a))
```

3.  要求实现thunkify，满足 x1 = thunkify(x);

> [js-thunkify](https://github.com/mmillet/something/tree/master/js-thunkify)