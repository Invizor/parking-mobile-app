import React, {PropTypes, Component} from 'react';
import {IonContent, IonButton, IonIcon} from 'reactionic';
import "./add-car-form.scss";
import Repostitory from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';

class addCarsForm extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    addCarToList(theUrl) {
        let history = createHashHistory();
        let client = new XMLHttpRequest();
        client.open("POST", theUrl, true);

        let params = "user=" + String(Repostitory.get_obj("user").id) + '&' + "title=" + String(this.refs.titleCar.value);
        params += '&' + "type=a" + '&' + "regNumber=" + String(this.refs.plateNumber.value);
        console.log('ParamsAddCar=', params);
        client.setRequestHeader("Authorization", 'Bearer ' + String(Repostitory.get_obj("token")));
        client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        client.send(params);

        client.onload = () => {
            let userList = JSON.parse(client.responseText);
            console.log(userList);
            history.goBack();
        };
    }

    render() {
        return (
            <IonContent customClasses="" {...this.props}>

                <div className="car-info">
                    <div className="titleAddCar">
                        Добавьте ваш автомобиль:
                    </div>
                    <div className="title-car">
                        <input type="text"
                               name="title"
                               placeholder="название"
                               ref="titleCar"/>
                    </div>
                    <div className="plate-number">
                        <input
                            type="text"
                            name="plateNumber"
                            placeholder="номер автомобиля"
                            ref="plateNumber"/>
                    </div>
                    <div className="add-car-button">
                        <button className="button button-positive"
                                onClick={() => this.addCarToList('https://parkimon.ru/api/v1/user-car/add')}>
                            Добавить
                        </button>
                    </div>
                </div>

            </IonContent>
        );
    }
}

export default addCarsForm;