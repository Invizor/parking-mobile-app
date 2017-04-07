import React from "react";
import {IonList, IonItem, IonButton, IonContent} from "reactionic";
import Repository from "../../storage/local-storage";
import "./parking-item.scss";
import createHashHistory from "history/lib/createHashHistory";

let ParkingItem = React.createClass({

  getParkingId() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const parkingId = this.props.location.pathname.substring(start + 1);
    return parkingId;
  },


  getCurrentParking() {
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
    const currentParking = Repository.get_obj("paidParkingList").find((parking) => {
      if (parking._id === this.getParkingId()) {
        return parking;
      }
    });

    console.log("getCurrentParking", currentParking);
    return currentParking;


  },

  getParkingInfo() {
   // const parking = this.getCurrentParking();
   // let parkingInfo = [];
  },

  getPayParkingLink() {
    let history = createHashHistory();
    history.push("/confirm-pay-parking/" + this.getParkingId());
  },


  render() {
    const parking = this.getCurrentParking();

    return (
      <IonContent customClasses="" {...this.props}>
        <div className="parking-item">
          <IonList>
            {
              parking.zoneId ?
                <h1 className="parking-title text-center">#{parking.zoneId}</h1>
                :
                <IonItem divider>Информация неизвестна</IonItem>
            }
            {
              parking.totalPlaces ?
                <IonItem divider>Всего мест: {parking.totalPlaces}</IonItem>
                :
                <IonItem divider>Количество мест неизвестно</IonItem>
            }
            {
              parking.address ?
                <div className="address">Адрес: {parking.address}</div>
                :
                <IonItem>Адрес неизвестен</IonItem>
            }
            {
              parking.workingTime.length ?
                <IonItem>Время открытия: {parking.workingTime[0].open}:00 ч</IonItem>
                :
                <IonItem>Время открытия неизвестно</IonItem>
            }
            {
              parking.workingTime.length ?
                <IonItem>Время закрытия: {parking.workingTime[0].close}:00 ч </IonItem>
                :
                <IonItem>Время закрытия неизвестно</IonItem>
            }
            {
              parking.price.length ?
                <IonItem>Цена: {parking.price[0].cost}</IonItem>
                :
                <IonItem>Цена неизвестна</IonItem>
            }
          </IonList>
          <div className="pay-parking">
            <IonButton color="positive"
                       onClick={() => this.getPayParkingLink()}>
              Оплатить парковку
            </IonButton>
          </div>
        </div>
      </IonContent>
    );
  }
});

export default ParkingItem;



