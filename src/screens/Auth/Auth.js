import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/backgroundImage.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/index'
// Importing DefaultInput Field

class AuthScreen extends Component {
    // Setting state for Responsive Styles
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        // Setting state for Auth Mode (login or signup)
        authMode: "login",
        // Input Field State Controls
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
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

    /* Auth Mode handler, 
        state is set to login automatically,
        but will update to signup after button is pressed.  */
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        });
    };

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
                        valid: validate(
                            value, 
                            prevState.controls[key].validationRules, 
                            connectedValue
                            ),
                        touched: true
                    }
                }
            };
        });
    }

    /* LoginHandler assignes authData the state values from Email & Password
        then assigns the auth data to onLogin props */
    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData);
        startMainTabs();
    };

    render () {
        // Setting headingText variable to null
        let headingText = null;
        let confirmPasswordControl = null;
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

        /* Conditional check if state is set to signup 
            confirmPasswordControl object is given JSX that controls the View wrapper & Input field */
        if (this.state.authMode === "signup") {
            confirmPasswordControl = (
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
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                        // secureTextEntry is a boolean so leaving it empty will return True
                     />
                </View>
            );
        }
        return(
            <ImageBackground 
                source={backgroundImage} 
                style={styles.backgroundImage}>
                <KeyboardAvoidingView 
                    style={styles.container}
                    behavior="padding" >
                    {headingText}
                <ButtonWithBackground 
                    onPress={this.switchAuthModeHandler}>Switch To {this.state.authMode === 'login' ? "Sign Up" : "Login"}</ButtonWithBackground>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            {/* value set to this state -> controls -> email -> value 
                                onChangeText listening for any change in the input,
                                    When there is val is ran into function updateInputState
                                    which will update state of 'email' value
                                
                                    valid is a validity check for the input, along with touched.
                                    If the field is invalid when checked against Regex
                                    it will style to be RED
                            */}
                            <DefaultInput 
                                placeholder="Your E-Mail Address" 
                                style={styles.input} 
                                value={this.state.controls.email.value}
                                onChangeText={(val) => this.updateInputState('email', val)} 
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitalize="none"
                                autoCorrect={false}
                                // Auto's set to False to prevent annoying behavior
                                keyboardType="email-address"
                                // Setting Keyboard to Email to make for friendlier typing
                                />
                            {/* styles is now determined by if viewMode is "portrait" OR "login"  */}
                            <View style={
                                this.state.viewMode === "portrait" || 
                                this.state.authMode === "login"
                                    ? styles.portraitPasswordContainer 
                                    : styles.landscapePasswordContainer
                                }>
                                <View style={
                                    this.state.viewMode === "portrait" ||
                                    this.state.authMode === "login"
                                    ? styles.portraitPasswordWrapper 
                                    : styles.landscapePasswordWrapper
                                    }>
                                        {/* Valid & Touched are used for validity to apply styling
                                                if the field is incorrect it will appear RED
                                                the validity check is from Password === ConfirmPassword,
                                                if FALSE the ConfirmPassword field will appear RED until TRUE    
                                        */}
                                    <DefaultInput 
                                        placeholder="Password" 
                                        style={styles.input} 
                                        value={this.state.controls.password.value}
                                        onChangeText={(val) => this.updateInputState('password', val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        secureTextEntry
                                        // secureTextEntry is a boolean so leaving it empty will return True
                                        />
                                </View>

                                {/* confirmPasswordControl displays confirmPassword field when in "SignUp" authMode */}
                                {confirmPasswordControl}
                            </View>
                        </View>
                </TouchableWithoutFeedback>
                {/* disabled is passed through, to check whether the validity of all fields is true
                    ! = NOT, so if each state is NOT .valid, it will set itself to Disabled
                        which takes away the Touchable component from ButtonWithBackground.js (UI)
                */}
                <ButtonWithBackground 
                    onPress={this.loginHandler}
                    disabled={
                        /* Effectively, we want this button to be disabled until everything is valid. 
                            but login doesn't contain confirmPassword, so confirmPass is chained with authMode sign up.
                            thus eliminating it from the check when in "Login"
                        */
                        !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" || 
                        !this.state.controls.email.valid || 
                        !this.state.controls.password.valid
                        }
                        >Submit</ButtonWithBackground>
            </KeyboardAvoidingView>
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

// Dispatching props value of authData to Redux
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData))
    };
};

export default connect(null, mapDispatchToProps)(AuthScreen);