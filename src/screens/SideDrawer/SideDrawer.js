import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class SideDrawer extends Component {
    render() {
        return(
            // Width style being drawn in to set the width of the drawer view to 80% of the screen
            // Handy for Andriod
            // Style is set to an array to allow for stylesheet at dimensions width
            <View style={[styles.container, {width: Dimensions.get("window").width * 0.8}]} >
                <Text>SideDrawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 55,
        paddingLeft: 10,
        backgroundColor: "white",
        flex: 1
    }
})

export default SideDrawer;