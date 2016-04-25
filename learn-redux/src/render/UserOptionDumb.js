import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import UpdateBtn from './UpdateBtn';

export default React.createClass({
  mixins: [PureRenderMixin],
  onUpdate() {
    this.props.onUpdate(this.props.name);
  },
  render() {
    console.log('UserOption Dumb rendering');
    var {name, selected, onUserSelected, onUpdate, disableUpdate} = this.props;
    return (
        <p>
          <span onClick={onUserSelected}>{name}</span>
          {selected && <strong>√</strong>}
          <UpdateBtn onClick={onUpdate} disabled={disableUpdate}/>
        </p>
      )
  }
});

