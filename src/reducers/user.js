import {
  SAVE_SUCCESS_DISPLAY, INCREMENT_CROP, HIRE_MANAGER, SET_LAST_LOGOUT, TOGGLE_TUTORIAL, SET_MESSAGE
} from '../actions/user';

import {
  AUTH_SUCCESS,
  CLEAR_AUTH
} from '../actions/auth';
import { SELL_ANIMAL_PRODUCT, BUY_CROP, BUY_ANIMAL } from '../actions/user';

import { messages } from '../actions/helpers/tutorialMessages';
import { messageSetter } from '../actions/helpers/messageSetter';
import  consumptionMap from '../actions/helpers/consumptionMap';

const initialState = {
  currentUser: null,
  saveSuccess: null,
  message: null,
  tutorialOn: false,
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

  else if (action.type === INCREMENT_CROP) {
    let card = action.cropObj.type.slice(0, -1); //convert field to type ie 'wheat' instead of 'wheat1'
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        inventory: {
          ...state.currentUser.inventory,
          [card]: state.currentUser.inventory[card] += action.cropObj.count
        }
      },
      ...messageSetter(state)
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
        cash: state.currentUser.cash -= cropObj.price / 2 // subtract pre-incremented price
      },
      ...messageSetter(state)
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
        cash: state.currentUser.cash -= animalObj.price / 2 // subtract pre-incremented price
      }
    }
  }



  else if (action.type === SELL_ANIMAL_PRODUCT) {
    let product, animalConsumption;
    // console.log(action.cardObj);
    const feedArr = action.cardObj.feed.split(', ');
    // console.log(feedArr);

    switch (action.cardObj.type.slice(0, -1)) { //slice to remove field number
      case 'chicken':
        product = consumptionMap.chicken.product
        animalConsumption = consumptionMap.chicken.consumption
        break;
      case 'pig':
        product = consumptionMap.pig.product
        animalConsumption = consumptionMap.pig.consumption
        break;
      case 'sheep':
        product = consumptionMap.sheep.product
        animalConsumption = consumptionMap.sheep.consumption
        break;
      case 'cow':
        product = consumptionMap.cow.product
        animalConsumption = consumptionMap.cow.consumption
        break;
      case 'goat':
        product = consumptionMap.goat.product
        animalConsumption = consumptionMap.goat.consumption
        break;
      case 'fish':
        product = consumptionMap.fish.product
        animalConsumption = consumptionMap.fish.consumption
        break;
      default:
        product = '???'
        animalConsumption = '?!?'
        break;
    }
    // let feed1 = action.cardObj.feed.split(' ')[0].replace(",", "");
    // let feed2 = action.cardObj.feed.length > 1 ? action.cardObj.feed.split(' ')[1] : null;

    let feed1 = feedArr[0]
    let feed2 = feedArr[1]
    let feed3 = feedArr[2]
    let feed4 = feedArr[3]
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        cash: state.currentUser.cash += action.cardObj.count * (animalConsumption),
        careerCash: state.currentUser.careerCash += action.cardObj.count * (animalConsumption),
        inventory: {
          ...state.currentUser.inventory,
          [feed1]: state.currentUser.inventory[feed1] -= animalConsumption * action.cardObj.count,
          [feed2]: state.currentUser.inventory[feed2] -= animalConsumption * action.cardObj.count,
          [feed3]: state.currentUser.inventory[feed3] -= animalConsumption * action.cardObj.count,
          [feed4]: state.currentUser.inventory[feed4] -= animalConsumption * action.cardObj.count,
          [product]: state.currentUser.inventory[product] += action.cardObj.count
        }
      },
      ...messageSetter(state)

    }
  }

  //subtract manager price/ set manager to true
  else if (action.type === HIRE_MANAGER) {
    let cardCopy = action.screen === 'crops' ? [...state.currentUser.crops] : [...state.currentUser.animals];
    let index;
    const fieldObj = cardCopy.find((field, i) => {
      if (field.type === action.field) {
        index = i;
        return true;
      }
      return false;
    });

    fieldObj.manager = true;
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        crops: [
          ...cardCopy.slice(0, index),
          fieldObj,
          ...cardCopy.slice(index + 1, cardCopy.length + 1)
        ],
        cash: state.currentUser.cash -= fieldObj.price * 3
      },
      ...messageSetter(state)
    }
  }

  else if (action.type === SET_LAST_LOGOUT) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        lastLogout: action.timestamp
      }
    }
  }
  else if (action.type === TOGGLE_TUTORIAL) {
    return {
      ...state,
      tutorialOn: !state.tutorialOn
    }
  }
  else if (action.type === SET_MESSAGE) {
    return {
      ...state,
      message: messages[action.seenMessage],
      tutorialOn: !state.tutorialOn
    }
  }

  return state;
}
