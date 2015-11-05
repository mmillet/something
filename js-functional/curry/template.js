/**
 * Created by zhengguo.chen on 2015/10/10.
 */
'use strict';
let template = str => obj => {
  var newStr = "";
  for(let i in obj) {
    newStr = str.replace(new RegExp("{" + i + "}", "g"), obj[i]);
  }
  return newStr;
};

var tmpl = template("Hello {user}");
console.log(tmpl({user: "world"}));
console.log(tmpl({user: "Millet"}));