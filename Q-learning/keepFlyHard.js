/**
 * Created by zhengguo.chen on 2015/10/28.
 */
'use strict';
class Bird {
  constructor(height, vy) {
    this.flap = () => height += 20;
    this.score = 0;
    this.startFly = () => {
      var flyTimer = setInterval(() => {
        height -= vy;
        if(height < 0) {
          clearInterval(flyTimer);
          console.log('Died!');
        } else {
          console.log('Flying ( Height : ' + height + ' )');
          //score
          if(height >= 400) {
            this.score += 0;
          } else if(height > 300 || height < 200) {
            this.score += 5;
          } else {
            this.score += 10;
          }
        }
        console.log("Score: ", this.getScore());
      }, 150);
      return this;
    };
    this.getHeight = () => height;
  }
  getScore() {
    return this.score;
  }
}

//游戏开始
var initHeight = (() => {
  var height = Math.ceil(Math.random() * 300);
  return height + 5 - (height % 5);
})();
var bird = new Bird(initHeight, 5).startFly();

/****AI****/
var ql = require("./QL");

//状态为高度，各个高度设置为state
var states = [];
var s = -1;
while(++s < 410 / 5) {
  states.push(s);
}
//动作表示为是否flap，是为0, 什么都不做为1
var actions = [0, 1];
//高度转换为状态，高度就是state
var height2state = height => height / 5;
//执行动作
var doAction = (action, bird) => action === 0 && (console.log('***AI Flap***'), bird.flap());
//获取奖励的方法
var getReward = (s, a) => {
  //计算当前奖励
  var height = s * 5;
  if(height <= 0) {
    return -1;
  } else if(height > 400) {
    return 50;
  } else if(height < 200 || height > 300) {
    return 100;
  } else {
    return 200;
  }
}
//生成R
var R = ql.makeR(states, actions, getReward);
//状态转换方法，始终都会转换到状态0
var getNextState = (s, a) => {
  //计算下一次的高度作为状态
  var nextState = ((s * 5) + (1-a) * 20 - 5) / 5;
  nextState = nextState < 0 ? 0 : nextState;
  nextState = nextState > 81 ? 80 : nextState;
  return nextState;
};
//生成Q
var Q = ql.r2q(R, getNextState, 20);
//生成最优
var qMax = ql.getActionMap(Q);
//AI start，和游戏时钟一致
setInterval(() => doAction(qMax[height2state(bird.getHeight())], bird), 500);
