import React from 'react';
import { connect } from 'react-redux';

import {incrementCrop, buyCrop, increaseTickInterval} from '../../actions/crops';

import ProgressBar from './ProgressBar';
import CropImg from './CropImg';

import '../../styles/card-container.css';

export class CardContainer extends React.Component {
  constructor(props){
    super(props)    
    this.state = {
      percentage: 0,
      ticking: false,
      tickInterval: props.interval      
    }
  }

  render(){
    let intCall;
    let field = this.props.field;

    const currentCrop = this.props.crops.find(crop => crop.type === field)
    const count = currentCrop.count;
     

    const progressTickInterval = () => {
      this.setState({ticking: true}) // disabled button while progress bar filling     
      // intCall = setInterval(progressTick, this.props.crops[field].tickInterval);    
      intCall = setInterval(progressTick, this.props.crops);      
  
    }

    //progressTick increments percentage of progress bar to fill
    //when it fills then incrementCrop is called
    const progressTick = () => {
      if(this.state.percentage >= 100){
        clearInterval(intCall);
        this.setState({ percentage: 0, ticking: false }); 
        this.props.dispatch(incrementCrop(field));
      }    
      this.setState({ percentage: this.state.percentage + 1 });
    }


    //increment count by 1 and increase tickInterval by 8 ms
    const incrementFieldCount = (field) => {  
      // if(this.props.crops[field].count < 9){
      //   this.props.dispatch(buyCrop(field));
      //   this.props.dispatch(increaseTickInterval(field));
      // }   
      if(currentCrop.count < 9){
        this.props.dispatch(buyCrop(field));
        this.props.dispatch(increaseTickInterval(field));
      } 
    }

    // const count = this.props.crops[field].count;
    let cropImages = [];        
    for (let i = 1; i <= count; i++) {               
      cropImages.push(
        <CropImg source={`${this.props.type}`} key={`crop-index-${i}`} />
      );
    }      
    
    return(
      
      <div className='card-container'>

        <div className='image-box'>          
          {cropImages}
        </div>
    
        <div className='progress-bar-container'>
          <ProgressBar 
            percentage={this.state.percentage}
          />

          <button onClick={progressTickInterval} disabled={this.state.ticking /*|| this.props.crops[field].count < 1*/} >
            HARVEST {this.props.type.toUpperCase()}
          </button> 

          <button onClick={() => incrementFieldCount(this.props.field)}>
            PLANT {this.props.type.toUpperCase()}
          </button>

        </div>

      </div>
    )
  } 

}

const mapStateToProps = state => ({
  crops: state.crops.crops1
});

export default connect(mapStateToProps)(CardContainer);