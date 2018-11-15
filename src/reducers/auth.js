import {
	SET_AUTH_TOKEN,
	CLEAR_AUTH,
	AUTH_REQUEST,
	AUTH_ERROR,
	CLEAR_LOADING,
} from '../actions/auth';


const initialState = {
	authToken: null, // authToken !== null does not mean it has been validated
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	if (action.type === SET_AUTH_TOKEN) {
		return {
			...state,
			authToken: action.authToken
		};
	} else if (action.type === CLEAR_AUTH) {
		return {
			...state,
			authToken: null
		};
	} else if (action.type === CLEAR_LOADING) {
		return {
			...state,
			loading: false,
			error: null
		};
	} else if (action.type === AUTH_REQUEST) {
		return {
			...state,
			loading: true,
			error: null
		};
	} else if (action.type === AUTH_ERROR) {
		return {
			...state,
			loading: false,
			error: action.error
		};
	}
	return state;
}
