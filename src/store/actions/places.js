import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

// Running placeName through addplace function
export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName: placeName
    };
};

// Running key through deletePlace function
export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};