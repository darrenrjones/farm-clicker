import {
  INCREMENT_CROP,
  BUY_CROP,
  INCREASE_TICK_INTERVAL
} from '../actions/crops';

import {AUTH_SUCCESS} from '../actions/auth';

const initialState = {

  crops1: null,
  // crops:{

  //   wheat1 : {
  //     count: 9,
  //     total: 1,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   wheat2 : {
  //     count: 0,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   wheat3 : {
  //     count: 3,
  //     total: 7,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   corn1 : {
  //     count: 9,
  //     total: 1,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   corn2 : {
  //     count: 0,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   corn3 : {
  //     count: 1,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   soy1 : {
  //     count: 1,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   soy2 : {
  //     count: 1,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   soy3 : {
  //     count: 1,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   alfalfa : {
  //     count: 1,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   hay : {
  //     count: 1,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   },
  //   fishfood : {
  //     count: 1,
  //     total: 0,
  //     price: 5,
  //     tickInterval:1
  //   }
  // } 
};

export default (state=initialState, action) => {

  if (action.type === AUTH_SUCCESS) {
    return {
        ...state,
        crops1: action.currentUser.crops
    };
}

  // if(action.type === INCREMENT_CROP) {
  //   //increment crop.total by the fields count
  //   const cCrop = action.field; //cCrop = crop name / object key  
  //   return {
  //     ...state,
  //     crops: {...state.crops,
  //       [cCrop]: {
  //         ...state.crops[cCrop], 
  //         total: state.crops[cCrop].total + state.crops[cCrop].count
  //       }
  //     }
  //   }  
  // }  
  if(action.type === INCREMENT_CROP) {
    let copy = [...state.crops1];
    let index;
    const cropObj = copy.find((crop, i) => {
      if(crop.type === action.field){
        index = i;
        return true;
      }
      return false;    
    });
    cropObj.total += cropObj.count;
    return {
      ...state,
      crops1: [
        ...copy.slice(0,index), 
        cropObj, 
        ...copy.slice(index+1,copy.length+1)  
      ] 
    }   
  }
  if(action.type === BUY_CROP) {
    //increment crop.count by 1 upon purchase
    let copy = [...state.crops1];
    let index;
    const cropObj = copy.find((crop, i) => {
      if(crop.type === action.field){
        index = i;
        return true;
      }
      return false;    
    });
    cropObj.count += 1;
    return {
      ...state,
      crops1: [
        ...copy.slice(0,index), 
        cropObj, 
        ...copy.slice(index+1,copy.length+1)  
      ] 
    }

  }  

  // if(action.type === BUY_CROP) {
  //   //increment crop.count by 1 upon purchase
  //   const cCrop = action.field; //cCrop = crop name / object key  
  //   return {
  //     ...state,
  //     crops: {...state.crops,
  //       [cCrop]: {
  //         ...state.crops[cCrop], 
  //         count: state.crops[cCrop].count += 1
  //       }
  //     }
  //   }  
  // }  
  // if(action.type === INCREASE_TICK_INTERVAL) {
  //   //increment progres bar tick intervalby 8 ms
  //   const cCrop = action.field; //cCrop = crop name / object key  
  //   return {
  //     ...state,
  //     crops: {...state.crops,
  //       [cCrop]: {
  //         ...state.crops[cCrop], 
  //         tickInterval: state.crops[cCrop].tickInterval+8
  //       }
  //     }
  //   }  
  // }  



  return state;
} 

// crops1: [
  //   {type: 'wheat1', count: 1, total: 4},
  //   {type: 'wheat2', count: 0, total: 2},
  //   {type: 'wheat3', count: 0, total: 1},
  //   {type: 'corn1', count: 0, total: 0},
  //   {type: 'corn2', count: 0, total: 0},
  //   {type: 'corn3', count: 0, total: 0},
  //   {type: 'soy1', count: 0, total: 0},
  //   {type: 'soy2', count: 0, total: 0},
  //   {type: 'soy3', count: 0, total: 0},
  //   {type: 'alfalfa', count: 0, total: 0},
  //   {type: 'hay', count: 0, total: 0},
  //   {type: 'fishfood', count: 0, total: 0},    
  // ]