import React from 'react';
import { connect } from 'react-redux';


export const CropImg = prop => {
  return(
      <img 
        src={require(`../../images/${prop.screen}/${prop.source}.png`)}
        alt={`icon of ${prop.source}`}
        className='small-crop-icon'
      />
  ) 
};

export default connect()(CropImg);