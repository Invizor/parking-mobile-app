import React, {PropTypes, Component} from "react";
import {IonContent, IonButton,} from "reactionic";
import "./autorization-form.scss";
import LocalStorage from '../../storage/local-storage';
import requestToServer from '../../utils/request-to-server';
import createHashHistory from 'history/lib/createHashHistory';

class AutorizationForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      usersMarkers: []
    };
  }

  static contextTypes = {
    ionUpdatePopup: PropTypes.func
  };

  startRegistration(theUrl) {
    let params = "number=" + String(this.refs.phoneInput.value);
    let history = createHashHistory();

    requestToServer("POST", theUrl, (resultRequest)=>{
      history.push("/verification-form/" + String(this.refs.phoneInput.value));
    }, false, params);

  }

  onRegistrationBtnClicked() {
    let history = createHashHistory();
    let user = this.refs.phoneInput.value;
    let token = LocalStorage.get_obj("token");

    if (!token) {
      let ionUpdatePopup = this.context.ionUpdatePopup;
      ionUpdatePopup({
        popupType: "confirm",
        cancelText: "Нет",
        okText: "Да",
        title: "Пожалуйста проверьте:",
        template: <span>Мы отправим код подтверждения на телефон:
                          <p>+7 ({this.refs.phoneInput.value.slice(0, 3)}) {this.refs.phoneInput.value.slice(3)}</p>
                      </span>,
        cancelType: "button-light",
        onOk: () => {
          this.startRegistration("https://parkimon.ru/api/v1/user/register-mobile");
        },
        onCancel: function () {
          console.log("Cancelled");
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
          <div className="first-symbol"> +7</div>
          <div className="phone-input">
            <input type="text"
                   name="phone"
                   placeholder="(900) 123-45-67"
                   ref="phoneInput"/>
          </div>
          <div className="autorization-btn">
            <IonButton
              color="positive"
              onClick={() => this.onRegistrationBtnClicked()}>
              Войти
            </IonButton>
          </div>
        </div>
        <div className="warningAuth">
          Нажимая войти/зарегистрироваться вы принимаете <a href="none.html">Условия использования сервиса</a>
        </div>
      </IonContent>
    );
  }
}

export default AutorizationForm;