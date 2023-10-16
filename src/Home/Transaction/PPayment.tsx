import { TextInput, View } from 'react-native'
import React from 'react'
import PPaymentComponent from '../../Component/PPaymentComponent'

const PPayment = () => {
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

            <PPaymentComponent
                description="4"
                DNumber="4"
                PNumber="4"
                IssuedDate="4"
                RId="4"
                AOustanding="4"
            />
        </View>
    )
}

export default PPayment;