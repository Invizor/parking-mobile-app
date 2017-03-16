import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./container.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
import Map from '../../components/map/map';
Object.assign = require('object-assign');
import UnautorizedUserButtons from '../../components/unauthorized-user-buttons/unauthorized-user-buttons';
import AutorizedUserButtons from '../../components/authorized-user-buttons/authorized-user-buttons';
import Repository from '../../components/Repository/Repository';

export default class Container extends Component {

  static defaultProps = {
    center: [45.0287579, 38.9680473],
    zoom: 18,
    greatPlaceCoords: {lat: 45.0287579, lng: 38.9680473}
  };



  parkingMarkers = [
    {
      id: 1225,
      coordinates: [45.028857, 38.967913]
    },
    {
      id: 1227,
      coordinates: [45.028808, 38.968230]
    }
  ];


  geoLocation=[45.0287579, 38.9680473];

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }
  onSuccess(position) {
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
    this.geoLocation=[position.coords.latitude, position.coords.longitude];
  }
  getGeoLocation() {
    setTimeout(()=>{this.geoLocation = [
      position.coords.latitude,
      position.coords.longitude
    ]}, 3000)
  }

  // onError Callback receives a PositionError object
  //
  onError(error) {
    alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }


  onClickChangeCoords(e) {
    console.log("old coords: ", this.geoLocation);
    this.geoLocation = [45.000000, 38.000000];
    console.log("new coords: ", this.geoLocation);
  }

  render() {
    return (

      <IonContent customClasses=""
                  {...this.props}>
        <div className="mapContainer">
          <Map/>
        </div>

        {
          Repository.get_obj('token') ?
            <AutorizedUserButtons />
            :
            <UnautorizedUserButtons/>
        }


      </IonContent>
    );
  }
}