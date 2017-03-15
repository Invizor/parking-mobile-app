import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle} from './parking-marker-styles.js';
import "./parking-marker.scss";

export default class MyGreatPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
          <div style={greatPlaceStyle} className="parking" >
            {this.props.text}
            <IonButton link="/parking-item">P</IonButton>
          </div>
    );
  }
}