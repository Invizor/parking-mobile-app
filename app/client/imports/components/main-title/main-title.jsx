import React, {PropTypes, Component} from 'react';
import {IonSpinner} from 'reactionic';
import {findDOMNode} from 'react-dom';
import './main-title.scss';

class UserBalance extends React.Component {

  componentDidMount() {
    setTimeout(()=>{
      if (this.props.title === "Parkimon") {
        const mySpinner = findDOMNode(this.refs.mySpinner);
        console.log('mySpinner', mySpinner);
        mySpinner.style.display= 'none';
      }
    }, 3000);
  }

  render() {
    return (
      <div className="main-title">
        {this.props.title}
        {
          this.props.title === "Parkimon" ?
          <span className="mySpinner" ref="mySpinner"><IonSpinner icon="spiral"/></span>
          :
          ''
        }
      </div>
    );
  }
}

export default UserBalance;