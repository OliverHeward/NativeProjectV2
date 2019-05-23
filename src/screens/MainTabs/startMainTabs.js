import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const startTabs = () => {
    // Promise waits for Icon's to be loaded/resolved, a .then is used which will turn them into an array.
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("share", 30),
        Icon.getImageSource("ios-menu", 30)
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
            drawer: {
                left: {
                    screen: "NativeProject.SideDrawer",

                }
            }
        });
    })
};

export default startTabs;
