import React from 'react';
import { connect } from 'react-redux';

import {incrementCrop, buyCrop} from '../../actions/crops';

import ProgressBar from './ProgressBar';
import CropImg from './CropImg';

import '../../styles/card.css';

export class CardContainer extends React.Component {
  constructor(props){
    super(props)    
    this.state = {
      percentage: 0      
    }
  }

  render(){
    let intCall;
    let field = this.props.field;

    const progressTickInterval = () => {     
      intCall = setInterval(progressTick,10);      
    }

    //progressTick increments percentage of progress bar to fill
    //when it fills then incrementCrop is called
    const progressTick = () => {
      if(this.state.percentage >= 100){
        clearInterval(intCall);
        this.setState({ percentage: 0 }); 
        this.props.dispatch(incrementCrop(field))
      }    
      this.setState({ percentage: this.state.percentage + 1 });
    }

    const incrementFieldCount = (field) => {      
      this.props.dispatch(buyCrop(field));
    }

    const count = this.props.crops[field].count;
    let cropImages = [];        
    for (let i = 1; i <= count; i++) {               
      cropImages.push(
        <CropImg source={`${this.props.type}`} />
      );         
    }      
    
    return(
      
      <div className='cards-container'>

        <div className='image-box'>          
          {cropImages}
        </div>
    
        <div className='progress-bar-container'>
          <ProgressBar 
            percentage={this.state.percentage}
          />

          <button onClick={progressTickInterval}>
            HARVEST {this.props.type.toUpperCase()}
          </button> 

          <button onClick={() => incrementFieldCount(this.props.field)}>
            PLANT {this.props.type.toUpperCase()}
          </button>
          <p>
          count: {this.props.crops[field].count}
          </p>
        </div>

      </div>
    )
  } 

}

const mapStateToProps = state => ({
  crops: state.crops.crops
});

export default connect(mapStateToProps)(CardContainer);