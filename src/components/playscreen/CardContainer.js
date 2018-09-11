import React from 'react';
import { connect } from 'react-redux';

import {incrementWheat} from '../../actions/crops';

import Card from './Card';

export class CardContainer extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      percentage: 0,
      count: 1,
    }

  }

  render(){

    let intCall;
    let cropCount = this.state.count;

    const progressTickInterval = () => {     
      intCall = setInterval(progressTick,10);      
    }

    //progressTick increments percentage of progress bar to fill
    //when it fills then incrementCrop is called
    const progressTick = () => {
      if(this.state.percentage >= 100){
        clearInterval(intCall);
        this.setState({ percentage: 0 });
        this.props.dispatch(incrementWheat(cropCount))
      }    
      this.setState({ percentage: this.state.percentage + 1 });

    }
    
    return(
      <div className='cards-container'>
          <div className='image-box'>
            <img 
              src={require('../../images/crops/wheatSmall.png')}
              alt='icon of wheat'
              className='small-crop-icon'
            /> 
          </div>
      
        <Card 
          percentage={this.state.percentage}
          progressTickInterval={progressTickInterval}
          type={this.props.type}
        />


      </div>
    )
  } 







}

export default connect()(CardContainer);