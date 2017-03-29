import React, {PropTypes, Component} from 'react';
import {IonContent, IonButton, IonIcon, IonList, IonItem} from 'reactionic';
import "./car-list.scss";
import {findDOMNode} from 'react-dom';
import Repository from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';
import requestToServer from '../../utils/request-to-server';
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
      requestToServer("GET", theUrl, (carsList)=>{
          Repository.add_obj("cars", carsList);
          this.setState({carList: carsList.userCars});
      }, true);
  }

  componentDidMount() {
    this.getListCar('https://parkimon.ru/api/v1/user-car');
  }

  deleteCarBtnClicked(index) {

      let masCars = this.state.carList;
       let theUrl = "https://parkimon.ru/api/v1/user-car/remove/"+String(masCars[index]._id);  
      requestToServer("GET", theUrl, (objResult)=>{ 
          if (objResult.success) { 
              masCars.splice(index, 1); 
          } 
          this.setState({carList: masCars}); 
      }, true);
  }

  showEditCarPage(carId) {
    let history = createHashHistory();
    history.push('/edit-car/' + carId);
  }

  render() {
    let cars = this.state.carList;
    let myCars = [];
    for (let i = 0; i < cars.length; i++) {
      myCars.push(
          <IonItem key={i}>
              <div className="car-item-container">
                  <div className="item-info">
                      <h2>{cars[i].title}</h2>
                      <p>{cars[i].regNumber}</p>
                  </div>
                  <div className="item-buttons">
                      <img className="img-delete item-button" src="./img/delete.png" onClick={()=>this.deleteCarBtnClicked(i)}/>
                      <img className="img-edit item-button" src="./img/edit.png" onClick={()=>this.showEditCarPage(cars[i]._id)}/>
                  </div>
              </div>
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