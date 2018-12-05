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



{/* <div className={'card-icons-box ' + (this.props.managerDisplay ? 'gray-scale reduce-opacity' : '')}>
  {cardImages}
</div> */}