import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// default input styling variable
const defaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null ]} 
        /*  Props.style is being passed to take in any style property passed into this on another screen
                into the array
                props is passed through to allow for this to be used always 
            a style check is made for validity,
                if the check is true, (meaning the field is incorrect) styles.invalid is fired.
                    else null is added (meaning its false and the field is correct)
        */
        />
);

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    // Invalid entry style
    invalid: {
        backgroundColor: "#f9c0c0",
        borderColor: "red"
    }
});

export default defaultInput;