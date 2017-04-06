import React from "react";
import Repository from "../../storage/local-storage";
import ParkingCounter from "../parking-counter/parking-counter";
import AutorizationForm from "../autorization-form/autorization-form";

export default class UnAutorizedUserScreen extends React.Component {

  render() {
    let parkingSession = Repository.get_obj("parkingSession") ? <ParkingCounter/> : "";
    return (
      <div className="autorization-form">
        <AutorizationForm/>
      </div>
    )
  }
}