import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./container.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
Object.assign = require('object-assign');
import GMap from '../../components/google-map/google-map';

//import { withGoogleMap } from "react-google-maps";

export default class Map extends Component {

  static defaultProps = {
    center: [45.0287579, 38.9680473],
    zoom: 18,
    greatPlaceCoords: {lat: 45.0287579, lng: 38.9680473}
  };

  parkingMarkers = [
    [45.028857, 38.967913],
    [45.028808, 38.968230]
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

  componentDidMount(){
    //this.watchID = navigator.geolocation.watchPosition(this.onSuccess, this.onError, { timeout: 30000 });
  }

  componentWillMount() {
    //this.getGeoLocation();
  }

  onClickChangeCoords(e) {

    console.log("old coords: ", this.geoLocation);
    this.geoLocation = [45.000000, 38.000000];
    console.log("new coords: ", this.geoLocation);
  }



  render() {
    console.log("navigator.geolocation works well");
    return (
      <IonContent customClasses=""
                  {...this.props}>
        <div className="mapContainer">
          <GMap
            coordinates = {this.props.center}
            parkingMarkers={this.parkingMarkers}>

          </GMap>
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




/*

var Map = React.createClass({


  render() {
    var map;
    document.addEventListener("deviceready", function() {
      var div = document.getElementById("map_canvas");

      // Initialize the map view
      map = plugin.google.maps.Map.getMap(div);

      // Wait until the map is ready status.
      map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
    }, false);

    function onMapReady() {
      var button = document.getElementById("button");
      button.addEventListener("click", onBtnClicked, false);
    }

    function onBtnClicked() {
      map.showDialog();
    }

    return (
      <IonContent customClasses=""
                  {...this.props}>
       <div>
         <h1>
           It is component Map
           <div id="map_canvas"></div>
         </h1>
       </div>

      </IonContent>
    )
  }
});

export default Map;
*/