import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./map.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my-great-place';
Object.assign = require('object-assign');

//import { withGoogleMap } from "react-google-maps";

export default class GMap extends Component {

  static defaultProps = {
    center: [45.0287579, 38.9680473],
    zoom: 18,
    greatPlaceCoords: {lat: 45.0287579, lng: 38.9680473}
  };

  onClickHandler(e) {
    console.log(e);

  }


  render() {
    return (
          <GoogleMap
            center={this.props.center}
            defaultZoom={this.props.zoom}
            onClick={e => this.onClickHandler(e)}>
            {
              this.props.parkingMarkers.map((parking)=>{
                return <MyGreatPlace lat={parking[0]} lng={parking[1]} text={'P'}/>
              })
            }
          </GoogleMap>
    );
  }


}
