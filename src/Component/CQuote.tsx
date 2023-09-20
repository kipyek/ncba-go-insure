import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CQuote = ({ Quote, Product, Insurer, Reg, Gross, Amount, Oustanding }: any) => {
    return (
        <View className='flex-1'>
            <ScrollView>
                <View style={styles.card}>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Quote No:</Text>
                        <Text>{Quote}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Product:</Text>
                        <Text>{Product}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Insurer:</Text>
                        <Text>{Insurer}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Registration No:</Text>
                        <Text>{Reg}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Gross Premium:</Text>
                        <Text>{Gross}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Amount:</Text>
                        <Text>{Amount}</Text>
                    </View>
                    <View className='flex-row mt-4 justify-between bg-gray-200'>
                        <Text className={'font-["gothici-Bold"]'}>Outstanding amount:</Text>
                        <Text>{Oustanding}</Text>
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

export default CQuote

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