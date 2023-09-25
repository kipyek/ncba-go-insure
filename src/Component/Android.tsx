import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#87CEEB",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});