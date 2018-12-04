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

      <div className="inventory-table-cell">{props.inventoryCount}</div>
      <div className="inventory-table-cell">+{roundToTwo(props.productionAmount)}</div>
      <div className="inventory-table-cell">-{roundToTwo(props.consumptionAmount)}</div>

    </div>
  )
}

export default InventoryTableRow;