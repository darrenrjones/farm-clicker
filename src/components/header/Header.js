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

        <div className='screenDisplay-manager-buttons-container'>
          <button className="screenDisplay-button" onClick={this.props.screenDisplay === 'cropsView' ? this.props.animalsRender : this.props.cropsRender}>
            {this.props.screenDisplay === 'cropsView' ? <div>animals</div> : <div>crops</div>}
          </button>

          <button className="manager-view-toggle-button"
            onClick={this.props.toggleManagerView}>manager
          </button>
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