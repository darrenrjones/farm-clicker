import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearAuthToken } from '../../local-storage'
//components
import {Header} from '../header/Header';
import {CropRender} from '../playscreen/cropRender';
import {AnimalRender} from '../playscreen/animalRender';

//actions
import { clearAuth } from '../../actions/auth';
import { save } from '../../actions/user';


import '../../styles/playscreen.css';

export class Playscreen extends React.Component {
    constructor(props){
        super(props)    
        this.state = {
          screenDisplay: 'farmView'      
        }
      }
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
    const animalRender = () => {
        this.setState({ screenDisplay : 'animalView'})
    }
    const farmRender = () => {
        this.setState({ screenDisplay : 'farmView'})
    }

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
            <br></br>
            <button onClick={animalRender}>animalRender</button>
            <br></br>
            <button onClick={farmRender}>farmRender</button>
            <span>view: {this.state.screenDisplay}</span>


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

            <CropRender />
            {/* <AnimalRender /> */}


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
