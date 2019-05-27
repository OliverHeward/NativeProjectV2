import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
    }

    constructor(props) {
        super(props);
        // Dimensions API eventlistener for a change in updateStyles
        Dimensions.addEventListener("change", this.updateStyles);
    }

    // If Eventlistener is loaded, unmount eventlistener
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    /* updateStyles function updating setState with current Dimenions Window
        if > 500 setState to "portrait"
        else < 500 setState to Landscape
    */
    updateStyles = (dims) => {
        this.setState({
            viewMode:
            dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

    placeDeletedHandler = () => {
        // Grabbing generated Key for item
        this.props.onDeletePlace(this.props.selectedPlace.key);
        // Closing the current page from the stack
        this.props.navigator.pop();
    }

    render() {
        return(
        <View style={styles.container}>
            {/* Styles for Components styling being controlled by Dimensions API  */}
            <View style={
                this.state.viewMode === "portrait" 
                ? styles.portraitImageContainer 
                : styles.landscapeImageContainer
            }>
                <Image 
                source={this.props.selectedPlace.image} 
                style={this.state.viewMode === "portrait" 
                    ? styles.portraitPlaceImage 
                    : styles.landscapePlaceImage}
                />
                {/* placeDeletedHandler function passed into onPress listener */}
                <View style={
                    this.state.viewMode === "portrait"
                    ? styles.portraitTextContainer
                    : styles.landscapeTextContainer
                }>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon 
                                size={30} 
                                // Platform checking for device to change icon styling accordingly
                                name={Platform.OS === 'android' ? "md-trash" : "ios-trash"}
                                color="red" />
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center",
    },
    // Responsive Styles
    portraitImageContainer: {
        flexDirection: "column",
    },
    landscapeImageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    portraitPlaceImage: {
        width: "100%",
        height: 200
    },
    landscapePlaceImage: {
        width: "45%",
        height: 200,
    },
    portraitTextContainer: {
        width: "100%",
    },
    landscapeTextContainer: {
        width: "45%",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 150
    }
});

// Mapping item to Redux dispatch
const mapDispatchToProps = dispatch => {
    // mapping dispatch allows for the passing of state key to store
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
        // the action onDeletePlace is returned, key is being imported from Placedetail state
        // the state is then dispatched the result of onDeletePlace
        // this is then sent to the store to be deleted
    };
};



export default connect(null, mapDispatchToProps)(PlaceDetail);