import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import placesReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placesReducer
});

let composeEnchancers = compose;

// Only in Dev-mode run 
if (__DEV__) {
    composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnchancers());
};

export default configureStore;