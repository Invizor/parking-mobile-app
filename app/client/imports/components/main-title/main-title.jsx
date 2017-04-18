import React from "react";
import {IonSpinner} from "reactionic";
import "./main-title.scss";
import EventEmitterMixin from "react-event-emitter-mixin";
import LocalStorage from "../../storage/local-storage";


let MainTitle = React.createClass({

  mixins: [EventEmitterMixin],

  getInitialState: function() {
    return {
      showSpinner: true
    }
  },

 /* componentDidMount() {
    setTimeout(()=>{
      if (this.props.title === "Parkimon") {
        this.setState({showSpinner: false});
      }
    }, 3000);
  }*/

  componentWillMount(){
    this.eventEmitter('on','parkingsLoaded',()=>{
      this.setState({showSpinner: false});
    });
  },

  componentDidMount() {
    if (LocalStorage.get_obj("paidParkingList") && LocalStorage.get_obj("paidParkingList").length) {
      this.setState({showSpinner: false});
    }
  },

  render() {
    return (
      <div className="main-title">
        {this.props.title}
        {
          LocalStorage.get_obj("token") && this.props.title === "Parkimon" && this.state.showSpinner ?
          <span className="mySpinner"><IonSpinner icon="spiral"/></span>
          :
          ""
        }
      </div>
    );
  }
});

export default MainTitle;