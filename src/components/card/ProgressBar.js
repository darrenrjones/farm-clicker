import React from 'react';
import { connect } from 'react-redux';

import Filler from './Filler';

import '../../styles/progressBar.css';

export const ProgressBar = props => {

  let displayText;

  if (props.feedChainBroken) {
    displayText = (`Feed Chain Broken`)
  } else if (props.screen === 'crops') {
    displayText = `HARVEST ${props.type.toUpperCase()}`
  } else if (props.screen === 'animals') {
    if (props.type === 'chicken') {
      displayText = 'SELL EGGS'
    } else if (props.type === 'pig') {
      displayText = 'SELL BACON'
    } else if (props.type === 'cow') {
      displayText = 'SELL MILK'
    } else {
      displayText = '?'
    }
  }

  const managerDisplay = () => {
    if (props.manager && !props.feedChainBroken) {
      return ' progress-bar-manager'
    } else if (props.manager && props.feedChainBroken) {
      return ' progress-bar-manager-broken'
    }
  }

  return (
    <div
      className={'progress-bar ' + managerDisplay()}
    >
      <div className={!props.enoughFeed || props.count < 1 ? 'progress-bar-btn-text reduce-opacity' : 'progress-bar-btn-text'}    >

        {displayText}

      </div>

      <Filler
        percentage={props.percentage}
      />
    </div>
  )
};

export default connect()(ProgressBar);