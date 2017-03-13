import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./autorization-form.scss";


export default class AutorizationForm extends Component {

  render() {
    return (
      <IonContent customClasses=""
                  {...this.props}>
        <h1>This is autorization form!</h1>
        <div className="autorization">
          <input type="text"
                 name="phone"
                 placeholder="+7 (900) 123-45-67"/>
          <IonButton color="positive">
            Войти
          </IonButton>
        </div>
      </IonContent>
    );
  }


}