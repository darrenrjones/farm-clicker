import {
  BUY_CROP,
} from '../actions/crops';

import { AUTH_SUCCESS } from '../actions/auth';

const initialState = {

  crops: null,

};

export default (state = initialState, action) => {

  if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      crops: action.currentUser.crops
    }
  }
  if (action.type === BUY_CROP) {
    //increment crop.count by 1 upon purchase
    let copy = [...state.crops];
    let index;
    const cropObj = copy.find((crop, i) => {
      if (crop.type === action.field) {
        index = i;
        return true;
      }
      return false;
    });
    cropObj.count += 1;
    return {
      ...state,
      crops: [
        ...copy.slice(0, index),
        cropObj,
        ...copy.slice(index + 1, copy.length + 1)
      ]
    }
  }
  return state;
} 
