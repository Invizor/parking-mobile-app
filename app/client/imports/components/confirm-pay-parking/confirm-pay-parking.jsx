import React, {Component} from 'react';
import {IonButton, IonSelect, IonItem, IonRange} from 'reactionic';
import createHashHistory from 'history/lib/createHashHistory';
import "./confirm-pay-parking.scss";
import Repository from '../../storage/local-storage';
import {findDOMNode} from 'react-dom';

export default class ConfirmPayParking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carTitleList: ['Не выбрано', 'BMW', 'Audi', 'Mersedes'],
      carList: [],
      selectedValue: 'Не указано',
      balance: 0,
      rangeValue: 1,
      carTitleValue: '',
      regNumberValue: ''
    };
    //console.log('one', this);
  }

  static contextTypes = {
    ionUpdatePopup: React.PropTypes.func,
    showSelector: React.PropTypes.func
  };

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
    const balance = Repository.get_obj('user').wallet;
    this.setState({balance: balance});
  }

  getCurrentParking() {
    if (!Array.prototype.find) {
      Array.prototype.find = function (predicate) {
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }
    const currentParking = Repository.get_obj('paidParkingList').find((parking) => {
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
    this.setState({regNumberValue: e.target.value});
  }

  checkCarsList(e) {
    if (this.state.carTitleList === 0) {
      e.preventDefault();
      console.log('999');
      let ionUpdatePopup = this.context.ionUpdatePopup;
      ionUpdatePopup({
        popupType: 'alert',
        title: 'Нет добавленных автомобилей',
        template: 'Вам нужно добавить автомобиль',
        okText: 'Добавить',
        onOk: function () {
          let history = createHashHistory();
          history.push('/set-balance');
        }
      })
    }
  }

  startParking() {
    console.log(this.state.selectedValue);
    let ionUpdatePopup = this.context.ionUpdatePopup;
    if (this.state.selectedValue === "Не указано") {
      ionUpdatePopup({
        popupType: 'alert',
        okText: 'Ok',
        title: 'Машина не выбрана!',
        template: <span>Выберите машину, которую хотите припарковать!</span>,
        cancelType: 'button-light',
        onOk: () => {

        }
      })
    } else if (this.state.balance <= 0) {
      ionUpdatePopup({
        popupType: 'confirm',
        cancelText: 'Нет',
        okText: 'Да',
        title: 'У вас недостаточно средств',
        template: <span>Хотите пополнить баланс?</span>,
        cancelType: 'button-light',
        onOk: () => {
          let history = createHashHistory();
          history.push('/set-balance');
        },
        onCancel: function () {
          console.log('Cancelled');
        }
      })
    }

    else {

      if (window.SelectorCordovaPlugin) {
        let data = {
          numbers: [
            {description: 1},
            {description: 3},
            {description: 3},
            {description: 4},
            {description: 5},
            {description: 6},
            {description: 7},
            {description: 8},

          ]
        };

        let config = {
          title: "Укажите длительность",
          items:[
            [data.numbers]
          ],
          positiveButtonText: "Готово",
          negativeButtonText: "Отмена"
        };



        window.SelectorCordovaPlugin.showSelector(config, function(result) {
          console.log("result: " + JSON.stringify(result) );
          console.log('User chose number: ' + result[0].description + ' at array index: ' + result[0].index);

          //note: as of now in iOS result[1] is ignored
          console.log('User chose fruit: ' + result[1].description + ' at array index: ' + result[1].index);
        }, function() {
          console.log('Canceled');
        });
      }




      const parkingID = this.getParkingId();
      this.getCarByTitle();
      let client = new XMLHttpRequest();
      client.open("POST", "https://parkimon.ru/api/v1/parking/start", true);
      client.setRequestHeader("Authorization", 'Bearer ' + String(Repository.get_obj("token")));
      let params = "zoneId=" + parkingID + "&transportId=" + this.getCarByTitle()._id + "&transportString=" + this.getCarByTitle().regNumber;

      client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      client.send(params);

      client.onload = () => {
        let list = JSON.parse(client.responseText);
        console.log("response text", list);

        let parkingTimer = window.setInterval(()=>{
          let secondRequest = new XMLHttpRequest();
          secondRequest.open("GET", "https://parkimon.ru/api/v1/parking/" + list.session._id, true);
          secondRequest.setRequestHeader("Authorization", 'Bearer ' + String(Repository.get_obj("token")));
          secondRequest.send();
          secondRequest.onload = () => {
            let newList = JSON.parse(secondRequest.responseText);
            console.log(newList);
            if (newList.session.status === "done") {
              console.log("done");
              clearInterval(parkingTimer);
            }
          }
        }, 5000);




      };
    }



  }


  getUserCars() {
    const myCars = Repository.get_obj('cars');
    this.setState({carList: myCars.userCars});
    let myCarsTitleList = myCars.userCars.map((car) => {
      return car.title;
    });
    myCarsTitleList.unshift('Не указано');
    console.log('myCarsTitleList', myCarsTitleList);
    this.setState({carTitleList: myCarsTitleList});
  }

  getRegNumberByTitle(value) {
    this.state.carList.filter((car)=>{
      if(car.title === value) {
        this.setState({regNumberValue: car.regNumber});
      } else if (value === 'Не указано') {
        this.setState({regNumberValue: ''})
      }
    })
  }

  componentDidMount() {
    console.log('userCars1', this.state.carTitleList);
    this.getUserCars();
    this.getBalance();
    console.log('userCars2', this.state.carTitleList);
  }

  render() {
    let rangeLabel  = 'Количество часов: '+ this.state.rangeValue;
    return (
      <div>
         <div className="confirm-pay-parking">
          <div className="text-center">

            <h1>#{this.getCurrentParking().zoneId}</h1>
            <div onMouseDown={e => this.checkCarsList(e)}>
              <IonSelect label='Паркуемое авто'
                         options={this.state.carTitleList}
                         defaultValue='Не указано'
                         ref="carSelect"
                         handleChange={e => this.changeValue(e)}>
              </IonSelect>
            </div>
            <div className="reg-number">
              <IonItem>
                Номер автомобиля
                <input type="text"
                       name="regNumber"
                       placeholder="о123оо"
                       ref="regNumber"
                       value={this.state.regNumberValue}
                       onChange={e => this.handleRegNumberChange(e)}/>
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
    )
  }
}

