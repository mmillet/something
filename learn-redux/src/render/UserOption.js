import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import UpdateBtn from './UpdateBtn';

export default React.createClass({
  // mixins: [PureRenderMixin],
  getInitialState() {
    return {
      selected: false,
      disableUpdate: false
    };
  },
  onUserClick() {
    this.setState({selected: !this.state.selected}, () => {
      // repeat render
      this.props.onUserSelected(this.props.name);
    });
  },
  onUpdate() {
    this.props.onUpdateUser(this.props.name);
  },
  /*
  componentDidMount() {
    document.addEventListener('updateUser', (e) => {
      console.log('update user...', e.detail);
      this.setState({disableUpdate: e.detail !== this.props.name});
    });
  },
  */
  render() {
    console.log('UserOption rendering');
    var {name} = this.props;
    var {selected, disableUpdate} = this.state;
    return (
      <p>
        <span onClick={this.onUserClick}>{name}</span>
        {selected && <strong>√</strong>}
        <UpdateBtn onClick={this.onUpdate} disabled={disableUpdate}/>
      </p>
    )
  }
});
