export const INCREMENT_ANIMAL = 'INCREMENT_ANIMAL';
export const incrementAnimal = (field) => ({
    type: INCREMENT_ANIMAL, 
    field
});

export const BUY_ANIMAL = 'BUY_ANIMAL';
export const buyAnimal = (field) => ({
    type: BUY_ANIMAL,
    field
});
