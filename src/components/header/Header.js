import React from 'react';
import { connect } from 'react-redux';

export class Header extends React.Component{

  render(){
    return(
      <div className='header-container'>
        <h1>Farm Clicker Banner</h1>

        <div className='right-side-header'>
    
          <div className={this.props.user ? 'signedin-div signedin' : 'signedin-div'}>
            {this.props.authToken ? <span>{this.props.currentUser.username}</span> : <span></span>}
          </div>   

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  authToken: state.auth.authToken

});

export default connect(mapStateToProps)(Header);