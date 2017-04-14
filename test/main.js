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
import AutorizationForm from '../app/client/imports/components/autorization-form/autorization-form';
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


let app = document.createElement('div');

app.setAttribute("id", "app");
app.setAttribute("class", "root");

document.body.appendChild(app);

/*render((
  <link rel="stylesheet" type="text/css" href="../mobile-app/www/style/index.css"/>
), document.head);
render((
  <link rel="stylesheet" type="text/css" href="../mobile-app/www/style/fonts.css"/>
), document.head);*/

var pageList = [
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

var tabRoutes;
const pageRoutes = pageList.map(function (page) {
  if (page.childRoutes) {
    tabRoutes = page.childRoutes.map(function (cpage) {
      return <Route path={cpage.path} component={cpage.component} key={cpage.path}/>;
    });
  } else {
    return <Route path={page.path} component={page.component} key={page.path}/>;
  }
});

var PageList = pageList.map(function (page, idx, pageArray) {
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

var routes = (
  <Route path="/" component={App} pageList={PageList}>
    { mainRoute }
    <Route path="*" component={NoMatch}/>
  </Route>
);

//НЕ СТИРАТЬ !!!!
render((
  <Router history={hashHistory}>{routes}</Router>
), document.getElementById("app"));
//НЕ СТИРАТЬ !!!!

let wrap = mount(<div className="root" id="app"> <Router history={hashHistory}>{routes}</Router></div>);

describe('<AutorizationForm/ >', () => {
  let wrapper = wrap;
  wrapper.find('.list a').first().simulate('click', { button: 0 });

  it('existence render components', () => {

    expect(wrapper.find('.first-symbol')).to.have.length(1);
    expect(wrapper.find('.phone-input #phone')).to.have.length(1);
    expect(wrapper.find('.autorization-btn button')).to.have.length(1);
    expect(wrapper.find('.warningAuth')).to.have.length(1);

  });

  it('enter phone to input and click', () => {
    //const handleClickStub = sinon.spy();

    let inputPhone = wrapper.find('.phone-input #phone');
    inputPhone.node.value = '(918)-785-7644';
    let buttonEnter = wrapper.find('.autorization-btn button');
    buttonEnter.simulate('click');

    expect(wrapper.find('.popup')).to.have.length(1);
    expect(wrapper.find('.popup-body span p').node.innerText).to.equal("+7 (918)-785-7644");

    let buttonPopup = wrapper.find('.popup-buttons button').last();

    buttonPopup.simulate('click');

    return new Promise((resolve,reject) => {
      window.addEventListener('popstate', (event) => {
        window.setTimeout(function(){
          expect(wrapper.find('.verification')).to.have.length(1);
          resolve();
        });
      }, false);
    });

    /*console.log("WRAPPER=",wrapper);
    //console.log(wrapper.find('.autorization-btn button'));
    console.log("Verif=",wrapper.find('.verification'));
    expect(wrapper.find('.verification')).to.have.length(1);*/

  });
});
