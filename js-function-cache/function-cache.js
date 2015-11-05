/**
 * Created by chenzhengguo on 2015/3/26.
 */
"use strict";
(function(window) {

  function LimitList(length) {
    if(this instanceof LimitList) {
      this.maxLength = length;
      this.list = [];
    } else {
      return new LimitList(length);
    }
  }
  /**
   * push方法，如果超出了指定大小，会删掉数组前面的值，并返回对应的值
   */
  LimitList.prototype.push = function(val) {
    this.list.push(val);
    if(this.list.length > this.maxLength) {
      return this.list.shift();
    }
  };
  /**
   * delete方法，删除指定的值
   */
  LimitList.prototype.del = function(val) {
    for(var i=0; i<this.list.length; i++) {
      if(val == this.list[i]) {
        this.list.splice(i, 1);
        break;
      }
    }
  };

  function makeCached(fn, options) {
    if (typeof fn != "function") return fn;
    var cachedData = {};
    options.maxLength = options.maxLength || 1000; //最大缓存数量，默认1000条
    options.expires = options.expires || 60000; //缓存过期时间，默认60秒
    var limitList = LimitList(options.maxLength); //用来缓存参数键值
    return function () {
      var savedArguments = Array.prototype.slice.call(arguments);
      var cachedKey = JSON.stringify(savedArguments);
      if (cachedData.hasOwnProperty(cachedKey)) {
        var data = cachedData[cachedKey];
        if(data[1] + options.expires < new Date().getTime()) { //判断过期了
          delete cachedData[cachedKey];
          limitList.del(cachedKey);
        } else {
          return data[0];
        }
      }

      var value = fn.apply(this, savedArguments);
      var deleteCachedKey = limitList.push(cachedKey);
      if(deleteCachedKey) { //判断超出最大值了
        delete cachedData[deleteCachedKey];
      }
      cachedData[cachedKey] = [value, (new Date).getTime(), new Date().getTime()];
      return value;
    };
  }

  window.makeCached = makeCached;
}(window));