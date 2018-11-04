import React from 'react';

import CardImg from './CardImg';

export const FeedTypeDisplay = props => {

  let feedArr = props.feed.split((/[ ,]+/));

  let feedDisplay = [];

  if (props.screen === 'animals') {

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

  }

  return (
    // feedDisplay
    <div> {feedDisplay}</div>
  )


}

export default FeedTypeDisplay;