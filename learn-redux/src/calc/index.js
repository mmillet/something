import { calculate, pushNumber, pushOperator, clean, back } from './action';
import { forEach } from 'lodash';
import store from './store';
import * as style from './style.less';

store.subscribe(() => {
  render(store.getState());
});

var $rootEle = document.querySelector('#root');
setTimeout(() => {
  $rootEle.style.display = '';
}, 300);

const render = (state) => {
  var {lastStack, stack, current, result} = state;
  const stackToStr = (stack, affix = '') => stack.length ?
                                            (stack.join(' ').replace(/([\/\*] -) /g, '$1')
                                                            .replace(/\*/g, '×').replace(/\//g, '÷') + affix) :
                                            '';
  var screenEle = $rootEle.querySelector('.screen');
  var lastEle = screenEle.querySelector('.screen-last');
  var currentEle = screenEle.querySelector('.screen-current');
  lastEle.innerHTML = stackToStr(lastStack, ' =');
  currentEle.innerHTML = result !== '' ? result : stackToStr([...stack, current]);
};

const bindEvents = () => {
  var cmdEles = $rootEle.querySelectorAll('a[cmd]');
  forEach(cmdEles, (ele) => {
    var cmd = ele.getAttribute('cmd');
    var type = ele.getAttribute('value');
    ele.addEventListener('click', () => {
      switch (cmd) {
        case 'operator':
          store.dispatch(pushOperator(type));
          break;
        case 'number':
          store.dispatch(pushNumber(type));
          break;
        case 'calculate':
          store.dispatch(calculate());
          break;
        case 'clean':
          store.dispatch(clean());
          break;
        case 'back':
          store.dispatch(back());
          break;
      }
    });
  });
};

bindEvents();
