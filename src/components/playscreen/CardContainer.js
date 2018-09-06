import React from 'react';
import { connect } from 'react-redux';

import Card from './Card';

export class CardContainer extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      wheat1Percentage: 0,
      wheat2Percentage: 0,
      wheat3Percentage: 0,
    }

  }

  render(){

    let intCall;
    const progressTickInterval = () => {     
      intCall = setInterval(progressTick,10);      
    }

    const progressTick = () => {
      if(this.state.wheat1Percentage >= 100){
        clearInterval(intCall);
        this.setState({ wheat1Percentage: 0 });

      }    
      this.setState({ wheat1Percentage: this.state.wheat1Percentage + 1 })
    }
    
    return(
      <div className='cards-container'>
      
      <Card 
        wheat1Percentage={this.state.wheat1Percentage}
        progressTickInterval={progressTickInterval}
      />


      </div>
    )
  }








}

export default connect()(CardContainer);