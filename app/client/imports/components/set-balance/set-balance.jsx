import React from "react";
import {IonContent, IonButton} from "reactionic";
import "./set-balance.scss";
import LocalStorage from "../../storage/local-storage";
import RequestToServer from "../../utils/request-to-server";
import {findDOMNode} from "react-dom";
import emitterStorage from '../../storage/emitter-storage';

export default class SetBalance extends React.Component {

  balancePaymentByBankCard() {

  }

  balancePaymentByPhone() {
    const amount = findDOMNode(this.refs.setBalanceInput);
    let user = LocalStorage.get_obj("user");
    RequestToServer("GET", "https://parkimon.ru/api/v1/payment/balance/phone/" + amount.value, (answer)=>{
      console.log("answer", answer);
      let user = LocalStorage.get_obj("user");
      user.wallet += parseInt(amount.value);
      LocalStorage.change_obj("user", user);
      amount.value = "";

      let emitTek = emitterStorage.emitter;
      if (emitTek) {
        if (LocalStorage.get_obj("user")._id) {
          emitTek.emit("walletUpdate", true);
        }
      }
    });
  }

  componentDidMount() {
    let emitTek = emitterStorage.emitter;
    emitTek.emit("hideLink", true);
  }

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
}

