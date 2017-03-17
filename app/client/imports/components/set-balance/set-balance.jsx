import React, { Component } from 'react';
import { IonContent, IonButton } from 'reactionic';
import './set-balance.scss';



export default class SetBalance extends Component {




  render() {
    return (
      <div>
        <IonContent customClasses="" {...this.props}>
          <div className="set-balance">
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
              onClick={() => this.enterButton()}>
              Банковской картой
            </IonButton>
          </div>
        </IonContent>
      </div>
    )
  }
}

