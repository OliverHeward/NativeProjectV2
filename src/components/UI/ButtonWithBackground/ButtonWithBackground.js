import React from 'react';
import { TouchableOpacity,
         Text, 
         View, 
         StyleSheet,
        Platform } from 'react-native';


const buttonWithBackground = props => {
    // variable storing content of Button Preset
    const content = (
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text style={styles.buttonText}>
                {props.children}
            </Text>
        </View>
    );
    // Platform API condition check to output according Touchable Effect
    if(Platform.OS === "android") {
        return(
        <TouchableNativeFeedBack onpress={props.onPress}>
            {content}
        </TouchableNativeFeedBack>
        );
    }   
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "black",
    },
    buttonText: {
        fontWeight: "bold",
    }
});

export default buttonWithBackground;