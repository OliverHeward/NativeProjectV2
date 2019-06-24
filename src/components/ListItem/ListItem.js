import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Creating custom component ListItem
const listItem = props => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Image resizeMode="cover" source={props.placeImage} style={styles.placeImage} />
            <Text>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        marginBottom: 5,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
    },
    placeImage: {
        marginRight: 8,
        height: 50,
        width: 50,
    }
});

export default listItem;
// Exporting Custom ListItem Component