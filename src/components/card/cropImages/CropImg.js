import React from 'react';
import { connect } from 'react-redux';


export const CropImg = prop => {
  return(
    <div>
      <img 
        src={require(`../../../images/crops/${prop.source}.png`)}
        alt={`icon of ${prop.source}`}
        className='small-crop-icon'
      />
    </div>   
  ) 
};

export default connect()(CropImg);