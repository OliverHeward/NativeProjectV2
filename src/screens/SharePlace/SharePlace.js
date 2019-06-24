import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
// Importing Redux
import { connect } from 'react-redux';
// Importing action Index
import { addPlace } from '../../store/actions/index';
// Importing PlaceInput
import PlaceInput from '../../components/PlaceInput/PlaceInput';
// Importing Text wrapper and Header text components
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
// Importing PickImage and PickLocation components
import PickImage from '../../components/PickImage/PickImage';
// Importing the Pick Image Component
import PickLocation from '../../components/PickLocation/PickLocation';
// Importing Pick Location Component
import validate from '../../utility/validation';
// Importing Validation of Share Place Components

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    // setting state to an empty string
    state = {
        controls: {
          placeName: {
            value: "",
            valid: false,
            touched: false,
            validationRules: {
              notEmpty: true
            }
          },
          location: {
              value: null,
              valid: false
          },
          image: {
              value: null,
              valid: false
          }
        }
      };

    constructor(props) {
        super(props);
        // setting the navigator to open by passing onNavigatorEvent function into navigator props
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    };

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
    };
    // Setting state of PlaceInput
    placeNameChangedHandler = val => {
        // setState pulling Previous State as to not reset previously set states
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              placeName: {
                ...prevState.controls.placeName,
                value: val,
                valid: validate(val, prevState.controls.placeName.validationRules),
                touched: true
                // Updating State of Place Name - Value, Valid and Touched
              }
            }
          };
        });
      };

    // Location Picked Function
    locationPickedHandler = location => {
        // Setting State to previous state as to not overwrite previous state
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                        // Updating state of Location - Value and Valid
                    }
                }
            }
        })
    }

    // Image Picked Function
    imagePickedHandler = image => {
        // Setting State to previous state as to not overwrite previous state
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                        // Updating state of Image - Value and Valid.
                    }
                }
            }
        })
    }

    // placeAddedHandler method getting the placeName.
    // this.props.onPlaceAdded added from the prop in mapToDispatch
    placeAddedHandler = () => {
        // if the state of placeNamed trimmed is equal to an empty string
            this.props.onAddPlace(this.state.controls.placeName.value, 
                                this.state.controls.location.value,
                                this.state.controls.image.value);
            // Dispatch (adds from button click)
    }

    render () {
        // Button added to object
        let submitButton = (
            <Button 
                title="Share the Place!" 
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid || 
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid} />
        );
        
        /* If button click is successful and upload has began,
            Change button to Activity Indicator (loading circle) */
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        } 

        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                    <PickImage onImagePicked={this.imagePickedHandler}/>
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    <PlaceInput 
                        placeData={this.state.controls.placeName} 
                        onChangeText={this.placeNameChangedHandler}
                        />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
})

// Sending State to Redux
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
        // Return loading state to state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    // mapping dispatch allows for the passing of state to store
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
        // the action onAddPlace is returned, placeName is being imported from PlaceInput as the value's state
        // the state is then dispatched the result of addPlace with the value of placeName
        // this is then sent to the store as a new place
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);