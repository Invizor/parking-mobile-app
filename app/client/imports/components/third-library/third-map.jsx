import fetch from "isomorphic-fetch";

/*
import {withGoogleMap} from './lib/withGoogleMap';
import {GoogleMap} from './lib/GoogleMap';
import {Marker} from './lib/Marker';
*/



/*

 <!---->
 */


import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import parkingStorage from '../parking-storage/parking-storage';
import createHashHistory from 'history/lib/createHashHistory';



import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

const MarkerClustererExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 45.0287579, lng: 38.9680473 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker, index) => (
          <Marker
            icon = './mapIcon.svg'
            label={marker.zoneId}
            onClick={()=>props.onMarkerClick(marker)}
            position={{ lat: marker.geoCenter[0], lng: marker.geoCenter[1] }}
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


  httpGet(theUrl) {

    //this.setState({parkingMarkers: [{id: 0, coord:[45.0287579,38.9680473]}]})
    let client = new XMLHttpRequest();
    //client.withCredentials = true;
    client.open("GET", theUrl + '?lon=45.029453&lat=38.969549&distance=5000');
    client.send();
    client.onload=()=>{
      let parkingList = JSON.parse(client.responseText);
      //console.log('parkingList', parkingList);
      this.setState({markers: parkingList.parkings});
      parkingStorage.parkings = parkingList.parkings;
      console.log('s1', parkingStorage);
      //this.setState({parkingMarkers: [{id: 0, coord:[45.0287579,38.9680473]}]})
      // this.parkingMarkers = parkingList;
    };
  }


  componentDidMount() {
   /* fetch(`https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.photos });
      });*/
    this.httpGet('https://parkimon.ru/api/v1/geolocation/near');
  }

  handleMarkerClick(targetMarker) {
    let history = createHashHistory();
    history.push('/parking-item/' + targetMarker._id);
  }



  render() {
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
}