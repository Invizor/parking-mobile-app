import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "../../containers/container/container.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import MyPosition from '../../components/my-position/my-position';
import ParkingItem from '../parking-item/parking-item';
import parkingStorage from '../parking-storage/parking-storage';

import ParkingMarker from '../parking-marker/parking-marker';
Object.assign = require('object-assign');

//import { withGoogleMap } from "react-google-maps";

export default class GMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapCenter: this.geoLocation,
      parkingMarkers: []
    };
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }


  geoLocation=[45.0287579, 38.9680473];

  static defaultProps = {
    center: [45.0287579, 38.9680473],
    zoom: 14,
    greatPlaceCoords: {lat: 45.0287579, lng: 38.9680473}
  };



  onSuccess(e, position) {
    getGeoLocation(e, position);
  }
  getGeoLocation(position) {
    this.setState({mapCenter: [position.coords.latitude, position.coords.longitude]});

  }

  onError(error) {
    alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }

  onGeoLocBtnClick(e) {
    this.watchID = navigator.geolocation.getCurrentPosition(this.getGeoLocation, this.onError);
  }
  onShowStateBtnClick(e) {
    //console.log('parkingMarkers', this.parkingMarkers);
    //console.log(  this.parkingMarkers[2]);
    //console.log(this.state.parkingMarkers.length);
    console.log('parkings',this.state.parkingMarkers.parkings);
  }



  showCoords(e) {
    //this.setState({mapCenter: [45.0287579, 38.9680473]});
    //this.watchId = navigator.geolocation.watchPosition(this.getPosition, this.onError);
    //console.log("e ", e);
    //console.log("this ", this);
    this.setState({mapCenter: [e.center.lat, e.center.lng]})
  }
  showCoordsE(e) {
    //console.log(e);
  }


  httpGet(theUrl) {

    //this.setState({parkingMarkers: [{id: 0, coord:[45.0287579,38.9680473]}]})
    let client = new XMLHttpRequest();
    //client.withCredentials = true;
    client.open("GET", theUrl + '?lon=45.029453&lat=38.969549&distance=200');
     client.send();
    client.onload=()=>{
      let parkingList = JSON.parse(client.responseText);
      //console.log('parkingList', parkingList);
      this.setState({parkingMarkers: parkingList});
      parkingStorage.parkings = parkingList.parkings;
      console.log('s1', parkingStorage);
      //this.setState({parkingMarkers: [{id: 0, coord:[45.0287579,38.9680473]}]})
     // this.parkingMarkers = parkingList;
    };
  }


  getData() {

    this.httpGet('https://parkimon.ru/api/v1/geolocation/near');
  }


  componentDidMount(){
    //console.log('this.responseText');
    console.log(this.state.parkingMarkers);
    this.getData();
    // this.watchID = navigator.geolocation.watchPosition(this.getGeoLocation, this.onError, { timeout: 1000 });
  }

  render() {

    let parkings;
   // console.log(this.state.parkingMarkers,this.state);
    if (this.state.parkingMarkers.success){
      parkings = this.state.parkingMarkers.parkings.map((parking)=> {
        return <ParkingMarker lat={parking.geoCenter[0]}
                              lng={parking.geoCenter[1]}
                              text={parking.zoneId}
                              parkingId={parking._id}
                              key={parking._id}/>
      });
   // console.log(this.state.parkingMarkers,this.state)
    }

    return (
          <div>
            <GoogleMap
              onChange={e=> this.showCoords(e)}
              onClick={e=> this.showCoordsE(e)}
              center={this.state.mapCenter}
              defaultZoom={this.props.zoom}>
              {
                parkings
              }
            </GoogleMap>
            <IonButton color="positive" onClick={e=>this.onGeoLocBtnClick(e)}>
              Определить местоположение!
            </IonButton>
            <IonButton color="positive" onClick={e=>this.onShowStateBtnClick(e)}>
              Показать состояние!
            </IonButton>
          </div>

    );
  }


}
