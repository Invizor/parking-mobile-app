import React, {Component} from 'react';
import {IonButton} from 'reactionic';


export default class AutorizedUserButtons extends Component {
  render() {
    return (
      <div>
        <div className="authorized-user-buttons">
          <div>
            <IonButton color="positive"
                       link="/set-balance">
              Личный кабинет
            </IonButton>
          </div>

          <div>
            <IonButton color="positive"
                       link="/autorization-form">
              История
            </IonButton>
          </div>

          <div>
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