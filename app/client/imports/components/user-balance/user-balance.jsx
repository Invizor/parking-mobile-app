import React from "react";
import Repository from "../../storage/local-storage";
import "./user-balance.scss";
import createHashHistory from "history/lib/createHashHistory";
import EventEmitter from "event-emitter";
import emitterStorage from "../../storage/emitter-storage";

class UserBalance extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      userBalance: null
    };
  }

  walletUpdate() {
    const newWallet = Repository.get_obj("user").wallet;
    this.setState({userBalance: newWallet});
  }

  componentWillReceiveProps() {
    this.render();
  }

  componentDidMount() {
    let emitter = new EventEmitter();
    emitter.on("walletUpdate", this.walletUpdate.bind(this));
    emitterStorage.emitter = emitter;
  }

  componentWillUnmount() {
    let emitter = emitterStorage.emitter;
    emitter.off("radiation", this.walletUpdate.bind(this));
    emitterStorage.emitter = null;
  }

  componentWillMount() {
    let userBalance;
    if (Repository.get_obj("user") && Repository.get_obj("user")._id) {
      userBalance = Repository.get_obj("user").wallet ? Repository.get_obj("user").wallet + "" : "0";
    } else {
      userBalance = null;
    }
    this.setState({userBalance: userBalance});
  }

  showBalancePage() {
    if (!this.props.activeBalanceLink) {
      let history = createHashHistory();
      history.push("/set-balance/");
    }
  }

  getClassName() {
    const start = this.props.location;
    console.log("start", start);
    return "user-balance";
  }

  render() {
    let userBalanceClassName = this.props.activeBalanceLink ? "user-balance" : "user-balance  user-balance-underline";
    return (
      <div className={userBalanceClassName}>
        {this.state.userBalance ? <div onClick={() => this.showBalancePage()}>{this.state.userBalance} руб.</div> : ""}
      </div>
    );
  }
}

export default UserBalance;