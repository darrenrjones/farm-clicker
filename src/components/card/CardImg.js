import React from 'react';
import { connect } from 'react-redux';


export const CropImg = props => {
  return (
    <img
      src={require(`../../images/${props.screen}/${props.source}.png`)}
      alt={`icon of ${props.source}`}
      className={props.imgClass}
      title={props.source}
    />
  )
};

export default connect()(CropImg);