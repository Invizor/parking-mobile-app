import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Index from './imports/components/index';
import App from './imports/components/app';
import Layout from './imports/components/layouts/main';
import Map from './imports/components/map';
import AutorizationForm from './imports/components/autorization-form';
import NoMatch from './imports/components/nomatch';

let main = ()=> {

  var pageList = [
    { path:'/', component:Index, title:'React Ionic', done:true},
    { path:'/map', component:Map, title:'Map', done:true},
    { path:'/autorization-form', component:AutorizationForm, title:'Autorization Form', done:true}
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
