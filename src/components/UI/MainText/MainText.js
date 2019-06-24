import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Creating Base Text for MAIN TEXT
const mainText = props => (
    <Text style={styles.mainText}>
        {props.children}
    </Text>
);

const styles = StyleSheet.create({
    mainText: {
        color: "black",
        backgroundColor: "transparent"
    }
});

export default mainText;
// Exporting Main Text as a custom component