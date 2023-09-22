import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import APolicies from '../../Component/APolicies'

const ActivePolicies = () => {
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
            <APolicies
                Cdate="0"
                Product="0"
                Insurer="0"
                Reg="0"
                Edate="0"
                Sinsured="0"
                Gross="0"
            />

        </View>
    )
}

export default ActivePolicies;