import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const APolicies = ({ Cdate, Product, Insurer, Reg, Edate, Sinsured, Gross }: any) => {
    return (
        <View className=''>
            <View style={styles.card}>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Product:</Text>
                    <Text className='w-48'>{Product}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Registration No:</Text>
                    <Text>{Reg}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md '>
                    <Text className={'font-["gothici-Bold"] '}>Insurer:</Text>
                    <Text className='w-48'>{Insurer}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Commencement date:</Text>
                    <Text>{Cdate}</Text>
                </View>

                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Expiry date:</Text>
                    <Text>{Edate}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Sum insured:</Text>
                    <Text>{Sinsured}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Gross premium:</Text>
                    <Text>{Gross}</Text>
                </View>

                <View className='item-center bg-primary p-2 mt-4 rounded-md '>
                    <TouchableOpacity onPress={() => { }}>
                        <Text className='text-center text-white font-["gothici-Bold"]'>DETAILS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default APolicies

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