import React, {PropTypes} from "react";
import {IonContent, IonList, IonItem, IonButton} from "reactionic";
import "./car-list.scss";
import LocalStorage from "../../storage/local-storage";
import createHashHistory from "history/lib/createHashHistory";
import requestToServer from "../../utils/request-to-server";

class CarList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      carList: []
    };
  }



  addCar() {
    let history = createHashHistory();
    history.push("/add-car");
  }

  getListCar(theUrl) {
    requestToServer("GET", theUrl, (carsList) => {
      LocalStorage.add_obj("cars", carsList);
      this.setState({carList: carsList.userCars});
    }, true);
  }

  componentDidMount() {
    this.getListCar("https://parkimon.ru/api/v1/user-car");
  }

  deleteCarBtnClicked(index) {
    let carList = this.state.carList;
    let theUrl = "https://parkimon.ru/api/v1/user-car/remove/" + String(carList[index]._id);
    requestToServer("GET", theUrl, (objResult) => {
      if (objResult.success) {
        carList.splice(index, 1);
      }
      this.setState({carList: carList});
    }, true);
  }

  showEditCarPage(carId) {
    let history = createHashHistory();
    history.push("/edit-car/" + carId);
  }

  render() {
    let cars = this.state.carList;
    console.log(cars, "cars");
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
              <img className="img-delete item-button" src="./img/delete.png"
                   onClick={() => this.deleteCarBtnClicked(i)}/>
              <img className="img-edit item-button" src="./img/edit.png"
                   onClick={() => this.showEditCarPage(cars[i]._id)}/>
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
          <div className="add-car-button">
            <IonButton  color="positive" onClick={() => this.addCar()}>
              Добавить автомобиль
            </IonButton>
          </div>
        </div>
      </IonContent>
    );
  }
}

CarList.contextTypes = {
  ionUpdatePopup: PropTypes.func
};

export default CarList;