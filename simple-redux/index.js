function createStore(reducers, initialState) {
  var state = initialState;
  var listeners = [];
  function dispatch(action) {
    state = reducres(state, action);
    listeners.forEach(listener => listener());
  }
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners = listeners.filter(_listener => _listener !== listener);
    }
  }
  function getState() {
    return state;
  }
  return {
    dispatch,
    subscribe,
    getState
  }
}

/* unit test */
var store = createStore(
  // reducers
  (state, action) => {
    switch(action.type) {
      case 'INCREMENT':
        return {...state, cnt: state.cnt + 1};
      case 'DECREMENT':
        return {...state, cnt: state.cnt - 1};
      default:
        return state;
    }  
  }, 
  // initialState
  { cnt: 0 }
);
var unsubscribe = store.subscribe(() => console.log('state changed', store.getState()));
store.dispatch({type: 'INCREMENT'});
unsubscribe();
store.dispatch({type: 'INCREMENT'});
console.log('current state', store.getState());