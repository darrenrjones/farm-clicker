import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { authError, authRequest } from '../actions/auth';

export const SAVE_SUCCESS_DISPLAY = 'SAVE_SUCCESS_DISPLAY';
export const saveSuccessDisplay = isSuccessful => ({
	type: SAVE_SUCCESS_DISPLAY,
	isSuccessful
});

export const INCREMENT_CROP = 'INCREMENT_CROP';
export const incrementCrop = (cropObj) => ({
	type: INCREMENT_CROP,
	cropObj
});

export const SELL_ANIMAL_PRODUCT = 'SELL_ANIMAL_PRODUCT';
export const sellAnimalProduct = (cardObj) => ({
	type: SELL_ANIMAL_PRODUCT,
	cardObj
});

export const DECREMENT_CROP = 'DECREMENT_CROP';
export const decrementCrop = (count, feed1, feed2) => ({
	type: DECREMENT_CROP,
	count,
	feed1,
	feed2
});

export const BUY_CROP = 'BUY_CROP';
export const buyCrop = (field) => ({
	type: BUY_CROP,
	field
});
export const BUY_ANIMAL = 'BUY_ANIMAL';
export const buyAnimal = (field) => ({
	type: BUY_ANIMAL,
	field
});

export const HIRE_MANAGER = 'HIRE_MANAGER';
export const hireManager = (field, screen) => ({
	type: HIRE_MANAGER,
	field,
	screen
});

export const TOGGLE_TUTORIAL = 'TOGGLE_TUTORIAL';
export const toggleTutorial = () => ({
	type: TOGGLE_TUTORIAL	
});


export const SET_LAST_LOGOUT = 'SET_LAST_LOGOUT';
export const setLastLogout = (timestamp) => ({
	type: SET_LAST_LOGOUT,
	timestamp
});

export const SET_MESSAGE = 'SET_MESSAGE';
export const setMessage = (seenMessage) => ({
	type: SET_MESSAGE,
	seenMessage
});
// export function setMessage(seenMessageLevel) {
// 	return (dispatch, getState) => {
// 		const { currentUser } = getState();

// 		dispatch({
// 			type: SET_MESSAGE,
// 			seenMessage: currentUser.seenMessage,
// 			seenMessageLevel

// 		});
// 	};
// }

export const registerUser = user => dispatch => {
	dispatch(authRequest());

	return fetch(`${API_BASE_URL}/api/user/register`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {
			const { reason, message, location } = err.error;
			dispatch(authError(err));
			if (reason === 'ValidationError') {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		});
};

export const save = () => (dispatch, getState) => {
	console.log('auto saved...');

	const currentState = getState();
	const authToken = getState().auth.authToken;

	if (currentState.user.currentUser) {
		return fetch(`${API_BASE_URL}/api/user/save/${currentState.user.currentUser._id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(currentState.user.currentUser)
		})
			.then(res => normalizeResponseErrors(res))
			.then(res => res.json())
			// .then(() => {
			//   dispatch(saveSuccessDisplay(true));
			//   // dispatch(refreshAuthToken());
			// })
			.catch(err => {
				console.error('error from save', err);

				dispatch(saveSuccessDisplay(false));
			})
	}



}

