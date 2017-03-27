import React, {PropTypes, Component} from 'react';
import Repository from '../../storage/local-storage';
import './user-balance.scss';
import createHashHistory from 'history/lib/createHashHistory';

class UserBalance extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      userBalance: null
    };
  }

  componentWillReceiveProps(nextProps){
    this.render();
  }

  componentWillMount() {
    let userBalance;
    if (Repository.get_obj('user') && Repository.get_obj('user').wallet) {
      userBalance = Repository.get_obj('user').wallet + ' руб.'
    } else {
      userBalance = null
    }
    this.setState({userBalance: userBalance});
  }

  showBalancePage() {
    let history = createHashHistory();
    history.push('/set-balance/');
  }

  render() {
    return (
      <div className="user-balance">
        {this.state.userBalance ? <div onClick={()=>this.showBalancePage()}>{this.state.userBalance}</div> : ''}
      </div>
    );
  }
}

export default UserBalance;