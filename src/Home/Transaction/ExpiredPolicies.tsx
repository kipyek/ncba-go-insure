import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import APolicies from '../../Component/APolicies'

const ExpiredPolicies = () => {
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
                Cdate="1"
                Product="1"
                Insurer="1"
                Reg="1"
                Edate="1"
                Sinsured="1"
                Gross="1"
            />
        </View>
    )
}

export default ExpiredPolicies

const styles = StyleSheet.create({})