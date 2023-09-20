import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PaymentComponent = ({ Reference, RNumber, PDate, RId, PAmount }: any) => {
    return (
        <View className='flex-1'>
            <ScrollView>
                <View style={styles.card}>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Receipt No:</Text>
                        <Text>{RNumber}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Payment date:</Text>
                        <Text>{PDate}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>NCBA Reference:</Text>
                        <Text>{Reference}</Text>
                    </View>

                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Risk ID:</Text>
                        <Text>{RId}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Paid amount:</Text>
                        <Text>{PAmount}</Text>
                    </View>

                    <View className='item-center bg-[#302A29] p-4 mt-4 rounded-md '>
                        <TouchableOpacity onPress={() => { }}>
                            <Text className='text-center text-white font-["gothici-Bold"]'>DETAILS</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
        </View>
    )
}

export default PaymentComponent

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