import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
// import cropsReducer from './reducers/crops';
// import animalsReducer from './reducers/animals';


import { setAuthToken, refreshAuthToken } from './actions/auth';

const store = createStore(
	combineReducers({
		form: formReducer,
		auth: authReducer,
		user: userReducer,
		// crops: cropsReducer,
		// animals: animalsReducer
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
	const token = authToken;
	store.dispatch(setAuthToken(token));
	store.dispatch(refreshAuthToken());
}

export default store;
