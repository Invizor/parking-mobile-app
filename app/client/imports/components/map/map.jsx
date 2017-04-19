import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import createHashHistory from "history/lib/createHashHistory";
import Repository from "../../storage/local-storage";
import requestToServer from "../../utils/request-to-server";
import EventEmitterMixin from "react-event-emitter-mixin";
import "./map.scss";

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
      maxZoom={18}
      imagePath={(Repository.get_obj("platform") == "Android") ? "/android_asset/www/img/cluster-icons/m" : "/img/cluster-icons/m"}
      //imagePath="/android_asset/www/img/cluster-icons/m"
    >
      {props.markers.map((marker) => (
        <Marker
          icon= {{
            url: './mapIcon.svg',
            scaledSize: new google.maps.Size(74, 96),
            labelOrigin: new google.maps.Point(36, 38)
          }}
          label={marker.zoneId}
          onClick={() => props.onMarkerClick(marker)}
          position={{lat: marker.geoCenter[0], lng: marker.geoCenter[1]}}
          key={marker._id}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

let Map = React.createClass({

  mixins: [EventEmitterMixin],

  getInitialState: function() {
    return {
      markers: [],
      mapCenter: this.geoLocation,
      parkingMarkers: [],
      geoLocation: [45.0287579, 38.9680473]
    }
  },

  /*constructor(props) {
    super(props);
    this.state = {
      markers: [],
      mapCenter: this.geoLocation,
      parkingMarkers: [],
      geoLocation: [45.0287579, 38.9680473]
    };
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }*/


  onSuccess(e, position) {
    this.getGeoLocation(e, position);
  },

  getGeoLocation(e, position) {
    console.log(position);
    this.setState({mapCenter: [position.coords.latitude, position.coords.longitude]});
  },

  onError(error) {
    alert("code: " + error.code + "\n" +
      "message: " + error.message + "\n");
  },

  onGeoLocBtnClick() {
    this.watchID = navigator.geolocation.getCurrentPosition(this.getGeoLocation, this.onError);
  },

  onShowStateBtnClick() {
    console.log("parkings", this.state.markers);
  },


  showCoords(e) {
    this.setState({mapCenter: [e.center.lat, e.center.lng]});
  },


  getPaidParkings() {
    requestToServer("GET", "https://parkimon.ru/api/v1/geolocation/near?lon=45.029453&lat=38.969549&distance=2000", (parkingList)=>{
      if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
          if (this == null) {
            throw new TypeError("Array.prototype.find called on null or undefined");
          }
          if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function");
          }
          let list = Object(this);
          let length = list.length >>> 0;
          let thisArg = arguments[1];
          let value;

          for (let i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
          return undefined;
        };
      }
      let paidParkingList = parkingList.parkings.filter((parking)=> {
        if(parking.price.length) {
          return parking;
        }
      });
      /*console.log("parkingList", parkingList);
      console.log("paidParkingList", paidParkingList);*/
      this.setState({markers: paidParkingList});
      Repository.add_obj("paidParkingList", paidParkingList);
      this.eventEmitter("emit","parkingsLoaded");
    }, false);
  },


  componentDidMount() {
    if (Repository.get_obj("paidParkingList")) {
      this.setState({markers: Repository.get_obj("paidParkingList")});
    } else {
      this.getPaidParkings();
    }
   // this.showLoading();


  },

  handleMarkerClick(targetMarker) {
    let history = createHashHistory();
    history.push("/parking-item/" + targetMarker._id);
  },

  onClearLocalStorageClick() {
    Repository.clearRep();
  },

  showLoading() {
    let customTemplate = <div><h2><IonSpinner icon="dots" customClasses="inloader spinner-light"/>Подождите<IonSpinner
      icon="dots" customClasses="inloader spinner-light"/></h2><p>Парковки загружаются</p></div>;
    let ionShowLoading = this.context.ionShowLoading;
    ionShowLoading(true, {
      backdrop: false,
      delay: 0,
      duration: 3000,
      customTemplate: customTemplate
    });
  },


  render() {
    //console.log("parkings", this.state.markers);
    return (
      <div>
        <MarkerClustererExampleGoogleMap
          containerElement={
            <div style={{height: "100%"}}/>
          }
          mapElement={
            <div style={{height: "100%"}}/>
          }
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
          mapCenter={this.state.mapCenter}
        />
      </div>

    );
  }
});

/*
const MarkerClustererExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{lat: 45.0287579, lng: 38.9680473}}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      maxZoom={18}
     // minimumClusterSize={3}
      gridSize={60}
      //imagePath="/android_asset/www/img/cluster-icons/m"
      imagePath=  "/img/cluster-icons/m"
    >
      {props.markers.map(marker => (
        <Marker
          icon="./mapIcon.svg"
          label={marker.zoneId}
          onClick={() => props.onMarkerClick(marker)}
          position={{lat: marker.geoCenter[0], lng: marker.geoCenter[1]}}
          key={marker._id}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

export default class MarkerClustererExample extends Component {
  state = {
    markers: [],
  }

  componentDidMount() {

    if (Repository.get_obj("paidParkingList")) {
      this.setState({markers: Repository.get_obj("paidParkingList")});
    } else {
      this.getPaidParkings();
    }
    // this.showLoading();


   /!* fetch(`https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.photos });
        console.log("this.state.markers", this.state.markers);
      });*!/


  }

  getPaidParkings() {
    requestToServer("GET", "https://parkimon.ru/api/v1/geolocation/near?lon=45.029453&lat=38.969549&distance=2000", (parkingList)=>{

     // console.log("parkingList", parkingList);
      if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
          if (this == null) {
            throw new TypeError("Array.prototype.find called on null or undefined");
          }
          if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function");
          }
          let list = Object(this);
          let length = list.length >>> 0;
          let thisArg = arguments[1];
          let value;

          for (let i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
          return undefined;
        };
      }
      let paidParkingList = parkingList.parkings.filter((parking)=> {
        if(parking.price.length) {
          return parking;
        }
      });
      //console.log("parkingList", parkingList);
     // console.log("paidParkingList", paidParkingList);
      this.setState({markers: paidParkingList});
      Repository.add_obj("paidParkingList", paidParkingList);
    }, false);
  }

  handleMarkerClick(targetMarker) {
    let history = createHashHistory();
    history.push("/parking-item/" + targetMarker._id);
  }



  render() {
    console.log("this.state.markers", this.state.markers);
    return (
      <MarkerClustererExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        markers={this.state.markers}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}*/


Map.contextTypes = {
  ionShowLoading: React.PropTypes.func
};

export default Map;