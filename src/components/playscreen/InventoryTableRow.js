import React from 'react';

import CardImg from '../card/CardImg';

export const InventoryTableRow = props => {

  const roundToTwo = num => {
    return (Math.round(num * 100) / 100);
  }
  return (
    <div className='inventory-table inventory-table-row inventory-table--4cols'>

      <div class="inventory-table-cell-icon">
        {/* <h3>{props.name}</h3> */}
        <CardImg
          screen={props.screen}
          source={props.source}
          imgClass={'inventory-icon'}
        />    
      </div>

      <div class="inventory-table-cell">{props.inventoryName}</div>
      <div class="inventory-table-cell">+{roundToTwo(props.productionCall)}</div>
      <div class="inventory-table-cell">-{roundToTwo(props.consumptionCall)}</div>

    </div>
  )
}

export default InventoryTableRow;