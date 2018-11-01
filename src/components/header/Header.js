import React from 'react';
import { connect } from 'react-redux';

import { clearAuth } from '../../actions/auth';
import { save, setLastLogout } from '../../actions/user';
import { clearAuthToken } from '../../local-storage'

import '../../styles/header.css';

export class Header extends React.Component {

  logout = () => {
    let timeStamp = Math.floor(Date.now() / 1000); //seconds
    this.props.dispatch(setLastLogout(timeStamp));
    this.props.dispatch(save()) //autosave when logout
    this.props.dispatch(clearAuth())
    clearAuthToken()
  }

  render() {
    return (
      <div className='header-container'>
        <div className='logo'></div>

        <div className='cash-display'>
          {/* {this.props.currentUser ? <span>{this.props.currentUser.username}</span> : ''}<br></br> */}
          {/* {this.props.currentUser ? <span>{this.props.currentUser.farmname}</span> : ''}<br></br> */}
          ${this.props.currentUser ? <span>{this.props.currentUser.cash}</span> : ''}
        </div>

        <button onClick={this.logout}>logout</button>


      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);