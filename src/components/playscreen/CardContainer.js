import React from 'react';
import { connect } from 'react-redux';

import ProgressBar from './ProgressBar';


export class CardContainer extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      percentage: 0
    }

  }

  render(){
    const progressTickInterval = () => {
      console.log("tickIntervale called");
      if(this.state.percentage >= 100){
        resetProgressBar();
      }
      
      setInterval(() => progressTick(), 10);
    }

    const progressTick = () => {
      console.log('progressTick called');
      
      if(this.state.percentage === 100) return
    
      this.setState({ percentage: this.state.percentage + 5 })
    }

    const resetProgressBar = () => {
      this.setState({ percentage: 0 })
    }
    
    return(
      <div>
        <h1>here it is</h1>
        <ProgressBar 
          percentage={this.state.percentage}
        />
        <div>  
          <button onClick={() => progressTickInterval()}>
            click here!
          </button>  
        </div>
      </div>
    )
  }








}

export default connect()(CardContainer);