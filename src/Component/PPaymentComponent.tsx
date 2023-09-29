import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PPaymentComponent = ({ description, DNumber, PNumber, IssuedDate, RId, AOustanding }: any) => {
    return (
        <View className='flex-1'>
            <ScrollView>
                <View style={styles.card}>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Debit No:</Text>
                        <Text>{DNumber}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Policy No:</Text>
                        <Text>{PNumber}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Description:</Text>
                        <Text>{description}</Text>
                    </View>

                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Date issued:</Text>
                        <Text>{IssuedDate}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Risk ID:</Text>
                        <Text>{RId}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Oustanding amount:</Text>
                        <Text>{AOustanding}</Text>
                    </View>

                    <View className='item-center bg-primary p-2 mt-4 rounded-md '>
                        <TouchableOpacity onPress={() => { }}>
                            <Text className='text-center text-white font-["gothici-Bold"]'>DETAILS</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
        </View>
    )
}

export default PPaymentComponent

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