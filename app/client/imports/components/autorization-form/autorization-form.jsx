import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./autorization-form.scss";
import {findDOMNode} from 'react-dom';


class AutorizationForm extends React.Component {

    constructor(props,context){
        super(props,context);
        this.state = {
            usersMarkers: []
        };
    }

    static contextTypes = {
        ionUpdatePopup: React.PropTypes.func
    };

    registerMobile(theUrl) {
        let client = new XMLHttpRequest();
        client.open("POST", theUrl,true);

        let params = "username="+String(this.refs.phoneInput.value);
        client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        client.send(params);

        client.onload=()=>{
            let userList = JSON.parse(client.responseText);
            this.setState({usersMarkers: userList});
            console.log(this.state.usersMarkers);
        };
    }

    render() {
        let ionUpdatePopup = this.context.ionUpdatePopup;
        let thisObj = this;
        return (
          <IonContent customClasses="" {...this.props}>
            <div className="autorization">
              <div className="first-symbol"> +7 </div>
              <div className="phone-input">
                <input type="text"
                       name="phone"
                       placeholder="(900) 123-45-67"
                       ref="phoneInput"/>
              </div>
              <IonButton
                  color="positive"
                  onClick={() => ionUpdatePopup({
                      popupType: 'confirm',
                      cancelText: 'Нет',
                      okText: 'Да',
                      title: 'Пожалуйста проверьте:',
                      template: <span>Мы отправим код подтверждения на телефон:
                          <p>+7 ({this.refs.phoneInput.value.slice(0,3)}) {this.refs.phoneInput.value.slice(3)}</p>
                      </span>,
                      cancelType: 'button-light',
                      onOk: ()=> {
                          this.registerMobile('https://parkimon.ru/api/v1/user/register-mobile');
                      },
                      onCancel: function() {
                          console.log('Cancelled');
                      }
                  })}>
                Войти
              </IonButton>
            </div>
              <div className="warningAuth">
                  Нашимая войти/зарегистрироваться вы принимаете Условия успользования сервиса
              </div>
          </IonContent>
        );
    }
}

export default AutorizationForm;