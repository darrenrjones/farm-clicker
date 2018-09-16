import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage'
import {Header} from '../header/Header';
// import CardContainer from './CardContainer';
import CardContainer from '../card/CardContainer';

import '../../styles/playscreen.css';

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
          
            <Header 
                currentUser={this.props.currentUser}
            />

            <button onClick={logout}>logout</button>

            <div className='inventory'>  
                Wheat: {
                    this.props.crops.wheat1.total +
                    this.props.crops.wheat2.total +
                    this.props.crops.wheat3.total
                    }<br></br>
                Corn: {
                    this.props.crops.corn1.total +
                    this.props.crops.corn2.total +
                    this.props.crops.corn3.total
                    }<br></br>                
                Soy: {
                    this.props.crops.soy1.total +
                    this.props.crops.soy2.total +
                    this.props.crops.soy3.total
                    }<br></br>
                Alfalfa: {this.props.crops.alfalfa.total}<br></br>
                Hay: {this.props.crops.hay.total}<br></br>
                Fishfood: {this.props.crops.fishfood.total}<br></br>                
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
    currentUser: state.auth.currentUser,
    crops: state.crops.crops
});

export default connect(mapStateToProps)(Playscreen);
