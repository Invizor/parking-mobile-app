import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "../../containers/container/container.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import MyPosition from '../../components/my-position/my-position';
import ParkingItem from '../parking-item/parking-item';

import MyGreatPlace from '../parking-marker/parking-marker';
Object.assign = require('object-assign');

//import { withGoogleMap } from "react-google-maps";

export default class GMap extends Component {

  constructor(props) {
    super(props);
    this.state = {mapCenter: this.geoLocation};
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }

  geoLocation=[45.0287579, 38.9680473];

  static defaultProps = {
    center: [45.0287579, 38.9680473],
    zoom: 18,
    greatPlaceCoords: {lat: 45.0287579, lng: 38.9680473}
  };


  onSuccess(e, position) {
  //  console.log('Latitude: ' + position.coords.latitude);
   // console.log('Longitude: ' + position.coords.longitude);
    getGeoLocation(e, position);
    //console.log("one", this);
    //this.geoLocation=[position.coords.latitude, position.coords.longitude];

  }
  getGeoLocation(position) {
    //console.log("three", position.coords.latitude, position.coords.longitude);
    this.setState({mapCenter: [position.coords.latitude, position.coords.longitude]});
    //console.log(e.lat, e.lng);
    //this.setState({mapCenter: [e.lat, e.lng]});
    /*setTimeout(()=>{this.geoLocation = [
      position.coords.latitude,
      position.coords.longitude
    ]}, 3000)*/
  }

  onError(error) {
    alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }

  onGeoLocBtnClick(e) {
    this.watchID = navigator.geolocation.getCurrentPosition(this.getGeoLocation, this.onError);
  }

  componentDidMount(){
   // this.watchID = navigator.geolocation.watchPosition(this.getGeoLocation, this.onError, { timeout: 1000 });
  }

  showCoords(e) {
    //this.setState({mapCenter: [45.0287579, 38.9680473]});
    //this.watchId = navigator.geolocation.watchPosition(this.getPosition, this.onError);
    //console.log("e ", e);
    //console.log("this ", this);
    this.setState({mapCenter: [e.center.lat, e.center.lng]})
  }
  showCoordsE(e) {
    console.log(e);
  }


  getPosition() {

  }


  render() {
    return (
          <div>
            <GoogleMap
              onChange={e=> this.showCoords(e)}
              onClick={e=> this.showCoordsE(e)}
              center={this.state.mapCenter}
              defaultZoom={this.props.zoom}>
              <MyPosition lat={45.0287579} lng={38.9680473}/>
              {
                this.props.parkingMarkers.map((parking, index)=>{
                  return <MyGreatPlace lat={parking[0]}
                                       lng={parking[1]}
                                       text={'P'}
                                       key={index}
                                       link="/parking-item"/>
                })
              }

            </GoogleMap>
            <IonButton color="positive" onClick={e=>this.onGeoLocBtnClick(e)}>
              Определить местоположение!
            </IonButton>
          </div>

    );
  }


}
