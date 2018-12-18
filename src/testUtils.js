// import checkPropTypes from 'check-prop-types';

import userReducer from './reducers/user';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export const findByTestAttr = (wrapper, val) => { //val data-test attr
  return wrapper.find(`[data-test="${val}"]`);
}

export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
  return createStoreWithMiddleware(userReducer, initialState);
}
