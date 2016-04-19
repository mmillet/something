import { ACTION_TYPES } from './constant';
const { PUSH_OPERATOR, PUSH_NUMBER, CALCULATE, CLEAN, BACK } = ACTION_TYPES;

const getInitialState = () => {
  return {
    lastStack: [],
    stack: [],
    current: '0',
    result: ''
  }
};

const isOperator = (str) => {
  return /^[\+\-\*\/]$/.test(str);
};

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case PUSH_OPERATOR:
      var opt = action.operator;
      if(state.result !== '' && !state.stack.length) {
        state.current = state.result !== 'NaN' ? state.result : '0';
        state.result = '';
      }
      if(!isOperator(state.current) || (opt === '-' && (state.current === '*' || state.current === '/'))) {
        state.stack = [...state.stack, state.current];
      }
      if(opt !== '-' && state.current === '-' && isOperator(state.stack[state.stack.length - 1])) {
        state.stack = [...state.stack].slice(0, -1);
      }
      state.current = opt;
      return state;

    case PUSH_NUMBER:
      var num = action.number;
      if(state.result !== '' && !state.stack.length) {
        state.current = '0';
        state.result = '';
      }
      if(isOperator(state.current)) {
        state.stack = [...state.stack, state.current];
        state.current = '';
      }
      if(num !== '.' || !/\./.test(state.current)) {
        state.current = (state.current === '0' && num !== '.' ? '' : state.current)  + '' + num;
      }
      return state;

    case BACK:
      if(state.result !== '' || (!state.stack.length && state.current === '0')) {
        return getInitialState();
      }
      state.current = state.current.replace(/.$/, '');
      if(state.current === '') {
        if(state.stack.length === 0) {
          state.current = '0';
        } else {
          var tmpStack = [...state.stack];
          state.current = tmpStack.pop();
          state.stack = tmpStack;
        }
      }
      return state;

    case CLEAN:
      return getInitialState();

    case CALCULATE:
      var stack = [...state.stack, state.current];
      var stackToEval = [...stack];
      if(stack.length > 1) {
        isOperator(stackToEval[stackToEval.length - 1]) && stackToEval.pop();
        state = getInitialState();
        state.lastStack = stack;
        state.result = eval(stackToEval.join('').replace(/∞/g, 'Infinity'))
                          .toPrecision(12)
                          .replace(/(\.0+)$/, '').replace(/(\.\d+?)(0+)$/, '$1')
                          .replace(/Infinity/g, '∞');
      }
      return state;

    default:
      return state;
  }
};

