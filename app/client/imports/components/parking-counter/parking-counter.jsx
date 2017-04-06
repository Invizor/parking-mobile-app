import React from "react";
import LocalStorage from "../../storage/local-storage";
import "./parking-counter.scss";

export default class ParkingCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shownAlert: false,
      remain: {},
      parkingSession: {}
      /*remainingTime: {
       year: 0,
       month: 0,
       day: 0,
       hours: 0,
       minutes: 0,
       seconds: 0
       }*/
    };
  }

  getParkingSession() {
    const parkingSession = LocalStorage.get_obj("parkingSession")[this.props.number];
    this.setState({parkingSession: parkingSession});
    // console.log("parkingSession", parkingSession);
    // this.setState({parkingSession: parkingSession});
  }


  componentDidMount() {
    this.getParkingSession();

    this.getRemainingTime();
    this.timer = setInterval(() => {
      this.getRemainingTime();
    }, 1000);

  }

  componentWillUnmount() {

    // Этот метод вызывается сразу после того, как компонент удален
    // со страницы и уничтожен. Мы можем удалить интервал здесь:

    clearInterval(this.timer);
  }

  getRemainingTime() {
    let parkingSession = LocalStorage.get_obj("parkingSession")[this.props.number];
    let remainingParkingTime = {};

    let now = new Date();
    now.setHours(parkingSession.endParkingTime.hours - now.getHours());
    now.setMinutes(parkingSession.endParkingTime.minutes - now.getMinutes());
    now.setSeconds(parkingSession.endParkingTime.seconds - now.getSeconds());

    remainingParkingTime.hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    remainingParkingTime.minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    remainingParkingTime.seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    this.setState({remain: remainingParkingTime});
    let ionUpdatePopup = this.context.ionUpdatePopup;
    if (this.state.remain.hours === "00" && this.state.remain.minutes === "00" && this.state.remain.seconds === "00") {

      LocalStorage.remove_obj("parkingSession");
      LocalStorage.remove_obj("endParkingTime");

      ionUpdatePopup({
        popupType: "alert",
        title: "Внимание!",
        template: "Время парковки завершено!",
        okText: "Ок",
        onOk: function () {

        }
      });
    } else {
      if (remainingParkingTime.hours <= 0 && remainingParkingTime.minutes < 15 && !this.state.shownAlert) {
        ionUpdatePopup({
          popupType: "confirm",
          cancelText: "Нет",
          okText: "Да",
          title: "Время парковки завершается!",
          template: <span>Хотите продлить время парковки?</span>,
          cancelType: "button-light",
          onOk: () => {

          },
          onCancel: function () {
            //console.log("Cancelled");
          }
        });
        this.setState({shownAlert: true});
      }
    }
  }


  render() {

    let counterMarkup;
    if (this.props.singleParking) {
      counterMarkup = (
        <div>
          <div className="remaining-time">
            <div>
              Оставшееся время
            </div>
            <div className="remaining-hours">
              <span>{this.state.remain.hours}</span>:<span>{this.state.remain.minutes}</span>:<span>{this.state.remain.seconds}</span>
            </div>
          </div>
        </div>
      );
    } else {
      counterMarkup = (
          <div className="remaining-time">
            <div>
              Оставшееся время: <span>{this.state.remain.hours}</span>:<span>{this.state.remain.minutes}</span>:<span>{this.state.remain.seconds}</span>
            </div>
            <div>
              Номер машины: <span>{this.state.parkingSession.transportNumber}</span>
            </div>
          </div>
      );
    }
    return (
      <div>
        {counterMarkup}
      </div>
    );
  }
}

ParkingCounter.contextTypes = {
  ionUpdatePopup: React.PropTypes.func
};

