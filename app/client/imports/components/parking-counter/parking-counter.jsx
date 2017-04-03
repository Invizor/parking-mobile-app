import React from "react";
import LocalStorage from "../../storage/local-storage";
import RemainingTime from "../remaining-time/remaining-time";

export default class ParkingCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: {
        remainingHours: 0,
        remainingMinutes: 0,
        remainingSeconds: 0
      }
    };
  }

  getParkingSession() {
    const parkingSession = LocalStorage.get_obj("parkingSession");
   // console.log("parkingSession", parkingSession);
   // this.setState({parkingSession: parkingSession});
  }


  componentDidMount() {
    this.getParkingSession();
    if(!LocalStorage.get_obj("remainingTime")) {
      LocalStorage.add_obj("remainingTime", this.getRemainingTime());
    }
    //console.log("localStorageRemaining", LocalStorage.get_obj("remainingTime"));
    //setInterval(this.getRemainingTime, 1000);
    //this.getRemainingTime();
  }

  getRemainingTime() {
    let parkingSession = LocalStorage.get_obj("parkingSession");
    let status = (parkingSession && parkingSession.status) ? parkingSession.end.substring(11,19) : "nothing";

    let endParkingTime = new Date("2017-04-03 " + status);
    let now = new Date();
    now.setHours(endParkingTime.getHours()-now.getHours());
    now.setMinutes(endParkingTime.getMinutes()-now.getMinutes());
    now.setSeconds(endParkingTime.getSeconds()-now.getSeconds());

    /*switch(timeType) {
      case "h" :
        return now.getHours();
      case "m" :
        return now.getMinutes();
      case "s" :
        return now.getSeconds();
    }*/



    console.log("now.getHours()", now.getHours());
    console.log("now.getMinutes()", now.getMinutes());
    console.log("now.getSeconds()", now.getSeconds());
    /*this.setState({
      remainingHours : now.getHours(),
      remainingMinutes : now.getMinutes(),
      remainingSeconds : now.getSeconds()
    });*/
    return {
      remainingHours : now.getHours(),
      remainingMinutes : now.getMinutes(),
      remainingSeconds : now.getSeconds()
    };


  }


  render() {
   // console.log("parkingSession2", this.state.parkingSession);
   // console.log("parkingSessionStatus", this.state.parkingSession.status);
    //let endParkingHMS = status.split(":");
    //console.log(endParkingHMS);
   // let realTime = new Date();
  //  let endParkingTime = new Date("2017-04-03 " + status);
   // let remainingTime = endParkingTime;




/*    console.log("realTime", realTime);
    console.log("endParkingTime", endParkingTime);*/
    if(!LocalStorage.get_obj("remainingTime")) {
      LocalStorage.add_obj("remainingTime", this.getRemainingTime());
    }
    //console.log("localStorageRemaining", LocalStorage.get_obj("remainingTime"));
    //let hours = parseInt(this.getRemainingTime("h"));
    console.log("remainingHours", this.state.remainingHours);
    console.log("remainingMinutes", this.state.remainingMinutes);
    console.log("remainingSeconds", this.state.remainingSeconds);
       return (
        <div>

        </div>
    );
  }
}

