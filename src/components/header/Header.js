import React from 'react';
import { connect } from 'react-redux';

export class Header extends React.Component{

  render(){
    return(
      <div className='header-container'>
        <h1>Farm Clicker Banner</h1>

        <div className='right-side-header'> 
          {this.props.currentUser ? <span>{this.props.currentUser.username}</span> : '' }<br></br>
          {this.props.currentUser ? <span>{this.props.currentUser.farmname}</span> : '' }<br></br>
          ${this.props.currentUser ? <span>{this.props.currentUser.cash}</span> : '' }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({   
  currentUser: state.auth.currentUser  
});

export default connect(mapStateToProps)(Header);