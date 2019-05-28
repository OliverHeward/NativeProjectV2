import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/backgroundImage.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
// Importing DefaultInput Field

class AuthScreen extends Component {
    // Setting state for Responsive Styles
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                }
            }
        }
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

    updateStyles = (dims) => {
        this.setState({
                viewMode: 
                    // dimensions window "height" > 500 select portrait
                    // other wise < 500 select landscape
                    dims.window.height > 500 ? "portrait" : "landscape"
            })
    }

    /* Update Input State function taking 2 params of key & val
        Setting state by returning controls state and updating state
            with original keys but overwriting "VALUE"
            allowing it to keep validation keys
    */
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        /* if key is equal to password
            return original connectedValue and set equalTo this Value */
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        /* setState of controls & key
            confirmPassword originally set as prevState,
            if key is equal to password then run validate and check value / validationRules / connectedValue
            else return prevState of password key
        */
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: 
                        key === "password" 
                        ? validate(
                            prevState.controls.confirmPassword.value, 
                            prevState.controls.confirmPassword.validationRules, 
                            connectedValue
                            ) 
                        : prevState.controls.confirmPassword.valid
                    },
                    /* prevState originally returned on key,
                        value set to value, then valid runs validate on value, 
                            ValidationsRules and connectedValue */
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue)
                    },
                }
            };
        });
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
                    {/* value set to this state -> controls -> email -> value 
                        onChangeText listening for any change in the input,
                            When there is val is ran into function updateInputState
                            which will update state of 'email' value
                    */}
                    <DefaultInput 
                        placeholder="Your E-Mail Address" 
                        style={styles.input} 
                        value={this.state.controls.email.value}
                        onChangeText={(val) => this.updateInputState('email', val)} />
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
                            <DefaultInput 
                                placeholder="Password" 
                                style={styles.input} 
                                value={this.state.controls.password.value}
                                onChangeText={(val) => this.updateInputState('password', val)}/>
                        </View>
                        <View style={
                            this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordWrapper 
                            : styles.landscapePasswordWrapper
                            }>
                            <DefaultInput 
                                placeholder="Confirm Password" 
                                style={styles.input}
                                value={this.state.controls.confirmPassword.value}
                                onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                             />
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