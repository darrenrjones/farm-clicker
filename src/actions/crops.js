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

export const INCREASE_TICK_INTERVAL = 'INCREASE_TICK_INTERVAL';
export const increaseTickInterval = (field) => ({
    type: INCREASE_TICK_INTERVAL,
    field
});