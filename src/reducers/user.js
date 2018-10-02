import {
  SAVE_SUCCESS_DISPLAY, INCREMENT_CROP, DECREMENT_CROP
} from '../actions/user';

import {
  AUTH_SUCCESS,
  CLEAR_AUTH
} from '../actions/auth';
import { SELL_ANIMAL } from '../actions/animals';

const initialState = {
  currentUser: null,
  saveSuccess: null
};

export default (state = initialState, action) => {

  if (action.type === SAVE_SUCCESS_DISPLAY) {
    return {
      ...state,
      saveSuccess: action.success
    }
  } else if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      loading: false,
      currentUser: action.currentUser
    };
  } else if (action.type === CLEAR_AUTH) {
    return {
      ...state,
      currentUser: null
    };
  } 

  else if(action.type === INCREMENT_CROP) {
    let type = action.cropType;
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        cropTotals: {
          ...state.currentUser.cropTotals, 
          [type]: state.currentUser.cropTotals[type] += action.count
        }
      }
    }
  } 

  else if(action.type === SELL_ANIMAL) {
    return {
      ...state,
      currentUser: {...state.currentUser, cash: state.currentUser.cash += action.value}
    }
  }

  else if(action.type === DECREMENT_CROP) {
    let feed1 = action.feed1;
    let feed2 = action.feed2;

    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        cropTotals: {
          ...state.currentUser.cropTotals, 
          [feed1]: state.currentUser.cropTotals[feed1] -= action.count,
          [feed2]: state.currentUser.cropTotals[feed2] -= action.count
        }        
      }
    }
  }
  return state;
}
