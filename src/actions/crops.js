export const INCREMENT_CROP = 'INCREMENT_CROP';
export const incrementCrop = (crop) => ({
    type: INCREMENT_CROP, 
    crop
});

export const BUY_CROP = 'BUY_CROP';
export const buyCrop = (cropType) => ({
    type: BUY_CROP,
    cropType
});