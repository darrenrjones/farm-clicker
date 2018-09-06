import React from 'react';
import { connect } from 'react-redux';

import ProgressBar from './ProgressBar';

import './card.css';


export const Card = props => {
  return(
    <div className='card-individual'>

      <div className='image-box'>
        <img 
          src={require('../../images/crops/wheatSmall.png')}
          alt='icon of wheat'
          className='small-crop-icon'
        />        <img 
        src={require('../../images/crops/wheatSmall.png')}
        alt='icon of wheat'
        className='small-crop-icon'
      />        <img 
      src={require('../../images/crops/wheatSmall.png')}
      alt='icon of wheat'
      className='small-crop-icon'
    />        <img 
    src={require('../../images/crops/wheatSmall.png')}
    alt='icon of wheat'
    className='small-crop-icon'
  />        <img 
  src={require('../../images/crops/wheatSmall.png')}
  alt='icon of wheat'
  className='small-crop-icon'
/>        <img 
          src={require('../../images/crops/wheatSmall.png')}
          alt='icon of wheat'
          className='small-crop-icon'
        />        <img 
        src={require('../../images/crops/wheatSmall.png')}
        alt='icon of wheat'
        className='small-crop-icon'
      />
              <img 
          src={require('../../images/crops/wheatSmall.png')}
          alt='icon of wheat'
          className='small-crop-icon'
        />
                <img 
          src={require('../../images/crops/wheatSmall.png')}
          alt='icon of wheat'
          className='small-crop-icon'
        />

      </div>
     

      <ProgressBar 
        percentage={props.wheat1Percentage}
      />

      <button onClick={props.progressTickInterval}>
        HARVEST
      </button> 

    </div>
  )
};

export default connect()(Card);