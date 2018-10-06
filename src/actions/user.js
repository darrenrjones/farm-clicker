import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SAVE_SUCCESS_DISPLAY = 'SAVE_SUCCESS_DISPLAY';
export const saveSuccessDisplay = isSuccessful => ({
	type: SAVE_SUCCESS_DISPLAY,
	isSuccessful
});

export const INCREMENT_CROP = 'INCREMENT_CROP';
export const incrementCrop = (cropType, count) => ({
	type: INCREMENT_CROP,
	cropType,
	count
});

export const SELL_ANIMAL = 'SELL_ANIMAL';
export const sellAnimal = (value) => ({
    type: SELL_ANIMAL, 
    value
});

export const DECREMENT_CROP = 'DECREMENT_CROP';
export const decrementCrop = (count, feed1, feed2 ) => ({
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
export const hireManager = (field) => ({
    type: HIRE_MANAGER, 
    field
});

export const registerUser = user => dispatch => {
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
			const { reason, message, location } = err;
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
			console.error(err);

			dispatch(saveSuccessDisplay(false));
		})

}

