import React from "react";
import {IonContent} from "reactionic";
import Repostitory from "../../storage/local-storage";
import createHashHistory from "history/lib/createHashHistory";
import requestToServer from "../../utils/request-to-server";

class EditCar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      carTitleValue: this.getCar().title,
      carRegNumberValue: this.getCar().regNumber
    };
  }

  handleTitleChange(e) {
    this.setState({carTitleValue: e.target.value});
  }

  handleRegNumberChange(e) {
    this.setState({carRegNumberValue: e.target.value});
  }


  getCar() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const carId = this.props.location.pathname.substring(start + 1);
    const carList = Repostitory.get_obj("cars");
    let car = carList.userCars.filter((car) => {
      if (car._id === carId) {
        return true;
      } else {
        return false;
      }

    });
    return car[0];
  }


  editCarBtnClicked(theUrl) {

    let params = "title=" + this.state.carTitleValue + "&regNumber=" + this.state.carRegNumberValue + "&type=a";
    let history = createHashHistory();

    requestToServer("POST", theUrl, () => {
      history.goBack();
    }, true, params);

  }

  render() {
    return (
      <IonContent customClasses="" {...this.props}>
        <div className="car-info">
          <div className="titleAddCar">
            Ваш автомобиль:
          </div>
          <div className="title-car">
            <input type="text"
                   name="title"
                   placeholder="название"
                   ref="titleCar"
                   value={this.state.carTitleValue}
                   onChange={e => this.handleTitleChange(e)}/>
          </div>
          <div className="plate-number">
            <input
              type="text"
              name="plateNumber"
              placeholder="номер автомобиля"
              ref="plateNumber"
              value={this.state.carRegNumberValue}
              onChange={e => this.handleRegNumberChange(e)}/>
          </div>
          <div className="add-car-button">
            <button className="button button-positive"
                    onClick={() => this.editCarBtnClicked("https://parkimon.ru/api/v1/user-car/edit/" + this.getCar()._id)}>
              Добавить
            </button>
          </div>
        </div>

      </IonContent>
    );
  }
}

export default EditCar;