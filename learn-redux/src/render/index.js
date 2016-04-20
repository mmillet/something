import React, {addon} from 'react';
import ReactDom from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var UserOption1 = React.createClass({
  // render optimize
  // mixins: [PureRenderMixin],
  getInitialState() {
    return {
      selected: false
    }
  },
  onUserClick() {
    this.setState({selected: !this.state.selected}, () => {
      this.props.onUserSelected(this.props.name);
    });
  },
  render() {
    console.log('UserOption1 rendering');
    var {name} = this.props;
    var {selected} = this.state;
    return <div>
      <p onClick={this.onUserClick}>{name} {selected && <strong>√</strong>}</p>
    </div>
  }
});


var UserOption2 = React.createClass({
  // render optimize
  // mixins: [PureRenderMixin],
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // },
  render() {
    console.log('UserOption2 rendering');
    var {name, selected, onUserSelected} = this.props;
    return <div>
      <p onClick={onUserSelected}>{name} {selected && <strong>√</strong>}</p>
    </div>
  }
});

var UserSelectedList = React.createClass({
  render() {
    console.log('UserSelectedList rendering');
    var {users} = this.props;
    return <i>
      <span>Selected: </span>
      {
        users.map((user, index) => {
          return user.selected ? (
            <strong key={index}> {user.name} </strong>
          ) : null
        })
      }
      <br/>
    </i>
  }
})

var Main = React.createClass({
  getInitialState() {
    return {
      users: [
        // {name: 'irenexixi'},
        // {name: 'Luomando'},
        // {name: 'flyingzl'},
        // {name: 'fahai'},
        {name: 'mmillet'}
      ]
    };
  },
  onUserSelected(name) {
    this.setState((state) => {
      state.users.find((user) => {
        if(user.name === name) {
          user.selected = !user.selected;
          return true;
        }
      });
      return state;
    });
  },
  onUserClick(user) {
    this.setState({selected: user.name});
  },
  render() {
    console.log('Main rendering');
    var {users} = this.state;
    return (
      <div>
        <h2>重复渲染</h2>
        <UserSelectedList users={users}/>
        <hr/>
        {
          users.map((user, index) => {
            return <UserOption1 key={index} name={user.name} onUserSelected={this.onUserSelected}/>
          })
        }

        {/*

        <h3>优化</h3>
        {
          users.map((user, index) => {
            return <UserOption2 key={index} name={user.name} selected={user.selected}
                                onUserSelected={this.onUserSelected.bind(this, user.name)}/>
          })
        }

         */}
      </div>
    );
  }
});

ReactDom.render(<Main/>, document.getElementById('root'));
