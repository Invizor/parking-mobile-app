import React from 'react';
import { IonContent, IonList, IonItem, IonIcon } from 'reactionic';
import parkingStorage from '../parking-storage/parking-storage';
import ReactDOM from 'react-dom';


let IonItemContainer = React.createClass({
  render: function () {
    <IonItem>hi</IonItem>
  }
});

var ParkingItem = React.createClass({

  getParkingId() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const parkingId = this.props.location.pathname.substring(start + 1);
    return parkingId;
  },


  getCurrentParking() {
    if (!Array.prototype.find) {
      Array.prototype.find = function(predicate) {
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }
    const currentParking = parkingStorage.parkings.find((parking)=> {
      if(parking._id === this.getParkingId()) {
        return parking;
      }
    });

    //console.log('getCurrentParking', currentParking);
    return currentParking;
    /* let parkingInfo = {};
     if(currentParking._id) {
     parkingInfo.id = <IonItem divider>Парковка {currentParking._id}</IonItem>
     }
     if(currentParking.totalPlaces) {
     parkingInfo.totalPlaces = <IonItem divider>Количество мест {parking.totalPlaces}</IonItem>
     }
     if(currentParking.address) {
     parkingInfo.address = <span>Адрес: {parking.address}</span>
     }
     if(currentParking.workingTime[0].open) {
     parkingInfo.workingTime[0].open = <IonItem divider>Время открытия: {parking.workingTime[0].open}:00</IonItem>
     }
     if(currentParking.workingTime[0].close) {
     parkingInfo.workingTime[0].close = <IonItem divider>Время закрытия: {parking.workingTime[0].close}:00 </IonItem>
     }
     if(currentParking.price[0].cost) {
     parkingInfo.price[0].cost = <IonItem divider>Стоимость в час: {parking.price[0].cost} руб.</IonItem>
     }
     if(currentParking.photos.length) {
     parkingInfo.photos = currentParking.photos.map((photo, index)=>{
     return <img src={photo} width="100" height="100" key={index}/>
     })
     }*/

    // console.log('parkingInfo', parkingInfo);
    //return parkingInfo;


  },

  getParkingInfo() {
    const parking = this.getCurrentParking();
    let parkingInfo = [];
    /*if(parking._id) {
     parkingInfo.push({
     component: IonItemContainer,
     props: {divider: true},
     componentHTML: <span>"Парковка" + parking._id</span>
     });
     }*/
    /*
     if(parking.totalPlaces) {
     parkingInfo.totalPlaces = <IonItem divider>Количество мест {parking.totalPlaces}</IonItem>;
     }
     if(parking.address) {
     parkingInfo.push(<IonItem>Адрес: {parking.address}</IonItem>);
     }
     if(parking.workingTime.length) {
     parkingInfo.push(<IonItem divider>Время открытия: {parking.workingTime[0].open}:00</IonItem>);
     }
     if(parking.workingTime.length) {
     parkingInfo.push(<IonItem divider>Время закрытия: {parking.workingTime[0].close}:00 </IonItem>)
     }
     if(parking.price.length) {
     parkingInfo.push(<IonItem divider>Стоимость в час: {parking.price[0].cost} руб.</IonItem>);
     }

     return parkingInfo;*/
  },



  render() {
    const parking = this.getCurrentParking();

    return (
      <IonContent customClasses=""
                  {...this.props}>
        <IonList>
          {
            parking.zoneId ?
              <h1 className="text-center">Парковка: #{parking.zoneId}</h1>
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
              <IonItem>Адрес: {parking.address}</IonItem>
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
          {
            parking.photos.length ?
              <IonItem>
                {
                  parking.photos.map((photo, index)=>{
                    return <img src={photo} width="100" height="100" key={index}/>
                  })
                }
              </IonItem>
              :
              <IonItem>Фотографии отсутствуют</IonItem>
          }
        </IonList>

      </IonContent>
    )
  }
});

export default ParkingItem;



