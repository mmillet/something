import { createStore, applyMiddleware } from 'redux';

const thunk = store => next => action => {
  if (typeof action === 'function') {
    //让action能再次dispatch和获取state
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

const reducer = (state = 0, action) => {
  switch(action.type) {
    case 'ADD': 
      return state + 1;
    default: 
      return state;
  }
};
const add = () => ({type: 'ADD'});
const addLater = () => {
  return (dispatch, getState) => {
    console.log('before state: ', getState());
    setTimeout(() => {
      dispatch(add());
      console.log('after state: ', getState());
    }, 3000);
  }
};

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

var store = createStoreWithMiddleWare(reducer);

store.subscribe(() => {console.log(store.getState())});

store.dispatch(add());
store.dispatch(addLater());
store.dispatch(add());
store.dispatch(add());
