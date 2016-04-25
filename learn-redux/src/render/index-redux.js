import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';

import App from './App';

const getInitialState = () => {
  return {
    users: [
      {name: 'irenexixi'},
      {name: 'Luomando'},
      {name: 'flyingzl'},
      {name: 'fahai'},
      {name: 'mmillet'}
    ],
    updated: {
      date: Date().toString(),
      by: 'mmillet'
    }
  }
};

var reducer = (state, action = '') => {
  console.log(action)
  switch(action.type) {
    case 'SELECT_USER':
      // todo normalizer
      var users = state.users.map((user) => {
        user.name === action.name && (user.selected = !user.selected);
        return user;
      });
      return {...state, users: users};
    case 'UPDATE_USER':
      // todo normalizer
      var users = state.users.map((user) => {
        user.disableUpdate = user.name !== action.name;
        return user;
      });
      var updated = {...state.updated, by: action.name};
      return {...state, users, updated};
    case 'UPDATE_DATE':
      var updated = {...state.updated, date: action.date};
      return {...state, updated};
    default:
      return state;
  }
};

var store = createStore(reducer, getInitialState());

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
