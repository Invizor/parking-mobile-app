import React, {Component} from 'react';
import {IonButton} from 'reactionic';
import "./unauthorized-user-buttons.scss";

export default class UnautorizedUserButtons extends Component {

  render() {
    return (
      <div>
        <div className="unauthorized-user-buttons">

          <div className="unauthorized-user-button">
            <IonButton color="positive"
                       link="/set-balance">
              Быстрая парковка
            </IonButton>
          </div>

          <div className="unauthorized-user-button">
            <IonButton color="positive"
                       link="/autorization-form">
              Войти
            </IonButton>
          </div>
        </div>
      </div>
    )
  }

}

