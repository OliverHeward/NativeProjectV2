import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';


class PickImage extends Component {
    state = {
        // Setting initial state to null
        pickedImaged: null
    }

    // Image Handler function
    pickImageHandler = () => {
        // ImagePicker API 
        ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
            // res handler from the ImagePicker API if user Did Cancel
            if (res.didCancel) {
                console.log("User cancelled!");
                // If there was an error
            } else if (res.error) {
                console.log("Error", res.error);
                // Successful
            } else {
                this.setState({
                    // Set state to the URI of the Image - Image comes through as a base 64 version (image as string)
                    pickedImaged: { uri: res.uri }
                });
                // base64 is passed through to hold string data for the image
                this.props.onImagePicked({uri: res.uri, base64: res.data});
            }
        });
    }

    render() {
        return( 
        <View style={styles.container}>                 
            <View style={styles.placeholder}>
                <Image source={this.state.pickedImaged} style={styles.previewImage}/>
            </View>
            <View style={styles.button}>
                <Button title="Pick Image" onPress={this.pickImageHandler} />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150,
        marginTop: 10
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
})

export default PickImage;