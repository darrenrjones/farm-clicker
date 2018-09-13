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