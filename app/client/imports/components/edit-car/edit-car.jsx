import React from "react";
import {IonContent} from "reactionic";
import Repostitory from "../../storage/local-storage";
import createHashHistory from "history/lib/createHashHistory";
import requestToServer from "../../utils/request-to-server";
import isNumberCar from "../../utils/is-number-car";

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

  //валидация введенной информации об автомобиле
  validationInputs(){
    let title = this.refs.titleCar.value;
    let carNumber = this.refs.plateNumber.value.toUpperCase();
    if(title.length > 20){
      let ionUpdatePopup = this.context.ionUpdatePopup;
      ionUpdatePopup({
        popupType: "alert",
        okText: "ввод",
        title: "Ошибка!",
        template: <span>Название автомобиля должно быть не длиннее 20 символов!</span>,
        okType: "button-light",
      });
      return false;
    } else
    if(!isNumberCar(carNumber)){
      let ionUpdatePopup = this.context.ionUpdatePopup;
      ionUpdatePopup({
        popupType: "alert",
        okText: "ввод",
        title: "Ошибка!",
        template: <span>Введите номер в формате: А123БВ45 или А123БВ456</span>,
        okType: "button-light",
      });
      return false;
    } else {
      return true;
    }
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

    if(this.validationInputs()) {
      let params = "title=" + this.state.carTitleValue + "&regNumber=" + this.state.carRegNumberValue.toUpperCase() + "&type=a";
      let history = createHashHistory();

      requestToServer("POST", theUrl, () => {
        history.goBack();
      }, true, params);
    }
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
              Изменить
            </button>
          </div>
        </div>

      </IonContent>
    );
  }
}

EditCar.contextTypes = {
  ionUpdatePopup: React.PropTypes.func
};

export default EditCar;