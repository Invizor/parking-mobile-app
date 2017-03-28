import React, {Component} from 'react';
import {IonContent, IonButton} from 'reactionic';
import './set-balance.scss';
import LocalStorage from '../../storage/local-storage';

export default class SetBalance extends Component {

  balancePaymentByBankCard() {

  }


  render() {
    return (
        <IonContent customClasses="" {...this.props}>
          <div className="set-balance">
            <div className="balance-info">
              Ваш баланс: {LocalStorage.get_obj('user').wallet} руб.
            </div>
            <div className="set-balance-title">Укажите сумму в рублях:</div>
            <div className="set-balance-input">
              <input type="text"
                     name="sum"
                     ref="setBalanceInput"/>
            </div>
            <IonButton
              color="positive"
              onClick={() => this.enterButton()}>
              Со счета мобильного телефона
            </IonButton>
            <IonButton
              color="positive"
              onClick={() => this.balancePaymentByBankCard()}>
              Банковской картой
            </IonButton>
          </div>
        </IonContent>
    )
  }
}

