import React from "react";
import {IonContent} from "reactionic";
import "./add-car-form.scss";
import Repostitory from "../../storage/local-storage";
import createHashHistory from "history/lib/createHashHistory";
import requestToServer from "../../utils/request-to-server";
import isNumberCar from "../../utils/is-number-car";

class addCarsForm extends React.Component {

  constructor(props, context) {
    super(props, context);
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

  addCarToList(theUrl) {

    if(this.validationInputs()) {
      let params = "user=" + String(Repostitory.get_obj("user").id) + "&" + "title=" + String(this.refs.titleCar.value);
      params += "&" + "type=a" + "&" + "regNumber=" + String(this.refs.plateNumber.value.toUpperCase());
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
                    onClick={() => this.addCarToList("https://parkimon.ru/api/v1/user-car/add")}>
              Добавить
            </button>
          </div>
        </div>

      </IonContent>
    );
  }
}


addCarsForm.contextTypes = {
  ionUpdatePopup: React.PropTypes.func
};

export default addCarsForm;