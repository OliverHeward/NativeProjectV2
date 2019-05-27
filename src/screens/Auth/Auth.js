import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/backgroundImage.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
// Importing DefaultInput Field

class AuthScreen extends Component {
    // Setting state for Responsive Styles
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
    }

    constructor(props) {
        super(props);
        // Dimensions API event listener to "change" in updateStyles
        Dimensions.addEventListener("change", this.updateStyles);
        }

    componentWillUnmount() {
        // When Dimenions mounts, then remove event listener
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    // 
    updateStyles = (dims) => {
        this.setState({
                viewMode: 
                    // dimensions window "height" > 500 select portrait
                    // other wise < 500 select landscape
                    dims.window.height > 500 ? "portrait" : "landscape"
            })
    }

    loginHandler = () => {
        startMainTabs();
    }

    render () {
        // Setting headingText variable to null
        let headingText = null;
        /* If the current state of viewMode run by the EventListener is equal to "portrait"
            update headingText with this JSX
        */ 
        if (this.state.viewMode === "portrait" ) {
            headingText = (
            <MainText>
                <HeadingText>Please Log In</HeadingText>
            </MainText>
            )
        }
        return(
            <ImageBackground 
                source={backgroundImage} 
                style={styles.backgroundImage}>
                <View style={styles.container} >
                    {headingText}
                <ButtonWithBackground >Switch To Login</ButtonWithBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Your E-Mail Address" style={styles.input} />
                    {/* State being set for styling to Dimensions of screen */}
                    <View style={
                        this.state.viewMode === "portrait" 
                        ? styles.portraitPasswordContainer 
                        : styles.landscapePasswordContainer
                        }>
                        <View style={
                            this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordWrapper 
                            : styles.landscapePasswordWrapper
                            }>
                            <DefaultInput placeholder="Password" style={styles.input} />
                        </View>
                        <View style={
                            this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordWrapper 
                            : styles.landscapePasswordWrapper
                            }>
                            <DefaultInput placeholder="Confirm Password" style={styles.input} />
                        </View>
                    </View>
                </View>
                <ButtonWithBackground onPress={this.loginHandler}>Submit</ButtonWithBackground>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
    },
    // Reponsive Containers
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },    
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    portraitPasswordWrapper: {
        width: "100%",
    },
    landscapePasswordWrapper: {
        width: "49%",
    },
});

export default AuthScreen;