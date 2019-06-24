import {UI_START_LOADING, UI_STOP_LOADING } from '../actions/actionTypes';
// Importing UI START and STOP loading from Store/Actions

// Set initial State to false
const initialState = {
    isLoading: false
};

/*  If place button is shared, set state to true creating loading circle
        ELSE if failed or dispatch is complete set isLoading back to false.
*/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
};

export default reducer;