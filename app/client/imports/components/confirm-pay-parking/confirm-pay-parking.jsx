import React, {Component} from "react";
import {IonButton, IonSelect, IonItem, IonRange} from "reactionic";
import createHashHistory from "history/lib/createHashHistory";
import "./confirm-pay-parking.scss";
import Repository from "../../storage/local-storage";
import RequestToServer from "../../utils/request-to-server";
import LocalStorage from "../../storage/local-storage";


export default class ConfirmPayParking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carTitleList: ["Не выбрано"],
      carList: [],
      selectedValue: "Не указано",
      balance: 0,
      rangeValue: 1,
      carTitleValue: "",
      regNumberValue: ""
    };
  }

  rangeSelection(value){
    this.setState({ rangeValue: value});
  }

  getParkingId() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const parkingId = this.props.location.pathname.substring(start + 1);
    return parkingId;
  }

  getCarByTitle() {
    const carId = this.state.carList.filter((car)=> {
      if(car.title === this.state.selectedValue) {
        return <car></car>;
      }
    });
    return carId[0];
  }

  getBalance() {
    const balance = Repository.get_obj("user").wallet;
    this.setState({balance: balance});
  }

  getCurrentParking() {
    if (!Array.prototype.find) {
      Array.prototype.find = function (predicate) {
        if (this == null) {
          throw new TypeError("Array.prototype.find called on null or undefined");
        }
        if (typeof predicate !== "function") {
          throw new TypeError("predicate must be a function");
        }
        let list = Object(this);
        let length = list.length >>> 0;
        let thisArg = arguments[1];
        let value;

        for (let i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }
    const currentParking = Repository.get_obj("paidParkingList").find((parking) => {
      if (parking._id === this.getParkingId()) {
        return parking;
      }
    });

    //console.log('getCurrentParking', currentParking);
    return currentParking;


  }

  changeValue(value) {
    this.setState({selectedValue: value});
    this.getRegNumberByTitle(value);
  }

  handleRegNumberChange(e) {
    this.getTitleByRegNumber(e.target.value);
    this.setState({regNumberValue: e.target.value});
  }
  handleRegNumberClick(e) {
    this.getRegNumberByTitle(e.target.value);
  }

  checkCarsList(e) {
    if (this.state.carTitleList === 0) {
      e.preventDefault();
      let ionUpdatePopup = this.context.ionUpdatePopup;
      ionUpdatePopup({
        popupType: "alert",
        title: "Нет добавленных автомобилей",
        template: "Вам нужно добавить автомобиль",
        okText: "Добавить",
        onOk: function () {
          let history = createHashHistory();
          history.push("/set-balance");
        }
      });
    }
  }

  startParking() {
    //console.log(this.state.selectedValue);
    let ionUpdatePopup = this.context.ionUpdatePopup;
    if (this.state.selectedValue === "Не указано") {
      ionUpdatePopup({
        popupType: "alert",
        okText: "Ok",
        title: "Машина не выбрана!",
        template: <span>Выберите машину, которую хотите припарковать!</span>,
        cancelType: "button-light",
        onOk: () => {

        }
      });
    } else if (this.state.balance <= 0) {
      ionUpdatePopup({
        popupType: "confirm",
        cancelText: "Нет",
        okText: "Да",
        title: "У вас недостаточно средств",
        template: <span>Хотите пополнить баланс?</span>,
        cancelType: "button-light",
        onOk: () => {
          let history = createHashHistory();
          history.push("/set-balance");
        },
        onCancel: function () {
          //console.log("Cancelled");
        }
      });
    }

    else {
      const parkingID = this.getParkingId();
      this.getCarByTitle();

      console.log("parkingID", parkingID);
      console.log(" this.getCarByTitle().regNumber",  this.getCarByTitle().regNumber);
      console.log(" this.getCarByTitle()._id",  this.getCarByTitle()._id);
      RequestToServer("POST", "https://parkimon.ru/api/v1/parking/start", (response) => {
        console.log("response", response);
        /*let testParkingTimer = window.setInterval(()=>{
          console.log("HELLO");
          let client2 = new XMLHttpRequest();
          client2.open("GET", "https://parkimon.ru/api/v1/parking/" + response.session._id);
          client2.setRequestHeader("Authorization", "Bearer " + String(LocalStorage.get_obj("token")));
          client2.send();
          client2.onload = () => {
            const newResponse = JSON.parse(client2.responseText);
            console.log("responseText", newResponse);
          }
        }, 5000);*/
        let parkingTimer = window.setInterval(()=> {
          let client = new XMLHttpRequest();
          client.open("GET", "https://parkimon.ru/api/v1/parking/" + response.session._id);
          client.setRequestHeader("Authorization", "Bearer " + String(LocalStorage.get_obj("token")));
          client.send();
          client.onload = () => {
            const newResponse = JSON.parse(client.responseText);
            console.log("responseText11111", newResponse);
            if (newResponse.session.status === "done") {
              newResponse.session.status = "parking";
              let startTime = parseInt(newResponse.session.start.substring(11,13)) + 6;
              let endTime = parseInt(newResponse.session.start.substring(11,13)) + 6 + newResponse.session.forTime / 60;
              if(startTime < 10) {
                startTime = "0" + startTime;
              }
              if (endTime < 10) {
                endTime = "0" + endTime;
              }
              newResponse.session.start = newResponse.session.start.replace(newResponse.session.start.substring(0,11) + newResponse.session.start.substring(11,13), newResponse.session.start.substring(0,11) + startTime);
              newResponse.session.end = newResponse.session.end.replace(newResponse.session.end.substring(0,11) + newResponse.session.end.substring(11,13),newResponse.session.end.substring(0,11) + endTime);
              let newParkingSession = newResponse.session;


              let status =  newParkingSession.end.substring(11, 19);
              let remainingTimeDateArray = newParkingSession.end.substring(0, 10).split("-");
              let remainingTimeArray = status.split(":");
              // console.log("parkingSession2", parkingSession);
              let endParkingTime = {
                year: remainingTimeDateArray[0],
                month: remainingTimeDateArray[1],
                day: remainingTimeDateArray[2],
                hours: remainingTimeArray[0],
                minutes: remainingTimeArray[1],
                seconds: remainingTimeArray[2]
              };
              newParkingSession.endParkingTime = endParkingTime;

              console.log("THE NEW", newParkingSession);


              if(Repository.get_obj("parkingSession") && Repository.get_obj("parkingSession").length) {
                let existingParkingSessions = Repository.get_obj("parkingSession");
                existingParkingSessions.push(newParkingSession);
                Repository.change_obj("parkingSession", existingParkingSessions);
              } else {
                let parkingSession = [];
                parkingSession.push(newParkingSession);
                newParkingSession = parkingSession;
                Repository.add_obj("parkingSession", newParkingSession);
              }
              console.log("newResponse", newResponse.session);
              console.log("done");
              clearInterval(parkingTimer);
              let ionUpdatePopup = this.context.ionUpdatePopup;
              ionUpdatePopup({
                popupType: "alert",
                okText: "Ok",
                title: "Парковка началась!",
                template: <span>Парковка началась!</span>,
                cancelType: "button-light",
                onOk: () => {
                  let history = createHashHistory();
                  history.push("/container");
                }
              });

            } else if (newResponse.session.status === "error") {
              console.log("request failed");
              clearInterval(parkingTimer);
            }
          };

       /*   RequestToServer("GET", "https://parkimon.ru/api/v1/parking/" + response.session._id, (newResponse) => {
            //console.log(newResponse);
            if (newResponse.session.status === "done") {
              newResponse.session.status = "parking";
              let startTime = parseInt(newResponse.session.start.substring(11,13)) + 6;
              let endTime = parseInt(newResponse.session.start.substring(11,13)) + 6 + newResponse.session.forTime / 60;
              if(startTime < 10) {
                startTime = "0" + startTime;
              }
              if (endTime < 10) {
                endTime = "0" + endTime;
              }
              newResponse.session.start = newResponse.session.start.replace(newResponse.session.start.substring(0,11) + newResponse.session.start.substring(11,13), newResponse.session.start.substring(0,11) + startTime);
              newResponse.session.end = newResponse.session.end.replace(newResponse.session.end.substring(0,11) + newResponse.session.end.substring(11,13),newResponse.session.end.substring(0,11) + endTime);
              let newParkingSession = newResponse.session;


              let status =  newParkingSession.end.substring(11, 19);
              let remainingTimeDateArray = newParkingSession.end.substring(0, 10).split("-");
              let remainingTimeArray = status.split(":");
              // console.log("parkingSession2", parkingSession);
              let endParkingTime = {
                year: remainingTimeDateArray[0],
                month: remainingTimeDateArray[1],
                day: remainingTimeDateArray[2],
                hours: remainingTimeArray[0],
                minutes: remainingTimeArray[1],
                seconds: remainingTimeArray[2]
              };
              newParkingSession.endParkingTime = endParkingTime;

              console.log("THE NEW", newParkingSession);


              if(Repository.get_obj("parkingSession") && Repository.get_obj("parkingSession").length) {
                let existingParkingSessions = Repository.get_obj("parkingSession");
                existingParkingSessions.push(newParkingSession);
                Repository.change_obj("parkingSession", existingParkingSessions);
              } else {
                let parkingSession = [];
                parkingSession.push(newParkingSession);
                newParkingSession = parkingSession;
                Repository.add_obj("parkingSession", newParkingSession);
              }
              console.log("newResponse", newResponse.session);
              console.log("done");
              clearInterval(parkingTimer);
              let ionUpdatePopup = this.context.ionUpdatePopup;
                ionUpdatePopup({
                  popupType: "alert",
                  okText: "Ok",
                  title: "Парковка началась!",
                  template: <span>Парковка началась!</span>,
                  cancelType: "button-light",
                  onOk: () => {
                    let history = createHashHistory();
                    history.push("/container");
                  }
                });

            } else if (newResponse.session.status === "error") {
              console.log("request failed");
              clearInterval(parkingTimer);
            }
          }, true);*/
        }, 5000);
      }, true, "zoneId=" + parkingID +
               "&transportId=" + this.getCarByTitle()._id +
               "&transportString=" + this.getCarByTitle().regNumber +
               "&forTime=" + this.state.rangeValue * 60);

    }



  }


  getUserCars() {
    const myCars = Repository.get_obj("cars");
    this.setState({carList: myCars.userCars});
    let myCarsTitleList = myCars.userCars.map((car) => {
      return car.title;
    });
    myCarsTitleList.unshift("Не указано");
    console.log("myCarsTitleList", myCarsTitleList);
    this.setState({carTitleList: myCarsTitleList});
  }

  getRegNumberByTitle(title) {
    this.state.carList.filter((car)=>{
      if(car.title === title) {
        this.setState({regNumberValue: car.regNumber});
      } else if (title === "Не указано") {
        this.setState({regNumberValue: ""});
      }
    });
  }

  getTitleByRegNumber(regNumber) {
    this.state.carList.filter((car)=>{
      if(car.regNumber == regNumber) {
        this.setState({selectedValue: car.title});
      }
    });
  }

  componentDidMount() {
    console.log("userCars1", this.state.carTitleList);
    this.getUserCars();
    this.getBalance();
    console.log("userCars2", this.state.carTitleList);
  }

  render() {

    let rangeLabel  = "Количество часов: "+ this.state.rangeValue;
    return (
      <div>
         <div className="confirm-pay-parking">
          <div className="text-center">
            <h1>#{this.getCurrentParking().zoneId}</h1>
            <div onMouseDown={e => this.checkCarsList(e)} onClick={e => this.handleRegNumberClick(e)}>
              <IonSelect label="Паркуемое авто"
                         options={this.state.carTitleList}
                         defaultValue={this.selectedValue}
                         ref="carSelect"
                         handleChange={e => this.changeValue(e)}>
              </IonSelect>
            </div>
            <div className="reg-number">
              <IonItem>
                <div className="car-number">
                  <div className="car-number-title">
                    Номер автомобиля
                  </div>
                  <div className="car-number-field">
                    <input type="text"
                           name="regNumber"
                           ref="regNumber"
                           value={this.state.regNumberValue}
                           onChange={e => this.handleRegNumberChange(e)}/>
                  </div>
                </div>
              </IonItem>
            </div>
            <div className="balance">
              <IonItem>
                Ваш баланс <span className="balance-amount">{this.state.balance} руб.</span>
              </IonItem>
            </div>
            <IonItem divider>{rangeLabel}</IonItem>
            <IonRange
                      defaultValue={1}
                      handleChange={e=> this.rangeSelection(e)}
                      min={1}
                      max={24}>
            </IonRange>
            <div className="confirm-pay-parking-button">
              <IonButton color="positive"
                         onClick={e => this.startParking(e)}>
                Начать парковку
              </IonButton>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

ConfirmPayParking.contextTypes = {
  ionUpdatePopup: React.PropTypes.func,
  showSelector: React.PropTypes.func
};

