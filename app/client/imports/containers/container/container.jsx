import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./container.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
import Map from '../../components/map/map';
Object.assign = require('object-assign');


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

        <div className="main-navigation">
          <div className="main-button">
            <IonButton color="positive">
              Быстрая парковка
            </IonButton>
          </div>
          <div className="main-button-second">
            <IonButton color="positive"
                       link="/autorization-form">
              Войти!
            </IonButton>
          </div>
        </div>
      </IonContent>
    );
  }
}