import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { render } from 'react-dom'
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Index from '../app/client/imports/components/index/index';
import App from '../app/client/imports/containers/app/app';
import Layout from '../app/client/imports/layouts/main';
import Container from '../app/client/imports/containers/container/container';
import AutorizationForm from '../app/client/imports/components/authorization-form/autorization-form';
import VerificationForm from '../app/client/imports/components/verification-form/verification-form';
import ParkingItem from '../app/client/imports/components/parking-item/parking-item';
import ConfirmPayParking from '../app/client/imports/components/confirm-pay-parking/confirm-pay-parking';
import SetBalance from '../app/client/imports/components/set-balance/set-balance';
import NoMatch from '../app/client/imports/components/nomatch/nomatch';
import CarList from '../app/client/imports/components/car-list/car-list'
import addCarForm from '../app/client/imports/components/add-car-form/add-car-form';
import ParkingHistory from '../app/client/imports/components/parking-history/parking-history';
import ParkingCounterList from '../app/client/imports/components/parking-counter-list/parking-counter-list';
import EditCar from '../app/client/imports/components/edit-car/edit-car';
import MainTitle from '../app/client/imports/components/main-title/main-title';
'use strict';

class VirtualDom{

  constructor() {

    let pageList = [
      {path: '/', component: Index, title: 'React Ionic', done: true},
      {path: '/autorization-form', component: AutorizationForm, title: 'Авторизация', done: true},
      {path: '/verification-form/:number', component: VerificationForm, title: 'Верификация', done: true},
      {path: '/list-car', component: CarList, title: 'Список автомобилей', done: true},
      {path: '/add-car', component: addCarForm, title: 'Добавление машины', done: true},
      {path: '/parking-item/:id', component: ParkingItem, title: 'Информация о парковке', done: true},
      {path: '/container', component: Container, title: 'Parkimon', done: true},
      {path: '/set-balance', component: SetBalance, title: 'Пополнение баланса', done: true},
      {path: '/confirm-pay-parking/:id', component: ConfirmPayParking, title: 'Условия парковки', done: true},
      {path: '/parking-history', component: ParkingHistory, title: 'История парковок', done: true},
      {path: '/edit-car/:id', component: EditCar, title: 'Редактирование автомобиля', done: true},
      {path: '/parking-counter-list', component: ParkingCounterList, title: 'Припаркованные авто', done: true}
    ];

    let tabRoutes;
    const pageRoutes = pageList.map(function (page) {
      if (page.childRoutes) {
        tabRoutes = page.childRoutes.map(function (cpage) {
          return <Route path={cpage.path} component={cpage.component} key={cpage.path}/>;
        });
      } else {
        return <Route path={page.path} component={page.component} key={page.path}/>;
      }
    });

    let PageList = pageList.map(function (page, idx, pageArray) {
      // strip the page components
      delete page.component;
      return page;
    });

    let mainRoute = (
      <Route component={Layout}>
        <IndexRoute component={Index}/>
        {pageRoutes}
      </Route>
    );

    let routes = (
      <Route path="/" component={App} pageList={PageList}>
        { mainRoute }
        <Route path="*" component={NoMatch}/>
      </Route>
    );

    this.routes = routes;
  }

  createDom(){
    let app = document.createElement('div');

    app.setAttribute("id", "app");
    app.setAttribute("class", "root");

    document.body.appendChild(app);

    render((
      <Router history={hashHistory}>{this.routes}</Router>
    ), document.getElementById("app"));

    //return document;
  }

  createEnzymeDom(){
    let wrap = mount(<div className="root" id="app"> <Router history={hashHistory}>{this.routes}</Router></div>);
    return wrap;
  }

}

export default VirtualDom;