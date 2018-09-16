import {
  INCREMENT_CROP,
  BUY_CROP,
  INCREASE_TICK_INTERVAL
} from '../actions/crops';

import {AUTH_SUCCESS} from '../actions/auth';

const initialState = {

  crops1: null,
  crops:{

    wheat1 : {
      count: 9,
      total: 1,
      price: 5,
      tickInterval:1
    },
    wheat2 : {
      count: 0,
      total: 0,
      price: 5,
      tickInterval:1
    },
    wheat3 : {
      count: 3,
      total: 7,
      price: 5,
      tickInterval:1
    },
    corn1 : {
      count: 9,
      total: 1,
      price: 5,
      tickInterval:1
    },
    corn2 : {
      count: 0,
      total: 0,
      price: 5,
      tickInterval:1
    },
    corn3 : {
      count: 1,
      total: 0,
      price: 5,
      tickInterval:1
    },
    soy1 : {
      count: 1,
      total: 0,
      price: 5,
      tickInterval:1
    },
    soy2 : {
      count: 1,
      total: 0,
      price: 5,
      tickInterval:1
    },
    soy3 : {
      count: 1,
      total: 0,
      price: 5,
      tickInterval:1
    },
    alfalfa : {
      count: 1,
      total: 0,
      price: 5,
      tickInterval:1
    },
    hay : {
      count: 1,
      total: 0,
      price: 5,
      tickInterval:1
    },
    fishfood : {
      count: 1,
      total: 0,
      price: 5,
      tickInterval:1
    }
  } 
};

export default (state=initialState, action) => {

  if (action.type === AUTH_SUCCESS) {
    return {
        ...state,
        crops1: action.currentUser.crops
    };
}

  if(action.type === INCREMENT_CROP) {
    //increment crop.total by the fields count
    const cCrop = action.field; //cCrop = crop name / object key  
    return {
      ...state,
      crops: {...state.crops,
        [cCrop]: {
          ...state.crops[cCrop], 
          total: state.crops[cCrop].total + state.crops[cCrop].count
        }
      }
    }  
  }  
  if(action.type === BUY_CROP) {
    //increment crop.count by 1 upon purchase
    const cCrop = action.field; //cCrop = crop name / object key  
    return {
      ...state,
      crops: {...state.crops,
        [cCrop]: {
          ...state.crops[cCrop], 
          count: state.crops[cCrop].count += 1
        }
      }
    }  
  }  
  if(action.type === INCREASE_TICK_INTERVAL) {
    //increment progres bar tick intervalby 8 ms
    const cCrop = action.field; //cCrop = crop name / object key  
    return {
      ...state,
      crops: {...state.crops,
        [cCrop]: {
          ...state.crops[cCrop], 
          tickInterval: state.crops[cCrop].tickInterval+8
        }
      }
    }  
  }  



  return state;
} 










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