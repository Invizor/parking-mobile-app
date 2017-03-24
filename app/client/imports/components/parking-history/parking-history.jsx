import React, {Component} from 'react';
import {IonContent, IonList, IonItem} from 'reactionic';
import Repository from '../../storage/local-storage';

export default class ParkingHistory extends Component {


  constructor(props) {
    super(props);
    this.state = {
      parkingHistory: []
    }
  }

  getParkingHistory() {
    let client = new XMLHttpRequest();
    client.open('GET', 'https://parkimon.ru/api/v1/parking/history', true);
    client.setRequestHeader("Authorization", 'Bearer ' + String(Repository.get_obj("token")));
    client.send();
    client.onload = () => {
      let list = JSON.parse(client.responseText);
      this.setState({parkingHistory: list.sessions});
      /*Repository.add_obj("cars", list);
      this.setState({carList: list.userCars});*/
    };
  }

  componentDidMount() {
    this.getParkingHistory();
  }


  render() {
   // console.log("parking history",this.state.parkingHistory);
    let counter = 1;
    let parkingList = [];
    this.state.parkingHistory.map((parking, index)=> {
      parkingList.push(
        <IonItem key={index}>
          <div>{counter++}. Парковка: #{parking.zone.zoneId}</div>
          <div>Дата парковки: {parking.start.substring(0,10)}</div>
          <div>Время парковки: {parking.start.substring(11,16)}</div>
          <div>Номер вашего авто: {parking.transportNumber}</div>
        </IonItem>
      )
    });
    return (
      <IonContent customClasses="" {...this.props}>
        <IonList>
          {
            parkingList
          }
        </IonList>
      </IonContent>
    )
  }
}