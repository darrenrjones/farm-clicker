import React from 'react';
import CardContainer from '../card/CardContainer';


export const AnimalRender4 = props => {
  return (
      <div className={
        'cards4-container ' + (props.screenDisplay === 'cropsView' ? 'display-invisible' : '')
      }>

        <CardContainer
          type='cow'
          field='cow1'
          screen='animals'
          feed='corn soy'
          screenDisplay={props.screenDisplay}
          managerDisplay={props.managerDisplay}
        />
        <CardContainer
          type='cow'
          field='cow2'
          screen='animals'
          feed='corn soy'
          screenDisplay={props.screenDisplay}
          managerDisplay={props.managerDisplay}
        />

        <CardContainer
          type='goat'
          field='goat1'
          screen='animals'
          feed='wheat corn soy clover'
          screenDisplay={props.screenDisplay}
          managerDisplay={props.managerDisplay}
        />
        <CardContainer
          type='fish'
          field='fish1'
          screen='animals'
          feed='fishfood'
          screenDisplay={props.screenDisplay}
          managerDisplay={props.managerDisplay}
        />



      </div>
  )
}