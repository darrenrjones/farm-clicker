import React from 'react';
import { connect } from 'react-redux';

import {incrementCrop} from '../../actions/crops';

import ProgressBar from './ProgressBar';
import CropImg from './CropImg';

import '../../styles/card.css';

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
    // let cropCountDisplay;

    const progressTickInterval = () => {     
      intCall = setInterval(progressTick,10);      
    }

    //progressTick increments percentage of progress bar to fill
    //when it fills then incrementCrop is called
    const progressTick = () => {
      if(this.state.percentage >= 100){
        clearInterval(intCall);
        this.setState({ percentage: 0 });
        this.props.dispatch(incrementCrop('wheat1'))
        
      }    
      this.setState({ percentage: this.state.percentage + 1 });
    }

    // const cropCountDisplayFunction = () => {
    //   for (let i = 0; i <= this.state.count; i++) {
    //     cropCountDisplay = (
    //       <CropImg 
    //         source='wheatSmall'
    //       />
    //     )
    //   }
    // }
    
    return(
      
      <div className='cards-container'>

        <div className='image-box'>
          <CropImg 
            source={`${this.props.type}Small`}
          />
          <CropImg 
            source={`${this.props.type}Small`}
          />
        </div>
    
        <div className='progress-bar-container'>
          <ProgressBar 
            percentage={this.state.percentage}
          />

          <button onClick={progressTickInterval}>
            HARVEST {this.props.type.toUpperCase()}
          </button> 
        </div>

      </div>
    )
  } 







}

export default connect()(CardContainer);