import React, {PropTypes, Component} from 'react';
import {IonContent, IonButton} from 'reactionic';
import "./container.scss"
import shouldPureComponentUpdate from 'react-pure-render/function';
import Map from '../../components/map/map';
import UnautorizedUserButtons from '../../components/unauthorized-user-buttons/unauthorized-user-buttons';
import AutorizedUserButtons from '../../components/authorized-user-buttons/authorized-user-buttons';
import Repository from '../../storage/local-storage';
import userStorage from '../../storage/user-storage';
Object.assign = require('object-assign');

export default class Container extends Component {



  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  onSuccess(position) {
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
    this.geoLocation = [position.coords.latitude, position.coords.longitude];
  }

  getGeoLocation() {
    setTimeout(() => {
      this.geoLocation = [
        position.coords.latitude,
        position.coords.longitude
      ]
    }, 3000)
  }

  // onError Callback receives a PositionError object
  //
  onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }


  onClickChangeCoords(e) {
    console.log("old coords: ", this.geoLocation);
    this.geoLocation = [45.000000, 38.000000];
    console.log("new coords: ", this.geoLocation);
  }

  getUser(theUrl) {
    let client = new XMLHttpRequest();
    client.open('GET', theUrl, true);
    client.setRequestHeader("Authorization", 'Bearer ' + String(Repository.get_obj("token")));
    client.send();
    client.onload = () => {
      let userList = JSON.parse(client.responseText);
      userStorage.user = userList;
      Repository.add_obj("user", userList);
    };
  }

  componentDidMount() {
    if (Repository.get_obj('user') == undefined || Repository.get_obj('user').success == false)
      this.getUser('https://parkimon.ru/api/v1/user');
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