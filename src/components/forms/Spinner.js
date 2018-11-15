import React from 'react';

import '../../styles/spinner.css';
// credit http://tobiasahlin.com/spinkit/

export const Spinner = () => {
  return (
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  )
}

export default Spinner;