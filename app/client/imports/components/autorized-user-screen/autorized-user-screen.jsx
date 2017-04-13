import React from "react";
import Repository from "../../storage/local-storage";
import ParkingCounter from "../parking-counter/parking-counter";
import Map from "../map/map";
import "./authorized-user-screen.scss";
import createHashHistory from "history/lib/createHashHistory";

export default class AutorizedUserScreen extends React.Component {

  componentDidMount() {
    /*let emitTek = emitterStorage.emitter;
     emitTek.emit("showLink", false);*/
  }

  showParkingCounter() {
    let history = createHashHistory();
    history.push("/parking-counter-list");
  }

  render() {
    //console.log('Repository.get_obj("parkingSession")', Repository.get_obj("parkingSession"));
    let parkingSession;
    if (Repository.get_obj("parkingSession")) {
      if (Repository.get_obj("parkingSession").length < 2) {
        parkingSession = (
          <div className="single-parking">
            <ParkingCounter number={0} singleParking={true}/>
          </div>
        );
      } else {
        parkingSession = (
          <div className="parking-cars">
            <span className="parking-class-number" onClick={this.showParkingCounter}>
              Припарковано автомобилей: {Repository.get_obj("parkingSession").length}
            </span>
          </div>
        );
      }
    } else {
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
    );
  }
}