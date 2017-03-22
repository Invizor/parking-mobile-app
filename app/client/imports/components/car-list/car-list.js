import React, {PropTypes, Component} from 'react';
import {IonContent, IonButton, IonIcon, IonList, IonItem} from 'reactionic';
import "./car-list.scss";
import {findDOMNode} from 'react-dom';
import Repository from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';
import userStorage from '../../storage/user-storage';

class CarList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      carList: []
    };
  }

  static contextTypes = {
    ionUpdatePopup: React.PropTypes.func
  };

  addCar() {
    let history = createHashHistory();
    history.push('/add-car');
  }

  getListCar(theUrl) {
    let client = new XMLHttpRequest();
    client.open('GET', theUrl, true);
    client.setRequestHeader("Authorization", 'Bearer ' + String(Repository.get_obj("token")));
    client.send();
    client.onload = () => {
      let list = JSON.parse(client.responseText);
      console.log("list", list);
      Repository.add_obj("cars", list);
      this.setState({carList: list.userCars});
    };
  }

  componentDidMount() {
    this.getListCar('https://parkimon.ru/api/v1/user-car');
  }

  deleteCarBtnClicked(carIndex) {
    let url = "https://parkimon.ru/api/v1/user-car/remove/" + carIndex;
    console.log("url", url);

    let client = new XMLHttpRequest();
    client.open("GET", url, true);
    client.setRequestHeader("Authorization", 'Bearer ' + String(Repository.get_obj("token")));
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.send();

    client.onload = () => {
      let userList = JSON.parse(client.responseText);
      console.log(userList);
    };

  }

  showEditCarPage(carId) {
    console.log('carId', carId);
    let history = createHashHistory();
    history.push('/edit-car/' + carId);
  }

  render() {
    let cars = this.state.carList;
    let myCars = [];
    for (let i = 0; i < cars.length; i++) {
      myCars.push(
          <IonItem key={i}>
            <h2>{cars[i].title}</h2>
            <p>{cars[i].regNumber}</p>
            <img className="img-delete" src="./img/delete.png" onClick={()=>this.deleteCarBtnClicked(cars[i]._id)} />
            <img className="img-edit" src="./img/edit.png" onClick={()=>this.showEditCarPage(cars[i]._id)}/>
          </IonItem>
      );
    }
    return (
      <IonContent customClasses="" {...this.props}>

        <div className="list-cars">
          <div className="titleListCar">
            Ваши транспортные средства:
          </div>
          <IonList className="content-list-cars">
            {myCars}
          </IonList>
          <div className="button-add-car">
            <img className="addCarButton" src='./img/addCar.png' onClick={() => this.addCar()}/>
          </div>
        </div>
      </IonContent>
    );
  }
}

export default CarList;