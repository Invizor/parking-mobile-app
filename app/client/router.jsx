import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Index from './imports/components/index/index';
import App from './imports/containers/app/app';
import Layout from './imports/layouts/main';
import Container from './imports/containers/container/container';
import AutorizationForm from './imports/components/autorization-form/autorization-form';
import VerificationForm from './imports/components/verification-form/verification-form';
import ParkingItem from './imports/components/parking-item/parking-item';
import ConfirmPayParking from './imports/components/confirm-pay-parking/confirm-pay-parking';
import SetBalance from './imports/components/set-balance/set-balance';
import NoMatch from './imports/components/nomatch/nomatch';
import CarList from './imports/components/car-list/car-list'
import addCarForm from './imports/components/add-car-form/add-car-form';
import ParkingHistory from './imports/components/parking-history/parking-history';
import EditCar from './imports/components/edit-car/edit-car';

let main = () => {

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
    {path: '/edit-car/:id', component: EditCar, title: 'Редактирование автомобиля', done: true}
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


  //alert("hello");
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('app')
  );
};

main();
