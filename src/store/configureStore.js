import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Importing Redux Thunk to allow for Middlewear to catch data to send to Firebase
import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer, 
    auth: authReducer
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