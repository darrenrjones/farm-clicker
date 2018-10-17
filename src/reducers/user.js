import {
  SAVE_SUCCESS_DISPLAY, INCREMENT_CROP, HIRE_MANAGER, SET_LAST_LOGOUT
} from '../actions/user';

import {
  AUTH_SUCCESS,
  CLEAR_AUTH
} from '../actions/auth';
import { SELL_ANIMAL_PRODUCT, BUY_CROP, BUY_ANIMAL } from '../actions/user';

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
  } 
  
  else if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      loading: false,
      currentUser: action.currentUser
    };
  } 
  
  else if (action.type === CLEAR_AUTH) {
    return {
      ...state,
      currentUser: null
    };
  } 

  else if(action.type === INCREMENT_CROP) {
    let card = action.cropObj.type.slice(0,-1); //convert field to type ie 'wheat' instead of 'wheat1'
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        inventory: {
          ...state.currentUser.inventory, 
          [card]: state.currentUser.inventory[card] += action.cropObj.count
        }
      }
    }
  } 

  else if (action.type === BUY_CROP) {
    //increment crop.count by 1 upon purchase and remove cash
    let copy = [...state.currentUser.crops];
    let index;
    const cropObj = copy.find((crop, i) => {
      if (crop.type === action.field) {
        index = i;
        return true;
      }
      return false;
    });
    cropObj.count += 1;
    cropObj.price *= 2; // increment price 
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        crops: [
          ...copy.slice(0, index),
          cropObj,
          ...copy.slice(index + 1, copy.length + 1)
        ],
        cash: state.currentUser.cash -= cropObj.price/2 // subtract pre-incremented price
      }
    }
  }

  else if (action.type === BUY_ANIMAL) {
    //increment animal.count by 1 upon purchase
    let copy = [...state.currentUser.animals];
    let index;
    const animalObj = copy.find((animal, i) => {
      if (animal.type === action.field) {
        index = i;
        return true;
      }
      return false;
    });
    animalObj.count += 1;
    animalObj.price *= 2; // increment price 

    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        animals: [
        ...copy.slice(0, index),
        animalObj,
        ...copy.slice(index + 1, copy.length + 1)
      ],
      cash: state.currentUser.cash -= animalObj.price/2 // subtract pre-incremented price
      }
    }
  } 
    


  else if(action.type === SELL_ANIMAL_PRODUCT) {
    let product; 
    switch (action.cardObj.type.slice(0,-1)) {
      case 'chicken':
        product = 'eggs'
        break;
      case 'pig':
        product = 'bacon'
        break;
      case 'cow':
        product = 'milk'
        break;  
      default:
        break;
    }
    let feed1 = action.cardObj.feed.split(' ')[0].replace(",","");
    let feed2 = action.cardObj.feed.split(' ')[1];
    return {
      ...state,
      currentUser: {
        ...state.currentUser, 
        cash: state.currentUser.cash += action.cardObj.count, // subtract pre-incremented price
        inventory: {
          ...state.currentUser.inventory, 
          [feed1]: state.currentUser.inventory[feed1] -= action.cardObj.count,
          [feed2]: state.currentUser.inventory[feed2] -= action.cardObj.count,
          [product]: state.currentUser.inventory[product] += action.cardObj.count
        }

      }
    }
  }


  else if(action.type === HIRE_MANAGER) {
    let copy = action.screen === 'crops' ? [...state.currentUser.crops] : [...state.currentUser.animals];
    let index;
    const fieldObj = copy.find((field, i) => {
      if (field.type === action.field) {
        index = i;
        return true;
      }
      return false;
    });
    console.log(fieldObj);
    
    fieldObj.manager = true;
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        crops: [
          ...copy.slice(0, index),
          fieldObj,
          ...copy.slice(index + 1, copy.length + 1)
        ],
        cash: state.currentUser.cash -= fieldObj.price*5
      }
    }
  }

  else if(action.type === SET_LAST_LOGOUT){
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        lastLogout: action.timestamp
      }
    }
  }

  return state;
}
