import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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
    // Thunk passed into applyMiddleware to catch data to send to Firebase
    return createStore(rootReducer, composeEnchancers(applyMiddleware(thunk)));
};

export default configureStore;