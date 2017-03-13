import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./autorization-form.scss";
import {findDOMNode} from 'react-dom';


var AutorizationForm = React.createClass({

  contextTypes: {
    ionUpdatePopup: React.PropTypes.func
  },

  getTemplate: function() {

    const phoneInput = findDOMNode(this.refs.phoneInput);
    ionUpdatePopup({
      popupType: 'confirm',
      title: 'Are you sure?',
      //template: <span>Are you <strong>really</strong> sure?</span>,
      template: <span>Ваш номер телефона: <strong>+7 {phoneInput} </strong></span>,
      cancelType: 'button-light',
      onOk: function () {
        console.log('Confirmed');
        console.log(this);
      },
      onCancel: function () {
        console.log('Cancelled');
      }
    });
  },
  render() {
    var ionUpdatePopup = this.context.ionUpdatePopup;
    return (
      <IonContent customClasses=""
                  {...this.props}>
        <h1>This is autorization form!</h1>
        <div className="autorization">
          <div className="first-symbol">
            +7
          </div>
          <div className="phone-input">
            <input type="text"
                   name="phone"
                   placeholder="(900) 123-45-67"
                   ref="phoneInput"/>
          </div>
          <IonButton color="positive">
            Войти
          </IonButton>
          <IonButton color="positive"
                     type="outline"
                     expand="block"

                     onClick={() => ionUpdatePopup({
                       popupType: 'confirm',
                       title: 'Вы уверены?',
                       //template: <span>Are you <strong>really</strong> sure?</span>,
                       template: <span>Вы уверены в правильности Вашего номера телефона?</span>,
                       cancelType: 'button-light',
                       onOk: function () {
                         console.log('Confirmed');
                         console.log(this);
                       },
                       onCancel: function () {
                         console.log('Cancelled');
                       }
                     })}>Show Confirm</IonButton>
        </div>
      </IonContent>
    );
  }
});

export default AutorizationForm;





/*

export default class AutorizationForm extends Component {



  render() {
    var ionUpdatePopup = this.context.ionUpdatePopup;
    return (
      <IonContent customClasses=""
                  {...this.props}>
        <h1>This is autorization form!</h1>
        <div className="autorization">
          <div className="first-symbol">
            +7
          </div>
          <div className="phone-input">
            <input type="text"
                   name="phone"
                   placeholder="(900) 123-45-67"/>
          </div>
          <IonButton color="positive">
            Войти
          </IonButton>
          <IonButton color="dark" type="outline" expand="block"
                     onClick={() => ionUpdatePopup({
                       popupType: 'confirm',
                       title: 'Are you sure?',
                       template: <span>Are you <strong>really</strong> sure?</span>,
                       cancelType: 'button-light',
                       onOk: function() {
                         console.log('Confirmed');
                       },
                       onCancel: function() {
                         console.log('Cancelled');
                       }
                     })}>Show Confirm</IonButton>
        </div>
      </IonContent>
    );
  }


}*/