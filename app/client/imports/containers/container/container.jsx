import React from "react";
import {IonContent} from "reactionic";
import "./container.scss";
import Repository from "../../storage/local-storage";
import emitterStorage from "../../storage/emitter-storage";
import requestToServer from "../../utils/request-to-server";
import AutorizedUserScreen from "../../components/autorized-user-screen/autorized-user-screen";
import UnAutorizedUserScreen from "../../components/unauthorized-user-screen/unauthorized-user-screen";

export default class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  onSuccess(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    this.geoLocation = [position.coords.latitude, position.coords.longitude];
  }

  getGeoLocation() {
    setTimeout(() => {
      this.geoLocation = [
       /* position.coords.latitude,
        position.coords.longitude*/
      ];
    }, 3000);
  }

  // onError Callback receives a PositionError object
  //
  onError(error) {
    alert("code: " + error.code + "\n" +
      "message: " + error.message + "\n");
  }


  onClickChangeCoords() {
    console.log("old coords: ", this.geoLocation);
    this.geoLocation = [45.000000, 38.000000];
    console.log("new coords: ", this.geoLocation);
  }

  getUser(theUrl) {
    requestToServer("GET", theUrl, (userObj) => {
      Repository.add_obj("user", userObj);
    }, true);
  }

  getListCar() {
    requestToServer("GET", "https://parkimon.ru/api/v1/user-car", (carsList) => {
      Repository.add_obj("cars", carsList);
    }, true);
  }

  componentDidMount() {
   /* app.onMouseDown = () => {
      return false;
    };*/
    if (Repository.get_obj("user") == undefined || Repository.get_obj("user").success == false) {
      this.getUser("https://parkimon.ru/api/v1/user");
    }
    if (Repository.get_obj("user") && Repository.get_obj("user")._id) {
      this.getListCar();
      let emitTek = emitterStorage.emitter;
      if (emitTek != null && emitTek != undefined) {
        if (Repository.get_obj("user")._id) emitTek.emit("radiation", true);
        else if (Repository.get_obj("user")._id) emitTek.emit("radiation", false);
      }
    }
    //cordova.plugins.Keyboard.disableScroll(true);
    // cordova.plugins.Keyboard.show();
  }

  render() {
    let showScreen = Repository.get_obj("token") ? <AutorizedUserScreen/>   : <UnAutorizedUserScreen/>;

    return (
      <IonContent customClasses=""
                  {...this.props}>

        <div className="content-container">
          {
            showScreen
          }
        </div>
      </IonContent>
    );
  }
}