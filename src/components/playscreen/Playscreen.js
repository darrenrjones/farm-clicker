import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage'
import {Header} from '../header/Header';
// import CardContainer from './CardContainer';
import CardContainer from '../card/CardContainer';

export class Playscreen extends React.Component {
    componentDidMount() {
        // this.props.dispatch(refreshAuthToken());
    }
  
    render() {
    const logout = () => {
        console.log('logout clicked');
        
        this.props.dispatch(clearAuth());
        clearAuthToken();
    };

      if (!this.props.currentUser) {
        return <Redirect to='/' />;
      }
        return (
          <div className='playscreen-div'>

            <Header />

            <div >
                Username: {this.props.currentUser ? <span>{this.props.currentUser.username}</span> : '' }
            </div>
            <button onClick={logout}>logout</button>

            <div className='inventory'>
                Wheat: {this.props.crops.wheat}<br></br>
                Corn: {this.props.crops.corn}<br></br>
            </div>


            <div className='playscreen-container'>                

                <CardContainer 
                    type='wheat'
                />
         
            </div>

          </div>
        );
    }
}

const mapStateToProps = state => ({   
    currentUser: state.auth.currentUser,
    crops: state.crops
});

export default connect(mapStateToProps)(Playscreen);
