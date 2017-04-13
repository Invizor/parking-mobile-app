import React from "react";
import {IonContent, IonButton} from "reactionic";
import "./set-balance.scss";
import LocalStorage from "../../storage/local-storage";
import RequestToServer from "../../utils/request-to-server";
import {findDOMNode} from "react-dom";
import EventEmitterMixin from "react-event-emitter-mixin";

let SetBalance = React.createClass({

  mixins:[EventEmitterMixin],

  getInitialState: function() {
    return {
      wallet: 0
    };
  },

  balancePaymentByBankCard() {

  },


  balancePaymentByPhone() {
    const amount = findDOMNode(this.refs.setBalanceInput);
    RequestToServer("GET", "https://parkimon.ru/api/v1/payment/balance/phone/" + amount.value, (answer)=>{
      console.log("answer", answer);
      let user = LocalStorage.get_obj("user");
      user.wallet += parseInt(amount.value);
      LocalStorage.change_obj("user", user);
      amount.value = "";
      this.eventEmitter("emit","updateWallet");

    });
  },

  componentWillMount() {

  },

  componentDidMount() {
    this.eventEmitter("emit","openBalancePage");
  },

  componentWillUnmount() {
    this.eventEmitter("emit","closeBalancePage");
  },

  render() {
    return (
        <IonContent customClasses="" {...this.props}>
          <div className="set-balance">
            <div className="balance-info">
              Ваш баланс: {LocalStorage.get_obj("user").wallet} руб.
            </div>
            <div className="set-balance-title">Укажите сумму в рублях:</div>
            <div className="set-balance-input">
              <input type="text"
                     name="sum"
                     ref="setBalanceInput"/>
            </div>
            <IonButton
              color="positive"
              onClick={() => this.balancePaymentByPhone()}>
              Со счета мобильного телефона
            </IonButton>
            <IonButton
              color="positive"
              onClick={() => this.balancePaymentByBankCard()}>
              Банковской картой
            </IonButton>
          </div>
        </IonContent>
    );
  }
});

export default SetBalance;

