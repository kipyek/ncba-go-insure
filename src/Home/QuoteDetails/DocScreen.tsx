import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons"
import { Box } from '../../Component/Theme'
const DocScreen = () => {
    return (
        <View className=' flex-1'>
            <ScrollView>
                <View className='ml-4 mr-4 mt-2'>
                    <Text className='font-[gothici-Regular]'>Upload all required documents first before you can proceed to next steps</Text>
                    <Box className='mt-4'>
                        <View className='mb-4'>
                            <View style={styles.container1}>
                                <View style={styles.uploadBtnContainer1}>
                                    <TouchableOpacity onPress={() => { }} style={styles.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Upload National ID /Passport</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className='mb-4'>
                            <View style={styles.container1}>
                                <View style={styles.uploadBtnContainer1}>
                                    <TouchableOpacity onPress={() => { }} style={styles.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Upload Logbook or Import Documents</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className='mb-4'>
                            <View style={styles.container1}>
                                <View style={styles.uploadBtnContainer1}>
                                    <TouchableOpacity onPress={() => { }} style={styles.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Fully Filled Proposal Forms</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>




                        <View style={styles.container1}>
                            <View style={styles.uploadBtnContainer1}>
                                <TouchableOpacity onPress={() => { }} style={styles.uploadBtn} >
                                    <Text className='font-[gothici-Regular]'>Copy of KRA PIN</Text>
                                    <AntDesign name="plus" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Box>
                </View>
            </ScrollView>

        </View >
    )
}

export default DocScreen

const styles = StyleSheet.create({
    container1: {
        elevation: 10,
        height: 100,
        width: "100%",
        backgroundColor: '#efefef',
        position: 'relative',
        borderStyle: 'dotted',
        borderRadius: 9,
        borderWidth: 2.5,
        borderColor: '#302A29',
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
    }
})