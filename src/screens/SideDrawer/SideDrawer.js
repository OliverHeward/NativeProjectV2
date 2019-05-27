import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
    render() {
        return(
            // Width style being drawn in to set the width of the drawer view to 80% of the screen
            // Handy for Andriod
            // Style is set to an array to allow for stylesheet at dimensions width
            <View style={[styles.container, {width: Dimensions.get("window").width * 0.8}]} >
                <TouchableOpacity>
                    <View style={styles.drawerItem}>
                        <Icon 
                            style={styles.drawerItemIcon}
                            // Platform checking for Icon change due to icon styling difference
                            name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"} 
                            size={30} 
                            color="#aaa"/>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10
    }
})

export default SideDrawer;