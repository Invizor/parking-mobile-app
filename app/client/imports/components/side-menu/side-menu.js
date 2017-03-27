import React, {PropTypes, Component} from 'react';
import {IonContent, IonButton, IonIcon, IonList, IonItem, IonSideMenu} from 'reactionic';
import {findDOMNode} from 'react-dom';
import Repository from '../../storage/local-storage';
import createHashHistory from 'history/lib/createHashHistory';
import userStorage from '../../storage/user-storage';

class SideMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps){
        this.render();
    }

    userAutorized(){
        return (
        <div>
            <div className="bar bar-header bar-stable">
                <h1 className="title">{Repository.get_obj("user").username}</h1>
            </div>
            <div className="content has-header side-menu">
                <div className="list">
                    <div className="item item-icon-right" onClick={() => {this.goToRoute('/list-car')}} >
                        Мои автомобили <IonIcon icon="ios-arrow-right" />
                    </div>
                </div>
            </div>
            <div className="content has-header side-menu">
                <div className="list">
                    <div className="item item-icon-right" onClick={() => {this.goToRoute('/parking-history')}} >
                        История парковок <IonIcon icon="ios-arrow-right" />
                    </div>
                </div>
            </div>
            <div className="content has-header side-menu">
                <div className="list">
                    <div className="item item-icon-right"  >
                        Быстрая парковка <IonIcon icon="ios-arrow-right" />
                    </div>
                </div>
            </div>
            <div className="content has-header side-menu">
                <div className="list">
                    <div className="item item-icon-right" onClick={() => {this.goToRoute('/set-balance')}}>
                        Пополнение баланса <IonIcon icon="ios-arrow-right" />
                    </div>
                </div>
            </div>
        </div>
        );
    }

    goToRoute(theUrl){
        this.props.contextMain.ionSnapper.close();
        let history = createHashHistory();
        history.push(theUrl);
    }

    userGost(){
        return (
            <div>
                <div className="bar bar-header bar-stable">
                    <h1 className="title">Гость</h1>
                </div>
                <div className="content has-header side-menu">
                    <div className="list">
                        <div className="item item-icon-right"  >
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