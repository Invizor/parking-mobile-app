import React, {Component} from "react";
import {IonContent, IonButton} from "reactionic";
import "./verification-form.scss";
import Repository from "../../storage/local-storage";
import createHashHistory from "history/lib/createHashHistory";
import requestToServer from "../../utils/request-to-server";

class VerificationForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      userToken: "",
      user: {}
    };
  }

  loginUser(theUrl) {
    let code = this.refs.codeInput.value;
    let userNumber = this.props.params.number;
    let params = "username=" + String(userNumber) + "&" + "verification=" + String(code);
    let history = createHashHistory();

    requestToServer("POST", theUrl, (userData) => {
      if (userData.success && userData.token && userData.user) {
        this.setState({userToken: userData.token});
        this.setState({user: userData.user});
        Repository.add_obj("token", this.state.userToken);
        Repository.add_obj("user", this.state.user);

        let ionUpdatePopup = this.context.ionUpdatePopup;
        ionUpdatePopup({
          popupType: "alert",
          okText: "хорошо",
          title: "Успех!",
          template: <span>Вы зарегистрированы</span>,
          okType: "button-light",
        });
        history.push("/container");
      } else {
        let ionUpdatePopup = this.context.ionUpdatePopup;
        ionUpdatePopup({
          popupType: "alert",
          okText: "ввод",
          title: "Ошибка!",
          template: <span>неверный код верификации</span>,
          okType: "button-light",
        });
        this.refs.codeInput.value = "";
      }
    }, false, params);
  }

  onSignInBtnClicked() {
    this.loginUser("https://parkimon.ru/api/v1/user/login");
  }

  render() {
    return (
      <IonContent customClasses="" {...this.props}>
        <div className="verification">
          <div className="verification-code">
            <input type="text"
                   name="code"
                   placeholder="введите здесь sms код"
                   ref="codeInput"
            />
          </div>
          <div className="verification-button">
            <IonButton
              color="positive"
              onClick={() => this.onSignInBtnClicked()}>
              Ввести
            </IonButton>
          </div>
        </div>
      </IonContent>
    );
  }
}

VerificationForm.contextTypes = {
  ionUpdatePopup: React.PropTypes.func
};


export default VerificationForm;