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

// export const checkProps = (component, conformingProps) => {
//   // checkPropTypes will return error warning instead of loggin it so we don't have to mock console.error

//   const propError = checkPropTypes(
//     component.propTypes,
//     conformingProps,
//     'prop',
//     component.name
//   );
//   expect(propError).toBeUndefined();
// }