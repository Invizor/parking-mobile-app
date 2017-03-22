import React, {Component} from 'react';
import {IonContent} from 'reactionic';
import Repostitory from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';

class EditCar extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      carTitleValue: this.getCar().title,
      carRegNumberValue: this.getCar().RegNumber
    };
  }

  getCar() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const carId = this.props.location.pathname.substring(start + 1);
    console.log(carId);
    const carList = Repostitory.get_obj('cars');
    carList.filter((car)=>{
      if(car._id === carId) {
        return true;
      } else {
        return false;
      }
    })


   /* const taskId = this.props.taskId;
    let task = this.props.tasks.find((element)=> {
      if(element.id === taskId) {
        return true;
      } else {
        return false;
      }
    });
    return task;*/
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
            Ваш автомобиль:
          </div>
          <div className="title-car">
            <input type="text"
                   name="title"
                   placeholder="название"
                   ref="titleCar"
                   onChange={e => this.handleTitleChange(e)}/>
          </div>
          <div className="plate-number">
            <input
              type="text"
              name="plateNumber"
              placeholder="номер автомобиля"
              ref="plateNumber"
              onChange={e => this.handleRegNumberChange(e)}/>
          </div>
          <div className="add-car-button">
            <button className="button button-positive"
                    onClick={() => this.editCarBtnClicked('https://parkimon.ru/api/v1/user-car/edit)')}>
              Добавить
            </button>
          </div>
        </div>

      </IonContent>
    );
  }
}

export default EditCar;