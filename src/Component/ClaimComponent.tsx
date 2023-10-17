import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ClaimComponent = ({ RNumber, CNumber, PNumber, CDate, PType, RLocation, Status }: any) => {
    return (
        <View>
            <View style={styles.card}>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Claim No:</Text>
                    <Text>{CNumber}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Claim date:</Text>
                    <Text>{CDate}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Policy No:</Text>
                    <Text>{PNumber}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Registration No:</Text>
                    <Text>{RNumber}</Text>
                </View>

                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Policy type:</Text>
                    <Text className='w-48'>{PType}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Risk location:</Text>
                    <Text>{RLocation}</Text>
                </View>
                <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                    <Text className={'font-["gothici-Bold"]'}>Status:</Text>
                    <Text>{Status}</Text>
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

export default ClaimComponent

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