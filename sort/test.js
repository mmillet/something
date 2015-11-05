/**
 * Created by zhengguo.chen on 2015/10/15.
 */
function sortSuggestion(arr, wProp) {
  function sortGroup(sArr, mArr, lArr, result) {
    result = result || [];
    var sLength = sArr.length;
    var mLength = mArr.length;
    var lLength = lArr.length;
    if(!sLength && !mLength && !lLength) {
      return result;
    }
    if(sLength) {
      if(sLength >= 3) {
        result.push(sArr.splice(0, 3));
        if(sArr.length === 0 && mLength >= 2 && (mArr[mLength-1][wProp] - mArr[0][wProp]) > 20) {
          result.push([mArr.pop(), mArr.shift()]);
        }
      } else if(sLength === 2) {
        result.push([sArr.pop(), sArr.pop()]);
      } else if(mLength) {
        result.push([mArr.shift(), sArr.pop()]);
      } else if(lLength) {
        result.push([lArr.shift(), sArr.pop()]);
      } else {
        result.push([sArr.pop()]);
      }
    } else if(mLength) {
      result.push(mArr.splice(0, 1));
    } else {
      result.push(lArr.splice(0, 1));
    }
    return sortGroup(sArr, mArr, lArr, result);
  }
  var groupedArr = arr.sort(function(a, b){
      return a[wProp] - b[wProp]
    }).reduce(function(group, v) {
      group[v[wProp] <= 33 ? 0 : (v[wProp] > 33 && v[wProp] <= 66 ? 1 : 2)].push(v);
      return group;
    }, [[], [], []]);
  return sortGroup.apply(null, groupedArr);
}


var arr = [
  {name:123, w:33},
  {name:42, w:9},
  {name:456, w:3},
  {name:"xca", w:214},
  {name:"asd", w:0},
  {name:"11234", w:55},
  {name:"45645", w:22}
];
console.log(sortSuggestion(arr, 'w'));