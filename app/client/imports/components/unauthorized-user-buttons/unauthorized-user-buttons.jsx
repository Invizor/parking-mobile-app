import React, {Component} from 'react';
import {IonButton} from 'reactionic';
import "./unauthorized-user-buttons.scss";

export default class UnautorizedUserButtons extends Component {

  render() {
    return (
      <div>
        <div className="unauthorized-user-buttons">

            <IonButton color="positive"
                       link="/set-balance">
              Быстрая парковка
            </IonButton>

            <IonButton color="positive"
                       link="/autorization-form">
              Войти
            </IonButton>
        </div>
      </div>
    )
  }

}

