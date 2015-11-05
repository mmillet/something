#function-cache
放一个方法具有缓存功能
用法：
```code```
  makeCached(func [, options]);

  options:
    maxLength //最大缓存数量，默认1000条
    expires //缓存过期时间，默认60秒
