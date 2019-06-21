import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

// Running placeName through addplace function
export const addPlace = (placeName, location, image) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        location: location,
        image: image
    };
};

// Running key through deletePlace function
export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};