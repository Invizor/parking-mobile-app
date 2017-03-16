import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Index from './imports/components/index/index';
import App from './imports/containers/app/app';
import Layout from './imports/layouts/main';
import Map from './imports/containers/container/container';
import AutorizationForm from './imports/components/autorization-form/autorization-form';
import VerificationForm from './imports/components/verification-form/verification-form';
import ParkingItem from './imports/components/parking-item/parking-item';
import ClusterLayout from './imports/components/clustering/Layout';
import ClusterMain from './imports/components/clustering/Main';
import GMapOriginal from './imports/components/scripts/GMapOriginal';
import NoMatch from './imports/components/nomatch/nomatch';

let main = ()=> {

  var pageList = [
    { path:'/', component:Index, title:'React Ionic', done:true},
    { path:'/autorization-form', component:AutorizationForm, title:'Autorization Form', done:true},
      { path:'/verification-form/:number', component:VerificationForm, title:'Verification Form', done:true},
    { path:'/parking-item/:id', component:ParkingItem, title:'Parking', done:true},
    { path:'/clustering-layout', component:ClusterLayout, title:'Clustering Layout', done:true},
    { path:'/cluster-main', component:ClusterMain, title:'ClusterMain', done:true},
    { path:'/map', component:Map, title:'Map', done:true,},
    { path:'/gmap-original', component:GMapOriginal, title:'GMapOriginal', done:true,}
  ];

  var tabRoutes;
  const pageRoutes = pageList.map(function(page) {
    if(page.childRoutes) {
      tabRoutes = page.childRoutes.map(function(cpage) {
        return <Route path={cpage.path} component={cpage.component} key={cpage.path} />;
      });
    } else {
      return <Route path={page.path} component={page.component} key={page.path} />;
    }
  });

  var PageList = pageList.map(function(page, idx, pageArray) {
    // strip the page components
    delete page.component;
    return page;
  });

  let mainRoute = (
    <Route component={Layout}>
      <IndexRoute component={Index} />
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
  ) ;
};

main();
