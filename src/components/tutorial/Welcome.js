import React from 'react'

import '../../styles/modal.css';

export const Welcome = props => {
  return (
    <div className={'tutorial-modal '}>
      <div className='tutorial-modal-content'>
        this is a modal div from totoiral/Welcome
      </div>
    </div>
  )
}

export default Welcome;

//tutorial landmarks
// 5 wheat
// 5 eggs/ $5
// wheat1.count == 2
// cash >= 50 or whatever equals buying a manager
// manager purchased -> tutorial complete


{/* <div className={'card-icons-box ' + (this.props.managerDisplay ? 'gray-scale reduce-opacity' : '')}>
  {cardImages}
</div> */}