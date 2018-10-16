import React from 'react';
import { connect } from 'react-redux';

import Filler from './Filler';

import '../../styles/progressBar.css';

export const ProgressBar = props => {
  let displayText;
  if (props.screen === 'crops') {
    displayText = `HARVEST ${props.type.toUpperCase()}`
  } else if (props.screen === 'animals') {
    if (props.type === 'chicken') {
      displayText = 'SELL EGGS'
    } else if (props.type === 'pig'){
      displayText = 'SELL BACON'
    } else if (props.type === 'cow'){
      displayText = 'SELL MILK'
    } else {
      displayText = '?'
    }
  }
  return (
    <div
    className={'progress-bar ' +  (props.count < 1 || props.ticking || !props.enoughFeed ? 'disabled-progress-bar-action' : '') + (props.manager ? 'progress-bar-manager' : '')}

      // className={props.count < 1 || props.ticking || !props.enoughFeed ? 'disabled-progress-bar-action progress-bar' : 'progress-bar'}
      onClick={props.action}
      // <div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}>
    >
      <div className={!props.enoughFeed || props.count < 1 ? 'progress-bar-btn-text disabled-progress-bar-text' : 'progress-bar-btn-text'}    >

        {displayText}           

      </div>

      <Filler
        percentage={props.percentage}
        manager={props.manager}
      />
    </div>
  )
};

export default connect()(ProgressBar);