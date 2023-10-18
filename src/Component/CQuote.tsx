import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CQuote = ({ Quote, Product, Insurer, Reg, Gross, Amount, Oustanding, onPress }: any) => {
    return (
        <View className=''>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.card}>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Quote No:</Text>
                        <Text>{Quote}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-2 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Product:</Text>
                        <Text className=' w-48'>{Product}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Insurer:</Text>
                        <Text className='w-48'>{Insurer}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Registration No:</Text>
                        <Text>{Reg}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Gross Premium:</Text>
                        <Text>{Gross}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Amount:</Text>
                        <Text>{Amount}</Text>
                    </View>
                    <View className='flex-row mt-1 justify-between bg-gray-200 p-1 rounded-md'>
                        <Text className={'font-["gothici-Bold"]'}>Outstanding amount:</Text>
                        <Text>{Oustanding}</Text>
                    </View>


                </View>
            </TouchableOpacity>

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