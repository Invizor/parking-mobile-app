import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import shouldPureComponentUpdate from 'react-pure-render/function';

//import {greatPlaceStyle} from './parking-marker-styles.js';
import "./parking-marker.scss";

export default class ParkingMarker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  getLink(id) {
    return "/parking-item/" + id;
  }


  render() {
    return (
          <div className="parking">
            <IonButton link={this.getLink(this.props.parkingId)}>1125</IonButton>
          </div>
    );
  }
}
