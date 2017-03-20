import React, { Component } from 'react';
import { IonButton} from 'reactionic';



export default class AutorizedUserButtons extends Component {

  render() {
    return (
      <div>
        <div className="main-navigation">
          <div className="main-button">
            <IonButton color="positive"
                       link="/set-balance">
              Личный кабинет
            </IonButton>
          </div>
          <div className="main-button-second">
            <IonButton color="positive"
                       link="/autorization-form">
              История
            </IonButton>
          </div>
          <div className="main-button-third">
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

