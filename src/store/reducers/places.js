import {
    ADD_PLACE,
    DELETE_PLACE
  } from "../actions/actionTypes";
  
  // Creating an empty places object
  const initialState = {
    places: []
  };
  // Passing state/initalstate through action
  const reducer = (state = initialState, action) => {
    // Action Switch statement
    switch (action.type) {
      // Case for Adding place
      case ADD_PLACE:
        return {
          // bundling state with places, key, name and image
          ...state,
          places: state.places.concat({
            key: Math.random(),
            name: action.placeName,
            image: {
              uri: action.image.uri
            },
            location: action.location
          })
        };
        // Case for Deleting place
      case DELETE_PLACE:
        return {
          ...state,
          places: state.places.filter(place => {
            return place.key !== action.placeKey;
            // action.placeKey is passed down from actions-places
          })
        };
        // return inital state that is empty string
        default:
            return state;
      }
  };
  
  export default reducer;
  