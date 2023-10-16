import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    image: {
        width: "100%",
        height: '40%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    helpImage: {
        width: "100%",
        height: '15%',
        marginTop: 40,

    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    introCard: {
        backgroundColor: '#87CEEB',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    warningCard: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginTop: 50,
        marginBottom: 20
    },
});