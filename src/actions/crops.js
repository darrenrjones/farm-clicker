export const INCREMENT_CROP = 'INCREMENT_CROP';
export const incrementCrop = (field) => ({
	type: INCREMENT_CROP,
	field
});

export const BUY_CROP = 'BUY_CROP';
export const buyCrop = (field) => ({
	type: BUY_CROP,
	field
});

export const DECREMENT_CROP = 'DECREMENT_CROP';
export const decrementCrop = (field) => ({
	type: DECREMENT_CROP,
	field
});
