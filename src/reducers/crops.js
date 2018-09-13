import {
  INCREMENT_CROP,
  BUY_CROP
} from '../actions/crops';

const initialState = {

  crops:{

    wheat1 : {
      count: 1,
      total: 1
    },
    wheat2 : {
      count: 2,
      total: 3
    },
    wheat3 : {
      count: 3,
      total: 7
    },
    corn1 : {
      count: 11,
      total: 1
    },
    corn2 : {
      count: 1,
      total: 0
    },
    corn3 : {
      count: 1,
      total: 0
    },
    soy1 : {
      count: 1,
      total: 0
    },
    soy2 : {
      count: 1,
      total: 0
    },
    soy3 : {
      count: 1,
      total: 0
    },
    alfalfa : {
      count: 1,
      total: 0
    },
    hay : {
      count: 1,
      total: 0
    },
    fishfood : {
      count: 1,
      total: 0
    }
  } 
};

export default (state=initialState, action) => {

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