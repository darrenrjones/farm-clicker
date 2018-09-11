import {
  INCREMENT_CROP,
  BUY_CROP
} from '../actions/crops';

const initialState = {
  // crops: [
  //   {name: 'wheat1', count: 1, total: 4},
  //   {name: 'wheat2', count: 0, total: 2},
  //   {name: 'wheat3', count: 0, total: 1},
  //   {name: 'corn1', count: 0, total: 0},
  //   {name: 'corn2', count: 0, total: 0},
  //   {name: 'corn3', count: 0, total: 0},
  //   {name: 'soy1', count: 0, total: 0},
  //   {name: 'soy2', count: 0, total: 0},
  //   {name: 'soy3', count: 0, total: 0},
  //   {name: 'alfalfa', count: 0, total: 0},
  //   {name: 'hay', count: 0, total: 0},
  //   {name: 'fishfood', count: 0, total: 0},    
  // ]

    wheat1 : {
      count: 1,
      total: 1
    },
    wheat2 : {
      count: 0,
      total: 3
    },
    wheat3 : {
      count: 0,
      total: 7
    },
    corn : {
      count: 0,
      total: 0
    },
    corn2 : {
      count: 0,
      total: 0
    },
    corn3 : {
      count: 0,
      total: 0
    },
    soy : {
      count: 0,
      total: 0
    },
    soy2 : {
      count: 0,
      total: 0
    },
    soy3 : {
      count: 0,
      total: 0
    },
    alfalfa : {
      count: 0,
      total: 0
    },
    hay : {
      count: 0,
      total: 0
    },
    fishfood : {
      count: 0,
      total: 0
    },
 
  
}

export default (state=initialState, action) => {

  if(action.type === INCREMENT_CROP) {
    // const currentCrop = state.crops.find(cCrop => cCrop.name === action.crop)
    // const index = state.crops.indexOf(currentCrop);    
    return {
      ...state,  
    }
  }
  
  return state;
}