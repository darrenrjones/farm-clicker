import React from 'react';
import { connect } from 'react-redux';

import ProgressBar from './ProgressBar';

import './card.css';


export const Card = props => {
  return(
    <div className='card-individual'>
    
      <div className='progress-bar-container'>
        <ProgressBar 
          percentage={props.percentage}
        />

        <button onClick={props.progressTickInterval}>
          HARVEST {props.type.toUpperCase()}
        </button> 
      </div>

    </div>
  )
};

export default connect()(Card);