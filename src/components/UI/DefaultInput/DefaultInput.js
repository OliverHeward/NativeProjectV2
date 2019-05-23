import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// default input styling variable
const defaultInput = props => (
    <TextInput
        style={styles.input} 
        underlineColorAndroid="transparent"
        {...props}
        // props is passed through to allow for this to be used always
        />
);

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        margin: 10,
    }
});

export default defaultInput;