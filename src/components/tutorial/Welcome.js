import React from 'react'

import '../../styles/tutorial.css';

export const Welcome = props => {
  return (
    <div className={`tutorial-modal ${props.tutorialOn && props.message ? 'visible' : ''}`}>
      <div className='tutorial-modal-content'>
        <p>{props.message}</p>
        <button onClick={props.closeTutorial}>OK</button>
      </div>
    </div>
  )
}

export default Welcome;