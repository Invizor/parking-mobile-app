import React from "react";
import LocalStorage from "../../storage/local-storage";

export default class RemainingTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingHours: 0,
      remainingMinutes: 0,
      remainingSeconds: 0
    };
    console.log("props", this.props);
  }

  getMyTime() {
    this.props.getTime();
  }


  componentDidMount() {
    /*let remainingTime = LocalStorage.get_obj("remainingTime");
    this.setState({
      remainingHours: remainingTime.remainingHours,
      remainingMinutes: remainingTime.remainingMinutes,
      remainingSeconds: remainingTime.remainingSeconds
    });*/

    //setInterval(this.props.getTime, 1000);
  }

  render() {
    let remainingTime = LocalStorage.get_obj("remainingTime");
    console.log("props2", this.props);
    let remainingTimeDisplay = remainingTime.remainingHours + " : " + remainingTime.remainingMinutes + " : " + remainingTime.remainingSeconds;
    return (
      <div>
        <h1>! {this.props.remainingTime.remainingHours} : {this.props.remainingTime.remainingMinutes} : {this.props.remainingTime.remainingSeconds} !</h1>
        {

        }

      </div>
    )

  }

}