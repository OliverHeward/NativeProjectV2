import { SET_PLACES, REMOVE_PLACE } from "../actions/actionTypes";
  
  // Creating an empty places object
  const initialState = {
    places: []
  };
  // Passing state/initalstate through action
  const reducer = (state = initialState, action) => {
    // Action Switch statement
    switch (action.type) {
      case SET_PLACES: 
        return {
          ...state,
          places: action.places
        };

      // Remoe Place Switch returning Previous state  
      case REMOVE_PLACE: 
        return {
          ...state,
          places: state.places.filter(place => {
            return place.key !== action.key;
            // action.ley is passed down from actions
          })
        };
        // default - return inital state that is empty string
        default:
            return state;
      }
  };
  
  export default reducer;
  