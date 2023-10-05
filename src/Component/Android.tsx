import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#047857",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});