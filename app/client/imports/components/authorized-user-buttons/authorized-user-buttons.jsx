import React, { Component } from 'react';
import { IonButton} from 'reactionic';
import parkingStorage from '../parking-storage/parking-storage';
import ReactDOM from 'react-dom';


export default class AutorizedUserButtons extends Component {

  render() {
    return (
      <div>
        <div className="main-navigation">
          <div className="main-button">
            <IonButton color="positive">
              Личный кабинет
            </IonButton>
          </div>
          <div className="main-button-second">
            <IonButton color="positive"
                       link="/autorization-form">
              История
            </IonButton>
          </div>
        </div>
      </div>
    )
  }

}

