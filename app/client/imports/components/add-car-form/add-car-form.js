import React from "react";
import "./add-car-form.scss";
import Repostitory from "../../storage/local-storage";
import createHashHistory from "history/lib/createHashHistory";
import requestToServer from "../../utils/request-to-server";

class addCarsForm extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  addCarToList(theUrl) {

    let params = "user=" + String(Repostitory.get_obj("user").id) + "&" + "title=" + String(this.refs.titleCar.value);
    params += "&" + "type=a" + "&" + "regNumber=" + String(this.refs.plateNumber.value);
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

export default addCarsForm;