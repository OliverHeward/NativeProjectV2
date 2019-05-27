import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
// importing redux connect

import PlaceList from "../../components/PlaceList/PlaceList";
// Importing Placelist

class FindPlaceScreen extends Component {
    // a static state color is set for navbar to orange
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    // Internal placesLoaded state set to false
    // Animation state component values
    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }

    constructor(props) {
        super(props);
        // setting the navigator to open by passing onNavigatorEvent function into navigator props
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        // Checking event.type is equal to the ID given to navbar
        if (event.type === "NavBarButtonPress") {
            // If the event.id is equal to the ID given on startMainTabs
            if (event.id === "sideDrawerToggle") {
                // if true, then reach out to navigator and toggle draw
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }
    /* Place List animation handler setting animation settings,
        to Value 1 from 0 (in state => placesAnim)
        duration: 500ms,
        use Native Drivers to help animation assist smoothing
            start() animation.

    */

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }
    /* Search button handler setting animation settings,
        toValue 0 from 1 (in state),
        duration: 500ms,
        use Native Drivers to help animation assist smoothing
            start is called to setState of placesLoaded to True
                then sends initiation to placesLoadedHandler
    */
    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler();
        }); // Start the animation
    }

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
        let content = (
            <Animated.View
                style={{
                    // this is NaN, Animated view understands this only
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}
                >
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if (this.state.placesLoaded) {
            content = (
                /* Pulling in Data value props.places from Flatlist(PlaceList) */
                // Animated View to fade in List
                <Animated.View style={{ 
                    opacity: this.state.placesAnim,
                    width: "100%",
                    flex: 1,
                }}>
                    
                    <PlaceList 
                        places={this.props.places} 
                        onItemSelected={this.itemSelectedHandler} 
                />
                </Animated.View>
            );
        }
        return(
            <View style={
                this.state.placeLoaded 
                ? styles.listLoaded
                : styles.buttonContainer}>
            {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20,
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
});

const mapStateToProps = state => {
    return {
        // the first places is brought in from the root reducer and the second is to the places state in places.js
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);