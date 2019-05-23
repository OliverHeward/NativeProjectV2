import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// Import Redux connect

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component {
    // placeAddedHandler method getting the placeName.
    // this.props.onPlaceAdded(placename) added from the prop in mapToDispatch
    placeAddedHandler = placeName => {
        this.props.onPlaceAdded(placeName);
    }

    render () {
        return(
            <View>
                {/* When a place is added, run placeAddedHandler which will pass to Dispatch */}
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    // mapping dispatch allows for the passing of state to store
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
        // the action onAddPlace is returned, placeName is being imported from PlaceInput as the value's state
        // the state is then dispatched the result of addPlace with the value of placeName
        // this is then sent to the store as a new place
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);