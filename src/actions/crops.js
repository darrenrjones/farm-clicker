export const INCREMENT_WHEAT = 'INCREMENT_WHEAT';
export const incrementWheat = (fieldCount) => ({
    type: INCREMENT_WHEAT, 
    fieldCount
});

export const BUY_CROP = 'BUY_CROP';
export const buyCrop = (cropType) => ({
    type: BUY_CROP,
    cropType
});