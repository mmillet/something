import React from 'react';
import ReactDom from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import update from 'react-addons-update';

import UserSelectedList from './UserSelectedList';
import UserOption from './UserOption';
import UpdateBtn from './UpdateBtn';

var App = React.createClass({
  // mixins: [PureRenderMixin],
  getInitialState() {
    return {
      users: [
        // {name: 'irenexixi'},
        // {name: 'Luomando'},
        // {name: 'flyingzl'},
        // {name: 'fahai'},
        {name: 'mmillet'}
      ],
      updated: {
        date: Date().toString(),
        by: 'mmillet'
      }
    };
  },
  onUserSelected(name) {
    this.setState((state) => {
      // anti-pattern @todo
      state.users.find((user) => {
        if(user.name === name) {
          user.selected = !user.selected;
          return true;
        }
      });
      return state;
    });
  },
  onUpdateUser(name) {
    this.setState((state) => {
      // anti-pattern @todo
      state.updated.by = name;

      return state;
    });
    // document.dispatchEvent(new CustomEvent('updateUser', {detail: name}));
  },
  onUpdateDate() {
    this.setState((state) => {
      // anti-pattern @todo
      state.updated.date = Date().toString();

      // modify 1
      // state = update(state, {
      //   updated: {
      //     date: {$set: Date().toString()}
      //   }
      // });

      // modify 2
      // state.updated = Object.assign({}, state.updated, {date: Date().toString()});

      // modify 3
      // state.updated = {...state.updated, date: Date().toString()};

      return state;
    });
  },
  render() {
    console.log('App rendering');
    var {users, updated} = this.state;
    return (
      <div>
        <h2>User List</h2>
        <hr/>
        {
          users.map((user, index) => {
            return <UserOption key={index} name={user.name}
                               onUserSelected={this.onUserSelected}
                               onUpdateUser={this.onUpdateUser}/>
          })
        }

        <UserSelectedList users={users}/>
        <hr/>

        <address>
          <span>Updated at {updated.date} by {updated.by}</span>
          <UpdateBtn onClick={this.onUpdateDate}>Update date</UpdateBtn>
        </address>
      </div>
    );
  }
});

ReactDom.render(
  <App/>,
  document.getElementById('root')
);
