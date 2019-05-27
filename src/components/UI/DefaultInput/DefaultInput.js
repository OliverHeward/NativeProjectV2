import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// default input styling variable
const defaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.input, props.style]} 
        // Props.style is being passed to take in any style property passed into this on another screen
        // into the array
        // props is passed through to allow for this to be used always
        />
);

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        marginTop: 10,
        marginBottom: 10
    }
});

export default defaultInput;