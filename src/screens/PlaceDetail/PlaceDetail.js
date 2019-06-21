import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

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
        <View style={[
            styles.container,
            this.state.viewMode === "portrait" 
            ? styles.portraitContainer 
            : styles.landscapeContainer
            ]}>
            {/* Styles for Components styling being controlled by Dimensions API  */}
            <View style={styles.placeDetailContainer}>
                <View style={styles.subContainer}>
                    <Image 
                    source={this.props.selectedPlace.image} 
                    style={this.state.viewMode === "portrait" 
                        ? styles.portraitPlaceImage 
                        : styles.landscapePlaceImage}
                    />
                </View>
                <View style={styles.subContainer}>
                    <MapView initialRegion={{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta: Dimensions.get("window").width / 
                                            Dimensions.get("window").height * 
                                            0.0122
                        }}
                        style={styles.map}>
                        <MapView.Marker coordinate={this.props.selectedPlace.location}/>
                    </MapView>
                </View>
            </View>
            {/* placeDeletedHandler function passed into onPress listener */}
            <View style={styles.subContainer}>
                <View>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
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
        margin: 22,
        flex: 1
    }, 
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    subContainer: {
        flex: 1
    },
    mapContainer: {
        width: "100%",
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    placeDetailContainer: {
        flex: 2
    },
    // Responsive Styles
    portraitImageContainer: {
        flexDirection: "column",
        width: "100%",
    },
    landscapeImageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        marginLeft: "5%"
    },
    portraitPlaceImage: {
        width: "100%",
        height: 200
    },
    landscapePlaceImage: {
        width: "100%",
        height: "100%"
    },
    portraitTextContainer: {
        width: "50%",
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