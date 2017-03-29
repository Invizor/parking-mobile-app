import React, {PropTypes, Component} from 'react';
import {IonContent, IonButton, IonNavBar} from 'reactionic';
import "./verification-form.scss";
import {findDOMNode} from 'react-dom';
import Repository from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';
import requestToServer from '../../utils/request-to-server';


class VerificationForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      userToken: '',
      user: {}
    };
  }

  static contextTypes = {
    ionUpdatePopup: React.PropTypes.func
  };

  loginUser(theUrl) {
      let code = this.refs.codeInput.value;
      let userNumber = this.props.params.number;
      let params = "username=" + String(userNumber) + "&" + "verification=" + String(code);
      let history = createHashHistory();

      requestToServer("POST", theUrl, (userData)=>{
          this.setState({userToken: userData.token});
          this.setState({user: userData.user});

          if (this.state.userToken != '' && this.state.userToken != undefined) {
              Repository.add_obj("token", this.state.userToken);
              Repository.add_obj("user", this.state.user);

              let ionUpdatePopup = this.context.ionUpdatePopup;
              ionUpdatePopup({
                  popupType: 'alert',
                  okText: 'хорошо',
                  title: 'Успех!',
                  template: <span>Вы зарегистрированы</span>,
                  okType: 'button-light',
                  onOk: () => {
                      console.log('REGISTER!');
                  },
              });
          }
          history.push('/container');
      }, false, params);
  }

  onSignInBtnClicked() {
    this.loginUser('https://parkimon.ru/api/v1/user/login');
  }

  render() {
    return (
      <IonContent customClasses="" {...this.props}>
        <div className="verification">
          <div className="verification-title">Введите sms код:</div>
          <div className="verification-code">
            <input type="text"
                   name="code"
                   placeholder="введите здесь код"
                   ref="codeInput"/>
          </div>
          <IonButton
            color="positive"
            onClick={() => this.onSignInBtnClicked()}>
            Ввести
          </IonButton>
        </div>
      </IonContent>
    );
  }
}

export default VerificationForm;