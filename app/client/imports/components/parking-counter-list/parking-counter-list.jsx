import React from "react";
import {IonList, IonItem} from "reactionic";
import LocalStorage from "../../storage/local-storage";
import ParkingCounter from "../parking-counter/parking-counter";

export default class ParkingCounterList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      remain: []
    };
  }

  /* getParkingHistory() {
   RequestToServer("GET", "https://parkimon.ru/api/v1/parking/history", (responseText)=>{
   console.log("responseParkingHistory", responseText);
   this.setState({parkingHistory: responseText.sessions});
   }, true);
   }*/

  componentDidMount() {
    /*    this.getParkingHistory();*/
  }

  render() {
    //console.log('PARKING LIST', LocalStorage.get_obj("parkingSession"));
    let parkingCounterList;
    if (LocalStorage.get_obj("parkingSession")) {
      let parkingSessionList = LocalStorage.get_obj("parkingSession");
      parkingCounterList = parkingSessionList.map((parkingCounter, index) => {
        return (
          <IonItem key={index}>
            <ParkingCounter number={index}/>
          </IonItem>);
      });
    } else {
      parkingCounterList = "Нет припаркованных автомобилей";
    }


    return (
      <IonList>
        {parkingCounterList}
      </IonList>

    );
  }
}