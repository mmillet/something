import { createStore } from 'redux';
import calc from './reducer';

var store = createStore(calc);
export default store;

