import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const startTabs = () => {
    // Promise waits for Icon's to be loaded/resolved, a .then is used which will turn them into an array.
    Promise.all([
        // The promise has Platform library checking for device and displaying different styled icons
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share-alt", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        // sources relates to a naming convension for image source
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "NativeProject.FindPlaceScreen", 
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                    // Source being called for icon 1
                    
                },
                {
                    screen: "NativeProject.SharePlaceScreen", 
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                            icon: sources[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                            }
                        ]
                    }
                    // Source being called for icon 2
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            drawer: {
                left: {
                    screen: "NativeProject.SideDrawer",

                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            }
        });
    })
};

export default startTabs;
