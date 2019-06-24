import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Creating custom Heading Text function
const headingText = props => (
    <Text {...props} style={[styles.textHeading, props.style]}>
        {props.children}
        </Text>
);

const styles = StyleSheet.create({
    textHeading: {
        fontSize: 28,
        fontWeight: "bold"
    },
})

export default headingText;
// Exporting Custom Heading Text Component