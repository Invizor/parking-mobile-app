import React from "react";
import {IonContent, IonList, IonItem} from "reactionic";
import RequestToServer from "../../utils/request-to-server";

export default class ParkingHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parkingHistory: []
    };
  }

  getParkingHistory() {
    RequestToServer("GET", "https://parkimon.ru/api/v1/parking/history", (responseText)=>{
      console.log("responseParkingHistory", responseText);
      this.setState({parkingHistory: responseText.sessions});
    }, true);
  }

  componentDidMount() {
    this.getParkingHistory();
  }

  render() {
    console.log("parking history",this.state.parkingHistory);
    let counter = 1;
    let parkingList = [];
    this.state.parkingHistory.map((parking, index)=> {
      console.log("parking.created",parking.created);
      console.log("parking.start",parking.start);
      parkingList.push(
        <IonItem key={index}>
          <div>{counter++}. Парковка: #{parking.zone.zoneId}</div>
          <div>Дата парковки: {parking.created.substring(0,10)}</div>
          <div>Время парковки: {parking.created.substring(11,16)}</div>
          <div>Номер вашего авто: {parking.transportNumber}</div>
        </IonItem>
      );
    });
    return (
      <IonContent customClasses="" {...this.props}>
        <IonList>
          {
            parkingList
          }
        </IonList>
      </IonContent>
    );
  }
}