import React from 'react';

import CardImg from '../card/CardImg';

export const InventoryTableRow = props => {

  const roundToTwo = num => {
    return (Math.round(num * 100) / 100);
  }
  return (
    <div className='inventory-table inventory-table-row'>

      <div className="inventory-table-cell-icon">
        <CardImg
          screen={props.screen}
          source={props.source}
          imgClass={'inventory-icon'}
        />    
      </div>

      <div className="inventory-table-cell">{props.inventoryName}</div>
      <div className="inventory-table-cell">+{roundToTwo(props.productionCall)}</div>
      <div className="inventory-table-cell">-{roundToTwo(props.consumptionCall)}</div>

    </div>
  )
}

export default InventoryTableRow;