import React, {Component} from 'react';
import {IonButton} from 'reactionic';
import "./authorized-user-buttons.scss"
import LocalStorage from "../../storage/local-storage";


export default class AutorizedUserButtons extends Component {
  render() {
    return (
      <div>
        <div className="balance-info">
          Ваш баланс: {LocalStorage.get_obj('user').wallet} руб.
        </div>
        <div className="authorized-user-buttons">

          <div className="authorized-user-button">
            <IonButton color="positive"
                       link="/parking-history">
               История парковок
            </IonButton>
          </div>

          <div className="authorized-user-button">
            <IonButton color="positive"
                       link="/list-car">
              Автомобили
            </IonButton>
          </div>
        </div>
      </div>
    )
  }
}