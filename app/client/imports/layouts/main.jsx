import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { IonNavView, IonView, IonContent, IonNavBar, IonNavBackButton, IonFooterBar, IonButton, IonIcon,
         IonSideMenuContainer, IonSideMenus, IonSideMenu, IonSideMenuContent, IonPopoverButton } from 'reactionic';
//import { DemoPopover } from '../popover';
import SideMenu from '../components/side-menu/side-menu';
import UserBalance from '../components/user-balance/user-balance';
import MainTitle from '../components/main-title/main-title';
import Repository from '../storage/local-storage';
var EventEmitter = require('event-emitter');
import emitterStorage from '../storage/emitter-storage';


var Layout = React.createClass({
  contextTypes: {
    ionSnapper: React.PropTypes.object,
    ionShowPopover: React.PropTypes.func,
    ionPlatform: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object
  },
    getInitialState : function() {
      return {
          isUser: false,
          fl : false,
          userBalance: 0
      }
    },
  getPageProps: function(path) {
    var backButton = (
      <IonNavBackButton icon="ion-ios-arrow-back"
                        color= "#FFFFFF"
                        type="clear"
                        customClasses="button-stage"
                        title="Back"
      />
    );

    const balance =<UserBalance />;


    // add defaults to pageListItems

    var pageList = this.props.pageList.map(function(page) {
      page.headerTitle = <MainTitle title={page.title}/>;
      page.rightHeaderButton = balance;
      page.leftHeaderButton = backButton;
      return page
    });
    var pageProps = _.keyBy(pageList, 'path');

    // custom pageProps
      pageProps['/container'].leftHeaderButton=  null;

    return pageProps[path];
  },

    componentDidMount: function(){
        if(Repository.get_obj("token") != null && this.state.isUser == false) {
            this.setState({isUser:true});
        }
        if(Repository.get_obj("token") == null && this.state.isUser == true){
            this.setState({isUser:false});
        }
        let emitter = new EventEmitter();
        emitter.on('radiation', (flag) => {
            this.setState({fl: flag});
        });
        emitterStorage.emitter = emitter;
    },
    componentDidUnmount(){
        emitter = emitterStorage.emitter;
        emitter.off('radiation', false);
        emitterStorage.emitter = null;
    },
  render() {
    var currentPageProps = this.getPageProps(this.props.routes[this.props.routes.length - 1].path);
    return (
        <IonSideMenuContainer {...this.props}>
            <IonSideMenus>
                <IonSideMenu customClasses="side-menu">
                  <SideMenu isAutorized={this.state.fl} />
                </IonSideMenu>
            </IonSideMenus>
            <IonSideMenuContent drag-content="true">

                <IonNavBar customClasses="nav-blue"
                           title={currentPageProps.headerTitle}
                           leftButton={currentPageProps.leftHeaderButton}
                           rightButton={currentPageProps.rightHeaderButton}
                           {...this.props}
                />
                <IonContent customClasses="" {...this.props}>
                    <IonView customClasses="" {...this.props} >
                      {React.cloneElement(this.props.children, { pageList: this.props.pageList })}
                    </IonView>
                </IonContent>
            </IonSideMenuContent>
        </IonSideMenuContainer>

      /*
      <IonSideMenuContainer {...this.props}>

        <IonSideMenuContent>
          <IonNavBar customClasses="bar-dark"
                     title={currentPageProps.headerTitle}
                     leftButton={currentPageProps.leftHeaderButton}
                     rightButton={currentPageProps.rightHeaderButton}
                     {...this.props}
          />

          <IonNavView customClasses="" {...this.props}>
            <IonView customClasses="" {...this.props}>
              {React.cloneElement(this.props.children, { pageList: this.props.pageList })}
            </IonView>
          </IonNavView>
        </IonSideMenuContent>
      </IonSideMenuContainer>*/
    );
  }
});

export default Layout;
