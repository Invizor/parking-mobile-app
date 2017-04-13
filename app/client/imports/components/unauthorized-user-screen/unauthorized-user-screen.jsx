import React from "react";
import AutorizationForm from "../authorization-form/autorization-form";

export default class UnAutorizedUserScreen extends React.Component {

  render() {
    return (
      <div className="autorization-form">
        <AutorizationForm/>
      </div>
    );
  }
}