import {
  default as React,
  PropTypes,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import parkingStorage from '../../storage/parking-storage';
import createHashHistory from 'history/lib/createHashHistory';
import {IonButton} from 'reactionic';
import Repository from '../../storage/local-storage';
import {IonContent, IonSpinner} from 'reactionic';
import {AbsoluteMiddle} from '../../utils/helpers';


import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";


const MarkerClustererExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    center={{lat: 45.0287579, lng: 38.9680473}}
    // defaultCenter={this.props.mapCenter ? this.props.mapCenter : { lat: this.props.mapCenter[0], lng: this.props.mapCenter[1]}}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker, index) => (
        <Marker
          icon='./mapIcon.svg'
          label={marker.zoneId}
          onClick={() => props.onMarkerClick(marker)}
          position={{lat: marker.geoCenter[0], lng: marker.geoCenter[1]}}
          key={marker._id}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      mapCenter: this.geoLocation,
      parkingMarkers: [],
      geoLocation: [45.0287579, 38.9680473]
    };
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }


  onSuccess(e, position) {
    getGeoLocation(e, position);
  }

  getGeoLocation(position) {
    console.log(position)
    this.setState({mapCenter: [position.coords.latitude, position.coords.longitude]});
  }

  onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }

  onGeoLocBtnClick(e) {
    this.watchID = navigator.geolocation.getCurrentPosition(this.getGeoLocation, this.onError);
  }

  onShowStateBtnClick(e) {
    console.log('parkings', this.state.markers);
  }


  showCoords(e) {
    this.setState({mapCenter: [e.center.lat, e.center.lng]})
  }


  httpGet(theUrl) {
    let client = new XMLHttpRequest();
    client.open("GET", theUrl + '?lon=45.029453&lat=38.969549&distance=2000');
    client.send();
    client.onload = () => {
      let parkingList = JSON.parse(client.responseText);
      this.setState({markers: parkingList.parkings});
      parkingStorage.parkings = parkingList.parkings;
    };
  }


  componentDidMount() {
    this.httpGet('https://parkimon.ru/api/v1/geolocation/near');
    this.showLoading();
  }

  handleMarkerClick(targetMarker) {
    let history = createHashHistory();
    history.push('/parking-item/' + targetMarker._id);
  }

  onClearLocalStorageClick(e) {
    Repository.clearRep();
  }

  static contextTypes = {
    ionShowLoading: React.PropTypes.func
  };

  showLoading() {
    var customTemplate = <div><h2><IonSpinner icon="dots" customClasses="inloader spinner-light"/>Подождите<IonSpinner
      icon="dots" customClasses="inloader spinner-light"/></h2><p>Парковки загружаются</p></div>
    let ionShowLoading = this.context.ionShowLoading;
    ionShowLoading(true, {
      backdrop: true,
      delay: 0,
      duration: 3000,
      customTemplate: customTemplate
    });
  }


  render() {
    return (
      <div>
        <MarkerClustererExampleGoogleMap
          containerElement={
            <div style={{height: `100%`}}/>
          }
          mapElement={
            <div style={{height: `100%`}}/>
          }
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
          mapCenter={this.state.mapCenter}
        />
        <div>

        </div>
        <IonButton color="positive" onClick={e => this.onGeoLocBtnClick(e)}>
          Определить местоположение!
        </IonButton>
        <div>
          <IonButton color="positive" onClick={e => this.onShowStateBtnClick(e)}>
            Показать состояние!
          </IonButton>
        </div>

        <div>
          <IonButton color="positive" onClick={e => this.onClearLocalStorageClick(e)}>
            Очистить localStorage!
          </IonButton>
        </div>


      </div>

    );
  }
}