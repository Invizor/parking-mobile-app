import React, {Component} from 'react';
import {IonButton, IonSelect, IonItem} from 'reactionic';
import parkingStorage from '../../storage/parking-storage';
import createHashHistory from 'history/lib/createHashHistory';
import "./confirm-pay-parking.scss";
import Repository from '../../storage/local-storage';

export default class ConfirmPayParking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carsList: ['Не выбрано', 'BMW','Audi','Mersedes'],
      selectedValue: 'Не указано',
      balance: 0
    };
    console.log('one', this);
  }

  static contextTypes = {
    ionUpdatePopup: React.PropTypes.func
  };

  getParkingId() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const parkingId = this.props.location.pathname.substring(start + 1);
    return parkingId;
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
    const currentParking = parkingStorage.parkings.find((parking) => {
      if (parking._id === this.getParkingId()) {
        return parking;
      }
    });

    //console.log('getCurrentParking', currentParking);
    return currentParking;


  }

  changeValue(value) {
    // console.log('e',e);
    this.setState({selectedValue: value});
    // console.log('value', value)
  }

  checkCarsList(e) {
    if (this.state.carsList === 0) {
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


  }


  getUserCars() {
    this.setState({carsList: Repository.get_obj('cars')});
  }

  render() {
    return (
      <div>
        <div className="confirm-pay-parking">
          <div className="text-center">

            <h1>Парковка #{this.getCurrentParking().zoneId}</h1>

            <div>{this.getCurrentParking().address}</div>

            <div onMouseDown={e => this.checkCarsList(e)}>
              <IonSelect label='Паркуемое авто'
                         options={this.state.carsList}
                         defaultValue= {this.state.carsList[0]}
                         ref="carSelect"
                         handleChange={e => this.changeValue(e)}>
              </IonSelect>
            </div>
            <div className="duration">
              <IonItem>
                <div>Укажите время парковки</div>
                <div>
                  <input type="number" ref="hours" min="0" max="23"/>
                  <input type="number" ref="minutes" min="0" max="59"/>
                </div>
              </IonItem>
            </div>


            <div className="balance">
              <IonItem>
                Баланс <span className="balance-amount">{this.state.balance} руб.</span>
              </IonItem>
            </div>


            <IonButton color="positive"
                       className="confirm-pay-parking-button"
                       onClick={e => this.startParking(e)}>
              Начать парковку
            </IonButton>
          </div>

        </div>
      </div>
    )
  }
}

