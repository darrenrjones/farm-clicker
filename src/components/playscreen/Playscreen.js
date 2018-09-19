import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearAuthToken } from '../../local-storage'
//components
import {Header} from '../header/Header';
import CardContainer from '../card/CardContainer';

//actions
import { clearAuth } from '../../actions/auth';
import { save } from '../../actions/user';


import '../../styles/playscreen.css';

export class Playscreen extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(refreshAuthToken());
    // }
    componentDidUpdate(prevProps) {
        if(this.props.authToken !== prevProps.authToken){
            console.log('it changed')
        }
    }
  
    render() {
    const logout = () => {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    };
    const saveState = () => {
        this.props.dispatch(save());
    };

      if (!this.props.currentUser) {
        return <Redirect to='/' />;
      }
        return (
          <div className='playscreen-div'>
          
            <Header 
                currentUser={this.props.currentUser}
            />

            <button onClick={logout}>logout</button>
            <button onClick={saveState}>save</button>


            <div className='inventory'>  
                Wheat: {
                    this.props.crops[0].total +
                    this.props.crops[1].total +
                    this.props.crops[2].total
                    }<br></br>
                Corn: {
                    this.props.crops[3].total +
                    this.props.crops[4].total +
                    this.props.crops[5].total
                    }<br></br>                
                Soy: {
                    this.props.crops[6].total +
                    this.props.crops[7].total +
                    this.props.crops[8].total
                    }<br></br>
                {/* Alfalfa: {this.props.crops.alfalfa.total}<br></br> */}
                {/* Hay: {this.props.crops.hay.total}<br></br> */}
                {/* Fishfood: {this.props.crops.fishfood.total}<br></br>                 */}
            </div>


            <div className='crops9-container'> 
                <CardContainer 
                    type='wheat'
                    field='wheat1'                    
                />
                <CardContainer 
                    type='wheat'
                    field='wheat2'
                />
                <CardContainer 
                    type='wheat'
                    field='wheat3'
                />
                <CardContainer 
                    type='corn'
                    field='corn1'
                />
                <CardContainer 
                    type='corn'
                    field='corn2'
                />
                <CardContainer 
                    type='corn'
                    field='corn3'
                />
                <CardContainer 
                    type='soy'
                    field='soy1'
                />
                <CardContainer 
                    type='soy'
                    field='soy2'
                />
                <CardContainer 
                    type='soy'
                    field='soy3'
                />         
            </div>

          </div>
        );
    }
}

const mapStateToProps = state => ({   
    currentUser: state.user.currentUser,
    crops: state.crops.crops,
    authToken: state.auth.authToken

});

export default connect(mapStateToProps)(Playscreen);
