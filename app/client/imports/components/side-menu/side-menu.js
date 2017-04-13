import React from "react";
import {IonIcon} from "reactionic";
import Repository from "../../storage/local-storage";
import createHashHistory from "history/lib/createHashHistory";

class SideMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps() {
    this.render();
  }

  userAutorized() {
    return (
      <div>
        <div className="bar bar-header bar-stable">
          <h1 className="title">{Repository.get_obj("user").username}</h1>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            <div className="item item-icon-right" onClick={() => {
              this.goToRoute("/list-car");
            }}>
              Мои автомобили <IonIcon icon="ios-arrow-right"/>
            </div>
          </div>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            <div className="item item-icon-right" onClick={() => {
              this.goToRoute("/parking-history");
            }}>
              История парковок <IonIcon icon="ios-arrow-right"/>
            </div>
          </div>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            <div className="item item-icon-right">
              Быстрая парковка <IonIcon icon="ios-arrow-right"/>
            </div>
          </div>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            <div className="item item-icon-right" onClick={() => {
              this.goToRoute("/set-balance");
            }}>
              Пополнение баланса <IonIcon icon="ios-arrow-right"/>
            </div>
          </div>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            <div className="item item-icon-right" onClick={() => {
              this.goToRoute("/parking-counter-list");
            }}>
              Припаркованные авто <IonIcon icon="ios-arrow-right"/>
            </div>
          </div>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            <div className="item item-icon-right" onClick={() => {
              this.goToRoute("/event-emitter-example");
            }}>
              Event Emitter <IonIcon icon="ios-arrow-right"/>
            </div>
          </div>
        </div>



      </div>
    );
  }

  goToRoute(theUrl) {
    this.props.contextMain.ionSnapper.close();
    let history = createHashHistory();
    history.push(theUrl);
  }

  userGost() {
    return (
      <div>
        <div className="bar bar-header bar-stable">
          <h1 className="title">Гость</h1>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            <div className="item item-icon-right">
              О приложении <IonIcon icon="ios-arrow-right"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        { (this.props.isAutorized) && this.userAutorized()}
        { (!this.props.isAutorized) && this.userGost()}
      </div>
    );
  }
}

export default SideMenu;