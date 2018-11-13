import React from 'react';
// import { connect } from 'react-redux';

import Filler from './Filler';

import '../../styles/progressBar.css';

export const ProgressBar = props => {

  let displayText;

  if (props.feedChainBroken) {
    displayText = (`Feed Chain Broken`)
  } else if (props.screen === 'crops') {
    if (props.type === 'fishfood') {
      displayText = `MAKE ${props.type.toUpperCase()}`
    }
    displayText = `HARVEST ${props.type.toUpperCase()}`
  } else if (props.screen === 'animals') {
    if (!props.enoughFeed) {
      displayText = 'not enough feed'
    } else if (props.type === 'chicken') {
      displayText = 'SELL EGGS'
    } else if (props.type === 'pig') {
      displayText = 'SELL BACON'
    } else if (props.type === 'cow') {
      displayText = 'SELL MILK'
    } else if (props.type === 'sheep') {
      displayText = 'SELL WOOL'
    } else if (props.type === 'goat') {
      displayText = 'SELL GOAT CHEESE'
    } else if (props.type === 'fish') {
      displayText = 'SELL FILLET'
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
      <div className={!props.enoughFeed || props.count < 1 ? 'progress-bar-btn-text reduce-opacity' : 'progress-bar-btn-text'} >

        {displayText}

      </div>

      <Filler
        percentage={props.percentage}
      />
    </div>
  )
};

export default ProgressBar;