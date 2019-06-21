import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

// Running placeName through addplace function
export const addPlace = (placeName, location, image) => {
    // Add Place is now a return Dispatch function to FireBase
    return dispatch => {
        // Catching data and storing in an Object
        const placeData = {
            name: placeName,
            location: location
        };
        // Fetch API POST to FireBase
        fetch("https://my-project-1559060339539.firebaseio.com/places.json", {
            method: 'POST',
            body: JSON.stringify(placeData)
        })
        // Catch Error
        .catch(err => console.log(err))
        // Success send response in JSON
        .then(res => res.json())
        // log the parsed Response
        .then(parsedRes => {
            console.log(parsedRes);
        });
    };
};

// Running key through deletePlace function
export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

