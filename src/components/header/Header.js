import React from 'react';
import { connect } from 'react-redux';

import { clearAuth, clearLoading } from '../../actions/auth';
import { save, setLastLogout, toggleTutorial, setMessage } from '../../actions/user';
import { clearAuthToken } from '../../local-storage'

import '../../styles/header.css';

export class Header extends React.Component {

  logout = () => {
    let timeStamp = Math.floor(Date.now() / 1000); //seconds
    this.props.dispatch(setLastLogout(timeStamp));
    this.props.dispatch(save()); //autosave when logout
    this.props.dispatch(clearAuth());
    this.props.dispatch(clearLoading());

    clearAuthToken()
  }
  componentDidMount() {
    this.props.dispatch(setMessage(this.props.currentUser.seenMessage));

  }

  render() {
    return (
      <div className='header-container'>
        <div className='logo'></div>

        <div className='screenDisplay-manager-buttons-container'>
          <button className="screenDisplay-button" onClick={this.props.screenDisplay === 'cropsView' ? this.props.animalsRender : this.props.cropsRender}>
            {this.props.screenDisplay === 'cropsView' ? <div>Animals</div> : <div>Crops</div>}
          </button>

          <button className="manager-view-toggle-button"
            onClick={this.props.toggleManagerView}> Store
          </button>

          <button
            className={this.props.currentUser.seenMessage > 5 ? 'display-invisible' : ''}
            onClick={() => this.props.dispatch(toggleTutorial())}
          >
            help
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