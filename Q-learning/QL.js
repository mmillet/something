/**
 * Created by zhengguo.chen on 2015/10/28.
 * refer: http://blog.csdn.net/pi9nc/article/details/27649323
 */
var r2q = (R, getNextStateFn, cnt, r) => {
  var cnt = cnt || 10,
      r = r || 0.8,
      getNextStateFn = getNextStateFn || ((s, a) => a);
  var stateLength = R.length,
      actionLength = R[0].length;
  var Q = (() => {
    var s = -1;
    var arr = [];
    while(++s < stateLength) {
      arr[s] = [];
      var a = -1;
      while(++a < actionLength) {
        arr[s].push(0);
      }
    }
    return arr;
  })();

  var setQ = (s, a) => {
    if(R[s][a] === -1) {
      return;
    }
    var _s = getNextStateFn(s, a); //获取下一个状态
    var _a = -1;
    var _aList = [];
    var _qList = [];
    while(++_a < actionLength) {
      if(R[_s][_a] !== -1) {
        _qList.push(Q[_s][_a]);
        _aList.push(_a);
      }
    }
    var lastQ = Q[s][a];
    Q[s][a] = R[s][a] + r * Math.max.apply(null, _qList);
    if(lastQ === Q[s][a]) {
      return;
    }
    var _aIndex = -1;
    while(++_aIndex < _aList.length) {
      var __a = _aList[_aIndex];
      setQ(_s, __a);
    }
  };

  while(cnt--) {
    var s = -1;
    while(++s < stateLength) {
      var a = -1;
      while(++a < actionLength) {
        setQ(s, a);
      }
    }
  }

  return Q;
};

var makeR = (states, actions, getRewardFn) => {
  var R = [];
  var s = -1;
  while(++s < states.length) {
    R[s] = R[s] || [];
    var a = -1;
    while(++a < actions.length) {
      R[s][a] = getRewardFn(s, a);
    }
  }
  return R;
};

var getActionMap = Q => {
  var actions = [];
  Q.map(function(rewards) {
    actions.push(rewards.indexOf(Math.max.apply(null, rewards)));
  });
  return actions;
};

/*test*/
if(require.main === module) {
  console.log(
    r2q([
      [-1, -1, -1, -1, 0, -1],
      [-1, -1, -1, 0, -1, 100],
      [-1, -1, -1, 0, -1, -1],
      [-1, 0, 0, -1, 0, -1],
      [0, -1, -1, 0, -1, 100],
      [-1,  0, -1, -1, 0, 100]
    ])
  );
  console.log(r2q([[-1,-1,0,0,100]], (()=>0)));
  console.log(r2q([[-1,-1], [100, 100]]));
  console.log(r2q([[-1,-1,0,0,100],[-1,-1,0,-1,100],[-1,100,0,-1,100]], ((a)=>a%3)));
}

module.exports = {r2q, makeR, getActionMap};