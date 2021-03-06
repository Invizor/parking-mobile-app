import React, {PropTypes} from "react";
import {IonContent, IonButton} from "reactionic";
import "./autorization-form.scss";
import LocalStorage from "../../storage/local-storage";
import requestToServer from "../../utils/request-to-server";
import createHashHistory from "history/lib/createHashHistory";
import MaskedInput from 'react-text-mask';

class AutorizationForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      usersMarkers: [],
      flShowInput: true,
      flShowPopup: false
    };
  }

  startRegistration(theUrl, phone) {
    let params = "number=" + String(phone);
    let history = createHashHistory();

    requestToServer("POST", theUrl, ()=>{
      history.push("/verification-form/" + String(phone));
    }, false, params);

  }

  onRegistrationBtnClicked() {
    let history = createHashHistory();
    let token = LocalStorage.get_obj("token");

    let startPhone = this.refs.phoneInput.inputElement.value;
    let endPhone = "";
    for(let i = 0; i < startPhone.length ;i++){
      if(startPhone[i]>='0' && startPhone[i]<='9')endPhone+=startPhone[i];
    }

    if (!token) {
      let ionUpdatePopup = this.context.ionUpdatePopup;
      ionUpdatePopup({
        popupType: "confirm",
        cancelText: "Нет",
        okText: "Да",
        title: "Пожалуйста проверьте:",
        template: <span>Мы отправим код подтверждения на телефон:
                          <p>+7 {this.refs.phoneInput.inputElement.value}</p>
                      </span>,
        cancelType: "button-light",
        onOk: () => {
          this.startRegistration("https://parkimon.ru/api/v1/user/register-mobile",endPhone);
        }
      });
    } else {
      history.goBack(); // исправить, когда появиться главное окно, после авторизации
    }
  }

  onFocusInput(){
    this.setState({flShowInput:false})
  }

  unFocusInput(){
    this.setState({flShowInput:true})
  }

  render() {

    let warning = this.state.flShowInput ?
      <div className="warningAuth">
        Нажимая войти/зарегистрироваться вы принимаете <a href="none.html">Условия использования сервиса</a>
      </div>
      :
      <div>
      </div>;
    return (
      <IonContent customClasses="" {...this.props}>
        <div className="form-autorization">
          <div className="autorization">
            <div className="first-symbol"> +7</div>
            <div className="phone-input">
              <MaskedInput id="phone"
                     type="tel"
                     name="phone"
                     placeholder="(900) 123-4567"
                     ref="phoneInput"
                     mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                     onFocus={() => this.onFocusInput()}
                     onBlur={() => this.unFocusInput()}
              />
            </div>
            <div className="autorization-btn">
              <IonButton
                color="positive"
                onClick={() => this.onRegistrationBtnClicked()}>
                Войти
              </IonButton>
            </div>
          </div>
          {warning}
        </div>
      </IonContent>
    );
  }
}

AutorizationForm.contextTypes = {
  ionUpdatePopup: PropTypes.func
};

export default AutorizationForm;