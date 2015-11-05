# 柯里化 Curry

## concat.js
实现  
1.  将一个数组[1, 2, 3] 分别+1，再拼接成字符串：'234'  
2.  现在将分别+1改为分别*2，再拼接后成为：'246'

## template.js
实现template方法
```javascript
var tmpl = template("Hello {user}");
console.log(tmpl({user: "world"}));
console.log(tmpl({user: "Millet"}));
```