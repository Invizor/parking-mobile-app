import React, { Component } from 'react';
import { IonButton} from 'reactionic';
import parkingStorage from '../parking-storage/parking-storage';
import ReactDOM from 'react-dom';


export default class UnautorizedUserButtons extends Component {

  render() {
    return (
      <div>
        <div className="main-navigation">
          <div className="main-button">
            <IonButton color="positive">
              Быстрая парковка
            </IonButton>
          </div>
          <div className="main-button-second">
            <IonButton color="positive"
                       link="/autorization-form">
              Войти!
            </IonButton>
          </div>
        </div>
      </div>
    )
  }

}

