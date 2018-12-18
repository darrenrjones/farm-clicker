import React from 'react';

import CardImg from './CardImg';
import consumptionMap from '../../actions/helpers/consumptionMap';

export const FeedTypeDisplay = props => {

  let feedArr = props.feed.split((/[ ,]+/));

  let feedDisplay = [];

  for (let i = 0; i < feedArr.length; i++) {
    feedDisplay.push(
      <CardImg
        screen={'crops'}
        source={feedArr[i]}
        imgClass={'tiny-crop-icon'}
        key={`crop-index-${i}`}

      />
    );
  }

  return (
    // feedDisplay
    <div className='feed-type-card-display'>
      <div>{props.type} consumption:</div>
      <div className='feed-type-card-display-icons'>{consumptionMap[props.type].consumption}x{feedDisplay} </div>
    </div>
  )


}

export default FeedTypeDisplay;