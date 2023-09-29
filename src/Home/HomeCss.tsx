import { StyleSheet } from "react-native";

export default StyleSheet.create({
    claimImage: {
        flex: 1,
        opacity: 0.3
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
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
    homeImage: {
        width: "100%",
        height: '100%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        opacity: 0.4
    },
    stepIndicator: {
        marginTop: 10,
        marginBottom: 20
    },
    container1: {
        elevation: 10,
        height: 100,
        width: "100%",
        backgroundColor: '#efefef',
        position: 'relative',
        borderStyle: 'dotted',
        borderRadius: 9,
        borderWidth: 2.5,
        borderColor: 'primary',
        overflow: 'hidden',
        justifyContent: 'center',
        alignSelf: "center"

    },
    uploadBtnContainer: {
        opacity: 0.9,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtnContainer1: {
        opacity: 0.8,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '55%',

    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
})