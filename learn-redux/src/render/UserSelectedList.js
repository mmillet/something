import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  // shouldComponentUpdate(prevProps, prevState) {
  //   console.log(this.props === prevProps);
  //   console.log(this.props.users == prevProps.users);
  //   return false;
  // },
  render() {
    console.log('UserSelectedList rendering');
    var {users} = this.props;
    return <i>
      <span>Selected: </span>
      {
        users
          .filter((user) => user.selected).map((user, index) => {
            return <strong key={index}> {user.name} </strong>
          })
      }
      <br/>
    </i>
  }
});