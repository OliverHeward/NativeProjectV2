import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// importing redux connect

import PlaceList from "../../components/PlaceList/PlaceList";
// Importing Placelist

class FindPlaceScreen extends Component {
    itemSelectedHandler = key => {
        // Vari selPlace is defined by mapStateToProps places:state with find()
        // it will return true if the place.key if EQUAL to key recieved
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        // props.navigator.push bringing PlaceDetailScreen into View
        this.props.navigator.push({
            screen: "NativeProject.PlaceDetailScreen",
            title: selPlace.name,
            // Props being passed down into an object
            passProps: {
                selectedPlace: selPlace
            }
        });
    }
    render () {
        return(
            <View>
                {/* Pulling in Data value props.places from Flatlist(PlaceList) */}
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
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