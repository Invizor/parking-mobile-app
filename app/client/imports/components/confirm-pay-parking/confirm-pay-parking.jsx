import React, { Component } from 'react';
import { IonButton, IonSelect} from 'reactionic';
import parkingStorage from '../../storage/parking-storage';


export default class ConfirmPayParking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carsList: ['Не указано', 'Audi'],
      selectValue: 'Не указано'
      }
  }


  getParkingId() {
    const start = this.props.location.pathname.lastIndexOf("/");
    const parkingId = this.props.location.pathname.substring(start + 1);
    return parkingId;
  }

  getCurrentParking() {
    if (!Array.prototype.find) {
      Array.prototype.find = function(predicate) {
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
    const currentParking = parkingStorage.parkings.find((parking)=> {
      if(parking._id === this.getParkingId()) {
        return parking;
      }
    });

    //console.log('getCurrentParking', currentParking);
    return currentParking;


  }

  changeValue(value){
   // console.log('e',e);
    this.setState({ selectValue: value});
  }



  render() {
   // console.log('carsList',this.state.carsList);
    let carsList = ['Не указано'];
    return (
      <div>
        <div className="confirm-pay-parking">
          <div className="text-center">

            <h1>#{this.getCurrentParking().zoneId}</h1>

            <div>{this.getCurrentParking().address}</div>

            <IonSelect  label='Паркуемое авто'
                        options={this.state.carsList}
                        defaultValue={this.state.carsList[0]}
                        handleChange={e=>this.changeValue(e)}>
            </IonSelect>

            <IonButton color="positive"
                       link="/autorization-form">
              Начать парковку
            </IonButton>
          </div>



        </div>
      </div>
    )
  }
}

