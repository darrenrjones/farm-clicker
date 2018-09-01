import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { refreshAuthToken } from '../actions/auth';

import {Header} from './header/Header';

export class Playscreen extends React.Component {
    componentDidMount() {
        // this.props.dispatch(refreshAuthToken());
    }

    render() {
      if (!this.props.currentUser) {
        return <Redirect to='/' />;
      }
        return (
          <div>
            <Header />
            <div className='playscreen-container'>
                <div >
                    Username: {this.props.currentUser ? <span>{this.props.currentUser.username}</span> : '' }
                </div>
         
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({   
    currentUser: state.auth.currentUser  
});

// const mapStateToProps = state => {
//   const {currentUser} = state.auth;
//   return {
//       username: state.auth.currentUser.username,
//       name: `${currentUser.firstName} ${currentUser.lastName}`,
//       protectedData: state.protectedData.data
//   };
// };

export default connect(mapStateToProps)(Playscreen);
