import React from "react";
import {IonContent, IonButton} from "reactionic";
import "./set-balance.scss";
import LocalStorage from "../../storage/local-storage";
import RequestToServer from "../../utils/request-to-server";

export default class SetBalance extends React.Component {

  balancePaymentByBankCard() {

  }

  balancePaymentByPhone() {
    let user = LocalStorage.get_obj("user");
    RequestToServer("GET", "https://parkimon.ru/api/v1/payment/balance/phone/1", (answer)=>{
      console.log("answer", answer);
    });
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

