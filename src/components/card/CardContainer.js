import React from 'react';
import { connect } from 'react-redux';

import {incrementCrop, buyCrop} from '../../actions/crops';

import ProgressBar from './ProgressBar';
import CropImg from './CropImg';

import '../../styles/card-container.css';

export class CardContainer extends React.Component {
  constructor(props){
    super(props)    
    this.state = {
      percentage: 0,
      ticking: false,
    }
  }

  render(){
    let intCall;
    let field = this.props.field;

    const currentCrop = this.props.crops.find(crop => crop.type === field)
    const count = currentCrop.count;
     

    const progressTickInterval = () => {
      this.setState({ticking: true}) // disabled button while progress bar filling     
      intCall = setInterval(progressTick, (currentCrop.count+7 + currentCrop.count*4));      
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
      if(currentCrop.count < 9){
        this.props.dispatch(buyCrop(field));
      } 
    }

    // const count = this.props.crops[field].count;
    let cropImages = [];        
    for (let i = 1; i <= count; i++) {               
      cropImages.push(
        <CropImg 
          source={`${this.props.type}`} 
          screen={`${this.props.screen}`}
          key={`crop-index-${i}`} 
        />
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

          {/* nested ternary to check card's 'screen' prop to render proper button text */}
          <button onClick={progressTickInterval} disabled={this.state.ticking || currentCrop.count < 1} >
            {this.props.screen === 'crops' ? 
              'HARVEST ' : this.props.screen === 'animal' ?
                'FEED ' : this.props.screen === 'menu' ?
                  'menu ' : null}                   
            {this.props.type.toUpperCase()}
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
  crops: state.crops.crops
});

export default connect(mapStateToProps)(CardContainer);