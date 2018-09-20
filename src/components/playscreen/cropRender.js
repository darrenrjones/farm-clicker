import React from 'react';
import CardContainer from '../card/CardContainer';


export const CropRender = () => {
  return(
    
    <div className='crops9-container'> 
                  <CardContainer 
                      type='wheat'
                      field='wheat1'                    
                      screen='crops'
                  />
                  <CardContainer 
                      type='wheat'
                      field='wheat2'
                      screen='crops'
                  />
                  <CardContainer 
                      type='wheat'
                      field='wheat3'
                      screen='crops'
                  />
                  <CardContainer 
                      type='corn'
                      field='corn1'
                      screen='crops'
                  />
                  <CardContainer 
                      type='corn'
                      field='corn2'
                      screen='crops'
                  />
                  <CardContainer 
                      type='corn'
                      field='corn3'
                      screen='crops'
                  />
                  <CardContainer 
                      type='soy'
                      field='soy1'
                      screen='crops'
                  />
                  <CardContainer 
                      type='soy'
                      field='soy2'
                      screen='crops'
                  />
                  <CardContainer 
                      type='soy'
                      field='soy3'
                      screen='crops'
                  />         
              </div>
  )
}