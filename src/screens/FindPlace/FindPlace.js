import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// importing redux connect

import PlaceList from "../../components/PlaceList/PlaceList";
// Importing Placelist

class FindPlaceScreen extends Component {
    render () {
        return(
            <View>
                {/* Pulling in Data value props.places from Flatlist(PlaceList) */}
                <PlaceList places={this.props.places} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        // the first places is brought in from the root reducer and the second is to the places state in places.js
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);