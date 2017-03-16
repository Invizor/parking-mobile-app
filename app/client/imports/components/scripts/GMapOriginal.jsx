import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';

class GMapOriginal extends React.Component {

  initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}


  render() {
    return (
      <IonContent>
        <div id="map"></div>
        <script async defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsGFO7IEUdV8xdl6JpkVLnECAvcME2jEg&callback=initMap">
        </script>

      </IonContent>
    );
  }
}

export default GMapOriginal;