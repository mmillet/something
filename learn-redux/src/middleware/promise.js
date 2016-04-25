import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case 'ADD':
      return {...state, num: state.num + action.payload};
    default: 
      return state;
  }
};

// 模拟服务器get
const fetchNum = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num * 2), 3000);
  })
}

// todo createAction
const add = (num) => ({type: 'ADD', payload: num});

const addLater = (num) => {
  return fetchNum(num).then(num => add(num));
};
const addLaterWithPayload = (num) => ({
  type: 'ADD',
  payload: fetchNum(num)
});

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware)(createStore);
var store = createStoreWithMiddleWare(reducer, {num: 0});

store.subscribe(() => {console.log(store.getState())});
store.dispatch(add(1));
store.dispatch(addLater(100));
store.dispatch(addLaterWithPayload(200));
store.dispatch(add(1));
store.dispatch(add(1));


// write less do more
// https://github.com/acdlite/redux-actions
// import { createAction, handleAction, handleActions } from 'redux-actions';
// var addSync = createAction('ADD');
// var addAsync = createAction('ADD', fetchNum);
// console.log(addSync(555));
// console.log(addAsync(555));
// store.dispatch(addAsync(555));
