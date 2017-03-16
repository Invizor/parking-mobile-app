import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./container.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
Object.assign = require('object-assign');
import GMap from '../../components/google-map/google-map';
import MyPosition from '../../components/my-position/my-position';
//import { withGoogleMap } from "react-google-maps";

export default class Container extends Component {

  static defaultProps = {
    center: [45.0287579, 38.9680473],
    zoom: 18,
    greatPlaceCoords: {lat: 45.0287579, lng: 38.9680473}
  };

  /*parkingMarkers = [
    [45.028857, 38.967913],
    [45.028808, 38.968230]
  ];*/

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


  //url = 'http://ilyakantor.ru/xdr/receive.php';

  doCallOtherDomain(url){
    var XHR = window.XDomainRequest || window.XMLHttpRequest
    var xhr = new XHR();

    xhr.open('GET', url, true);

    // замена onreadystatechange
    xhr.onload = function() {
      document.getElementById('response').innerHTML = xhr.responseText
    };

    xhr.onerror = function() {
      alert("Error")
    };

    xhr.send()
  }













  httpGet(theUrl)
  {
    var client = new XMLHttpRequest();
    client.withCredentials = true;
    client.open("GET", theUrl);
    client.onreadystatechange = function() { this.parkingMarkers = this.responseText; console.log("parking list")};
    client.send();

    /*var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.withCredentials = true;
    xhr.open('GET', theUrl, true);

    xhr.onload = function() {
      alert( this.responseText );
    };

    xhr.onerror = function() {
      alert( 'Ошибка ' + this.status );
    };

    xhr.send();*/

    /*var xmlHttp = new XMLHttpRequest();
    xhr = new XDomainRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;*/
/*
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    var xhr = new XHR();
    //xhr.setRequestHeader('Access-Control-Allow-Origin:', '*');
    xhr.open('GET', theUrl, true);

    xhr.onload = function() {
      alert( console.log(this.responseText));
    };

    xhr.onerror = function() {
      alert( 'Ошибка ' + this.status );
    };

    xhr.send();*/
  }


  createCORSRequest(url) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("GET", url, true);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("GET", url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;
    }
    return xhr.responseText;
  }

  //var xhr = createCORSRequest('GET', url);




  //


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
   // this.httpGet('http://parkingkrd.ru/parking/getJson');
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
                       link="/third-map">
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