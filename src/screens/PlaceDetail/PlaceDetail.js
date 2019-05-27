import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    placeDeletedHandler = () => {
        // Grabbing generated Key for item
        this.props.onDeletePlace(this.props.selectedPlace.key);
        // Closing the current page from the stack
        this.props.navigator.pop();
    }

    render() {
        return(<View style={styles.container}>
            <View>
                <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            </View>
            <View>
                {/* placeDeletedHandler function passed into onPress listener */}
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center",
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