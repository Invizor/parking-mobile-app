import React from 'react';
import { IonContent, IonList, IonItem, IonIcon } from 'reactionic';

var ParkingItem = React.createClass({

  getParkingId() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const parkingId = parseInt(this.props.location.pathname.substring(start + 1), 10);
    return parkingId;
  },



  render() {
    return (
      <IonContent customClasses=""
                  {...this.props}>
        <IonList>
          <IonItem divider>Парковка #{this.getParkingId()}</IonItem>
          <IonItem divider>Время работы: 10:00 - 19:00</IonItem>
          <IonItem divider>Стоимость в час: 60 руб.</IonItem>
        </IonList>

      </IonContent>
    )
  }
});

export default ParkingItem;