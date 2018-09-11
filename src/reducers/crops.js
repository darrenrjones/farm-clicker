import {
  INCREMENT_WHEAT,
  BUY_CROP
} from '../actions/crops';

const initialState = {
  wheat: 1,
  corn: 0,
}

export default (state=initialState, action) => {
  if(action.type === INCREMENT_WHEAT) {
    return {
      ...state,
      wheat: state.wheat += action.fieldCount
    }
  }
  return state;
}