import { createStore } from 'redux';

const reducer = (state = 0, action) => action.type === 'ADD' ? state + 1 : state;
const add = () => ({type: 'ADD'});
var store = createStore(reducer);

store.subscribe(() => {document.getElementById('state').innerHTML = JSON.stringify(store.getState())});

// 实现记录前后状态的log
var links = document.querySelectorAll('#root > a');
const bindEvent = (ele, fn) => ele.addEventListener('click', fn);

// 0. 不记录
bindEvent(links[0], () => {
  store.dispatch(add());
});

// 1. 手动记录
bindEvent(links[1], () => {
  console.log('1. 手动记录 ***');
  console.log('state:', store.getState(), 'action:', add());
  store.dispatch(add());
  console.log('state:', store.getState());
});

// 2. 封装Dispatch
const dispatchAndLog = (store, action) => {
  console.log('2. 封装Dispatch ***');
  console.log('state:', store.getState(), 'action:', action);
  store.dispatch(action);
  console.log('state:', store.getState());
};
bindEvent(links[2], () => {
  dispatchAndLog(store, add());
});

// 3. 包裹替换dispatch (Monkey)
/*
var next = store.dispatch;
store.dispatch = (action) => {
  console.log('3. Monkey ***');
  console.log('state:', store.getState(), 'action:', action);
  next(action);
  console.log('state:', store.getState());
};
*/
bindEvent(links[3], () => {
  store.dispatch(add())
});


// 3.1. 多个log
/*
const pathStoreToAddLog = (store) => {
  var next = store.dispatch;
  store.dispatch = (action) => {
    console.log('state:', store.getState(), 'action:', action);
    next(action);
    console.log('state:', store.getState());
  };
};
const pathStoreToGetCost = (store) => {
  var next = store.dispatch;
  store.dispatch = (action) => {
    console.time('Action cost');
    next(action);
    console.timeEnd('Action cost');
  };
};
pathStoreToAddLog(store);
pathStoreToGetCost(store);
*/
bindEvent(links[4], () => {
  store.dispatch(add())
});



// 4. 隐藏Monkey (并联middlewares)
const logger = (store) => {
  var next = store.dispatch;
  return (action) => {
    console.log('4. 隐藏Monkey ***');
    console.log('state:', store.getState(), 'action:', action);
    next(action);
    console.log('state:', store.getState());
  };
};
const coster = (store) => {
  var next = store.dispatch;
  return (action) => {
    console.time('Action cost');
    next(action);
    console.timeEnd('Action cost');
  };
};
// store.dispatch = coster(store);
// store.dispatch = logger(store);
const applyMiddlewareByMonkeypatching = (store, middlewares) => {
  middlewares.reverse();
  // 在每一个 middleware 中变换 dispatch 方法。
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)
  );
};
// applyMiddlewareByMonkeypatching(store, [logger, coster]);
bindEvent(links[5], () => {
  store.dispatch(add());
});



// 5 移除Monkey (串联middlewares)
const logger2 = (store) => {
  // 这里的 next 必须指向前一个 middleware 返回的函数：
  return (next) => {
    return (action) => {
      console.log('dispatching', action);
      var result = next(action);
      console.log('next state', store.getState());
      return result;
    };
  };
};
const coster2 = (store) => {
  return (next) => {
    return (action) => {
      console.time('Action cost');
      next(action);
      console.timeEnd('Action cost');
    };
  };
};
// const title = store => next => action => {
//   console.info('5 移除Monkey (串联middlewares)');
//   return next(action);
// }
const applyMiddleware = (store, middlewares) => {
  middlewares.reverse();
  var dispatch = store.dispatch;
  // 在每一个 middleware 中变换 dispatch 方法，需要传入store和当前的dispatch。
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  );
  // 处理完后，返回新的store，覆盖dispatch
  return {...store, dispatch: dispatch};
};
// store = applyMiddleware(store, [logger2, coster2]);
bindEvent(links[6], () => {
  store.dispatch(add())
});
