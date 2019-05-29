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
        },
        // Initial chosen location is set to false on load
        locationChosen: false
    }
    // Pick Location Handler running event.
    // coords set to Native Event Coordinate which is a known command for Map API
    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            // spread operator
            ...this.state.focusedLocation, 
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            // PrevState is ran to maintain current state of all keys before Lati & Longi are updated
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
                // on location picked, chosen location is set to true
            };
        })
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
        err => {
            console.log(err);
            alert("Fetching the position failed, please pick one manually!")
        })
    }

    render() {
        // Marker currently set to null whilst locationChosen is false
        let marker = null;
        // When location is chosen, set marker to have this JSX
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return( 
        <View style={styles.container}>                 
            <MapView 
            // Initial Region on screen load
                initialRegion={this.state.focusedLocation}
                style={styles.map}
                onPress={this.pickLocationHandler}
                ref={ref => this.map = ref}
            >
            {marker}
            </MapView> 
            <View style={styles.button}>
                <Button title="Locate Me" onPress={this.getLocationHandler}/>
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