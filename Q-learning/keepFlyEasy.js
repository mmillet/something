/**
 * Created by zhengguo.chen on 2015/10/28.
 */
'use strict';
var ql = require("./QL");

class Bird {
  constructor(height, vy) {
    this.flap = () => height += 20;
    this.startFly = () => {
      var flyTimer = setInterval(() => {
        height -= vy;
        if(height < 0) {
          clearInterval(flyTimer);
          console.log('Died!');
        } else {
          console.log('Flying ( Height : ' + height + ' )');
        }
      }, 500);
      return this;
    };
    this.getHeight = () => height;
  }
}

//游戏开始
var bird = new Bird(200, 5).startFly();

/****AI****/
//状态为高度，高度大于0为0，否则为1
var states = [0, 1];
//动作表示为是否flap，是为0, 什么都不做为1
var actions = [0, 1];
//高度转换为状态
var height2state = height => height > 0 ? 0 : 1;
//执行动作
var doAction = (action, bird) => action === 0 && (console.log('***AI Flap***'), bird.flap());
//假设获取奖励的方法
var getReward = (s, a) => s === 1 ? -1 : 100;
//生成R
var R = ql.makeR(states, actions, getReward);
//状态转换方法，始终都会转换到状态0
var getNextState = (s, a) => 0;
//生成Q
var Q = ql.r2q(R, getNextState);
//生成最优
var qMax = ql.getActionMap(Q);
//AI start
setInterval(() => doAction(height2state(bird.getHeight()), bird), 1000);
