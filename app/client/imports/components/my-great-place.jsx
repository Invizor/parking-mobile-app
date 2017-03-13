import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle} from './my-great-place-styles.js';

export default class MyGreatPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <div style={greatPlaceStyle}>
        {this.props.text}
      </div>
    );
  }
}