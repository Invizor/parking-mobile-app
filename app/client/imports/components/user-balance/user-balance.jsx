import React from "react";
import Repository from "../../storage/local-storage";
import "./user-balance.scss";
import createHashHistory from "history/lib/createHashHistory";
var EventEmitter = require('event-emitter');
import emitterStorage from '../../storage/emitter-storage';

class UserBalance extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      userBalance: null,
      userBalanceClassName: "user-balance user-balance-underline"
    };
  }

  walletUpdate(flag) {
    const newWallet = Repository.get_obj("user").wallet;
    this.setState({userBalance: newWallet});
  }

  componentWillReceiveProps() {
    this.render();
  }

  componentDidMount() {
    let emitter = new EventEmitter();
    emitter.on('walletUpdate', () => {
      this.walletUpdate()
    });
    emitterStorage.emitter = emitter;

  }

  componentWillUnmount() {
    /*  let emitter = emitterStorage.emitter;
     emitter.off('walletUpdate', false);
     emitterStorage.emitter = null;*/
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
    let history = createHashHistory();
    history.push("/set-balance/");
  }

  getClassName() {
    const start = this.props.location;
    console.log("start", start);
    return "user-balance";
  }

  render() {
    return (
      <div className={this.props.userBalanceClassName}>
        {this.state.userBalance ? <div onClick={() => this.showBalancePage()}>{this.state.userBalance} руб.</div> : ""}
      </div>
    );
  }
}

export default UserBalance;