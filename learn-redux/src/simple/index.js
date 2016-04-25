import { createStore } from 'redux';

/**
 * reducer
 * @param state
 * @param action
 * @return {number}
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// createStore
// var create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;
let store = createStore(counter);


// store.subscribe
store.subscribe(() => {
  var currentState = store.getState(); // store.getState
  render(currentState);
});

// --------view--------
var rootEle = document.querySelector('#root');
const render = (state) => {
  rootEle.querySelector('i').innerHTML = state;
};
const bindEvents = () => {
  var btns = rootEle.querySelectorAll('button');
  // store.dispatch
  btns[0].addEventListener('click', () => {store.dispatch({type: 'INCREMENT'})});
  btns[1].addEventListener('click', () => {store.dispatch({type: 'DECREMENT'})});
};
bindEvents();

