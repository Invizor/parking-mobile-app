import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton } from 'reactionic';
import "./verification-form.scss";
import {findDOMNode} from 'react-dom';
import Repostitory from '../Repository/Repository';
import createHashHistory from 'history/lib/createHashHistory';


class VerificationForm extends React.Component {

    constructor(props,context){
        super(props,context);
        this.state = {
            userToken : '',
            userName : ''
        };
    }
    static contextTypes = {
        ionUpdatePopup: React.PropTypes.func
    };

    loginUser(theUrl) {
        let client = new XMLHttpRequest();
        client.open("POST", theUrl, true);
        let code = this.refs.codeInput.value;
        let userNumber = this.props.params.number;

        let params = "username="+String(userNumber)+"&"+"verification="+String(code);
        client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        client.send(params);

        client.onload=()=>{
            let history = createHashHistory();
            let userData = JSON.parse(client.responseText);
            console.log("userData",userData);
            this.setState({userToken: userData.token});
            this.setState({userName: userData.user.username});

            console.log('userToken=',this.state.userToken);
            if(this.state.userToken != '' && this.state.userToken != undefined){
                Repostitory.add_obj("token",this.state.userToken);
                Repostitory.add_obj("user",this.state.userName);

                let ionUpdatePopup = this.context.ionUpdatePopup;
                ionUpdatePopup({
                    popupType: 'alert',
                    okText: 'хорошо',
                    title: 'Успех!',
                    template: <span>Вы зарегистрированы</span>,
                    okType: 'button-light',
                    onOk: ()=> {
                        console.log('REGISTER!');
                    },
                });
            }
            history.push('/map');
        };
    }

    enterButton(){
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
                        onClick={() => this.enterButton()}>
                        Ввести
                    </IonButton>
                </div>
            </IonContent>
        );
    }
}

export default VerificationForm;