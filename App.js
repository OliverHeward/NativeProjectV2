import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import configureStore from "./src/store/configureStore";

// Redux Store fired
const store = configureStore();

// Register Screens

// Redux is passed to the end of each screen to enable state stablility + control passing
Navigation.registerComponent("NativeProject.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("NativeProject.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("NativeProject.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("NativeProject.PlaceDetailScreen", () => PlaceDetailScreen)

// Start The App

Navigation.startSingleScreenApp({
  screen: {
    screen: "NativeProject.AuthScreen",
    title: "Login"
  }
});