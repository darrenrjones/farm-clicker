import {
  SAVE_SUCCESS_DISPLAY
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
  } else if(action.type === SELL_ANIMAL) {
    return {
      ...state,
      currentUser: {...state.currentUser, cash: state.currentUser.cash += action.value}
    }
  }
  return state;
}
