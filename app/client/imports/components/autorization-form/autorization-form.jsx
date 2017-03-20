import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./autorization-form.scss";
import {findDOMNode} from 'react-dom';
import Repostitory from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';
import userStorage from '../../storage/user-storage';

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
        let history = createHashHistory();
        let client = new XMLHttpRequest();
        client.open("POST", theUrl, true);

        let params = "number="+String(this.refs.phoneInput.value);
        console.log(this.refs.phoneInput.value);
        client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        client.send(params);

        client.onload=()=>{
            history.push('/verification-form/'+String(this.refs.phoneInput.value));
        };
    }

    enterButton(){
        let history = createHashHistory();
        let user = this.refs.phoneInput.value;
        let obj = Repostitory.get_obj("token");

        if(obj == undefined || obj == null){
            let ionUpdatePopup = this.context.ionUpdatePopup;
            ionUpdatePopup({
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
            })
        } else {
            history.goBack(); // исправить, когда появиться главное окно, после авторизации
        }
    }

    render() {
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
                  onClick={() => this.enterButton()}>
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