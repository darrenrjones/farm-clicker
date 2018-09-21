import React from 'react';
import { connect } from 'react-redux';

import Filler from './Filler';

import '../../styles/progressBar.css';

export const ProgressBar = props => {
  return (
    <div 
      className={props.count < 1 || props.ticking ? 'disabled-progress-bar-action progress-bar' : 'progress-bar'}
      onClick={props.action}
    >
      <div className='progress-bar-btn-text'>
        {/* nested ternary to check card's 'screen' prop to render proper button text */}
        {props.screen === 'crops' ?
              'HARVEST ' : props.screen === 'animals' ?
                'FEED ' : props.screen === 'menu' ?
                  'menu ' : null}
        {props.type.toUpperCase()}
      </div>
      
      <Filler
        percentage={props.percentage}
      />
    </div>
  )
};

export default connect()(ProgressBar);