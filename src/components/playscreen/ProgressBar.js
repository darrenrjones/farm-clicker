import React from 'react';
import { connect } from 'react-redux';

import Filler from './Filler';

import './progressBar.css'

export const ProgressBar = props => {
  return(
    <div className='progress-bar'>
      <Filler
        percentage={props.percentage}
      />
    </div>
  )
};

export default connect()(ProgressBar);