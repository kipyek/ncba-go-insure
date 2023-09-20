import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CQuote from '../../Component/CQuote'

const ConfirmedQuote = () => {
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
                    placeholder="Search by Quote No"
                />
            </View>

            <CQuote
                Quote={100}
                Product={90}
                Insurer={89}
                Reg={43}
                Gross={23}
                Amount={67}
                Oustanding={65}
            />
        </View>
    )
}

export default ConfirmedQuote

const styles = StyleSheet.create({
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
})