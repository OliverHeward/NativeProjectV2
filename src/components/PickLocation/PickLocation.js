import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
// MapView is imported from Native-Maps
import MapView from 'react-native-maps';

class PickLocation extends Component {
    // State controlling Location to allow for dynamic input when location is picked
    // Initial Lat + Long set to WeWork City Road
    state = {
        focusedLocation: {
            latitude: 51.527673,
            longitude: -0.088374,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
            // Longitude working out aspect ratio using Dimenions API
        }
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent .coordinate;
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            };
        })
    }

    render() {
        return( 
        <View style={styles.container}>                 
            <MapView 
                initialRegion={this.state.focusedLocation}
                region={this.state.focusedLocation}
                style={styles.map}
                onPress={this.pickLocationHandler}
            />
            <View style={styles.button}>
                <Button title="Locate Me" onPress={() => alert('Choose Location')}/>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 250,
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
})

export default PickLocation;