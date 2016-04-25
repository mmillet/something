import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import UserSelectedList from './UserSelectedList';
import UserOptionDumb from './UserOptionDumb';
import UpdateBtn from './UpdateBtn';

import {find} from 'lodash';

// Using Function.bind and PureRenderMixin - React Discuss
// https://discuss.reactjs.org/t/using-function-bind-and-purerendermixin/655
// todo
/*
var __caches = {};
function boundMemorizer(fn, id, param) {
  __caches[id] === undefined && (__caches[id] = []);
  var cacheList = __caches[id];

  var cached = find(cacheList, cache => {
    return cache.param === param;
  });

  if(cached === undefined) {
    var fn = fn.bind(this, param);
    cached = {param: param, fn: fn};
    cacheList.push(cached);
  }


  console.log(__caches);
  return cached.fn;
};
*/

var App = React.createClass({
  // mixins: [PureRenderMixin],

  render() {
    var {users, updated, dispatch} = this.props;
    return (
      <div>
        <h2>User List</h2>
        <hr/>
        {
          users.map((user, index) => {
            return <UserOptionDumb key={index} name={user.name}
                                   selected={user.selected} disableUpdate={user.disableUpdate}
                                   onUserSelected={dispatch.bind(this, {type: 'SELECT_USER', name: user.name})}
                                   onUpdate={dispatch.bind(this, {type: 'UPDATE_DATE', name: user.name})}
            />
          })
        }
        <UserSelectedList users={users}/>
        <hr/>

        <address>
          <span>Updated at {updated.date} by {updated.by}</span>
          <UpdateBtn onClick={dispatch.bind(this, {type: 'UPDATE_DATE', date: Date().toString()})}>Update date</UpdateBtn>
        </address>
      </div>
    );
  }
});

/*
var actions = {
  updateDate() {
    return {type: 'UPDATE_DATE'}
  },
  updateUser(name) {
    return {type: 'UPDATE_USER', name: name}
  },
  selectUser(name) {
    return {type: 'SELECT_USER', name: name}
  }
};
*/

// connect action to props
const mapStateToProps = (state) => state;
// todo bindActionCreators 如果不绑定。。。
// const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps)(App);

