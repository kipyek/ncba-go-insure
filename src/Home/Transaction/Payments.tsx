import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import PaymentComponent from '../../Component/PaymentComponent'

const Payments = () => {
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

            <PaymentComponent
                Reference="3"
                RNumber="3"
                PDate="3"
                RId="3"
                PAmount="3"
            />
        </View>
    )
}

export default Payments;