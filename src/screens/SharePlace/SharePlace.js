import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
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
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';
// Importing Image
import imagePlaceholder from '../../assets/wework-office.jpg';

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
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              placeName: {
                ...prevState.controls.placeName,
                value: val,
                valid: validate(val, prevState.controls.placeName.validationRules),
                touched: true
              }
            }
          };
        });
      };

    // placeAddedHandler method getting the placeName.
    // this.props.onPlaceAdded added from the prop in mapToDispatch
    placeAddedHandler = () => {
        // if the state of placeNamed trimmed is equal to an empty string
        if (this.state.controls.placeName.value.trim() !== "") {
            this.props.onAddPlace(this.state.controls.placeName.value);
            // Dispatch (adds from button click)
        }
    }

    render () {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput 
                        placeData={this.state.controls.placeName} 
                        onChangeText={this.placeNameChangedHandler} />
                    <View style={styles.button}>
                        <Button 
                            title="Share the Place!" 
                            onPress={this.placeAddedHandler}
                            disabled={!this.state.controls.placeName.valid} />
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