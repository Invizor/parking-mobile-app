import React from "react";
import Repository from "../../storage/local-storage";
import ParkingCounter from "../parking-counter/parking-counter";
import Map from "../map/map";

export default class AutorizedUserScreen extends React.Component {

  render() {
    //console.log('Repository.get_obj("parkingSession")', Repository.get_obj("parkingSession"));
    let parkingSession;
    console.log('Repository.get_obj("parkingSession") in main', Repository.get_obj("parkingSession"));
    if (Repository.get_obj("parkingSession")) {
      parkingSession = (
        <div className="single-parking">
          <ParkingCounter number={0} singleParking={true} />
        </div>
      );
    } /*else if (Repository.get_obj("parkingSession")) {
     parkingSession = "Припарковано более одного автомобиля";
     }*/ else {
      parkingSession = "Припаркованных авто нет";
    }

    // console.log("parkingSessionObject", parkingSession);

    let mapContainerClassName = Repository.get_obj("parkingSession") ? "map-container min-height" : "map-container full-height";

    return (
      <div>
        <div className={mapContainerClassName}>
          <Map/>
        </div>
        {
          parkingSession
        }
      </div>
    )
  }
}