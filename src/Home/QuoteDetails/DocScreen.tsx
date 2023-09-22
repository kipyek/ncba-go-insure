import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons"
import { Box } from '../../Component/Theme'
import HomeCss from '../HomeCss'
const DocScreen = () => {
    return (
        <View className=' flex-1'>
            <ScrollView>
                <View className='ml-4 mr-4 mt-2'>
                    <Text className='font-[gothici-Regular]'>Upload all required documents first before you can proceed to next steps</Text>
                    <Box className='mt-4'>
                        <View className='mb-4'>
                            <View style={HomeCss.container1}>
                                <View style={HomeCss.uploadBtnContainer1}>
                                    <TouchableOpacity onPress={() => { }} style={HomeCss.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Upload National ID /Passport</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className='mb-4'>
                            <View style={HomeCss.container1}>
                                <View style={HomeCss.uploadBtnContainer1}>
                                    <TouchableOpacity onPress={() => { }} style={HomeCss.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Upload Logbook or Import Documents</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className='mb-4'>
                            <View style={HomeCss.container1}>
                                <View style={HomeCss.uploadBtnContainer1}>
                                    <TouchableOpacity onPress={() => { }} style={HomeCss.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Fully Filled Proposal Forms</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>




                        <View style={HomeCss.container1}>
                            <View style={HomeCss.uploadBtnContainer1}>
                                <TouchableOpacity onPress={() => { }} style={HomeCss.uploadBtn} >
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

export default DocScreen;