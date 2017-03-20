import React, {PropTypes, Component} from 'react';
import { IonContent, IonButton, IonIcon } from 'reactionic';
import "./car-form.scss";
import {findDOMNode} from 'react-dom';
import Repository from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';
import userStorage from '../../storage/user-storage';

class CarForm extends React.Component {

    constructor(props,context){
        super(props,context);
        this.state = {
            carList: []
        };
    }

    static contextTypes = {
        ionUpdatePopup: React.PropTypes.func
    };

    addCar(){
        let history = createHashHistory();
        history.push('/add-car');
    }

    getListCar(theUrl){
        let client = new XMLHttpRequest();
        client.open('GET', theUrl, true);
        client.setRequestHeader("Authorization", 'Bearer '+String(Repository.get_obj("token")));
        client.send();
        client.onload=()=>{
            let list = JSON.parse(client.responseText);
            Repository.add_obj("cars",list);
            this.setState({ carList : list.userCars });
        };
    }

    componentDidMount(){
        this.getListCar('https://parkimon.ru/api/v1/user-car');
    }

    render() {
        let cars = this.state.carList;
        let myCars = [];
        for(let i = 0 ; i<cars.length; i++){
            myCars.push(<IonButton  color="positive">
                <span>{cars[i].title + ' ' +cars[i].regNumber}</span>
                </IonButton>);
        }
        return (
            <IonContent customClasses="" {...this.props}>

                <div className="list-cars">
                    <div className="titleListCar" >
                        Ваши транспортные средства:
                    </div>
                    {myCars}
                    <div className="button-add-car">
                        <img className="addCarButton" src='./img/addCar.png' onClick={() => this.addCar()}/>
                    </div>
                </div>
            </IonContent>
        );
    }
}

export default CarForm;