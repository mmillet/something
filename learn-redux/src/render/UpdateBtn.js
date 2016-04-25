import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render() {
    console.log('Update Btn rendering');
    var props = this.props;
    var {disabled, children} = props;
    return <button style={{float:'right', textDecoration: disabled ? 'line-through' : 'none'}} {...props}>
      {children || 'Update'}
    </button>
  }
});

