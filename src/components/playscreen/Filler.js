import React from 'react';
import { connect } from 'react-redux';


export const Filler = props => {
  return(
    <div 
      className="filler" 
      style={{ width: `${props.percentage}%` }} 
    />
   
  ) 
};

export default connect()(Filler);