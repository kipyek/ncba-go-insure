import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import ClaimComponent from '../../Component/ClaimComponent'

const Claims = () => {
    return (
        <View className='flex-1'>
            <View className='mr-4 ml-4 mt-2'>
                <TextInput
                    style={{
                        height: 40,
                        borderRadius: 10,
                        paddingLeft: 20,
                        marginBottom: 10,
                        backgroundColor: 'grey',
                    }}
                    //   onChangeText={(text) => {
                    //     searchFilterFunction(text)
                    //     UpdateSearch(text)
                    //   }}
                    //value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Enter text to search"
                />
            </View>

            <ClaimComponent
                RNumber="2"
                CNumber="2"
                PNumber="2"
                CDate="2"
                PType="2"
                RLocation="2"
                Status="2"
            />
        </View>
    )
}

export default Claims

const styles = StyleSheet.create({})