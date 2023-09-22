import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeCss from '../HomeCss';

const QuoteDetail = () => {
    return (
        <View className=' '>
            <View style={HomeCss.card}>
                <View className='flex-row justify-between bg-[#F5F5F5] p-1 rounded-sm mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Quote Number</Text>
                    <Text>Q01721</Text>
                </View>

                <View className='flex-row justify-between mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Product</Text>
                    <Text className='w-48'>MOTOR PSV - SELF DRIVE COMPREHENSIVE</Text>
                </View>

                <View className='flex-row justify-between bg-[#F5F5F5] p-1 rounded-sm mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Insurer</Text>
                    <Text className='w-48'>UAP Insurance Company Ltd</Text>
                </View>

                <View className='flex-row justify-between mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Commencement date</Text>
                    <Text>21-Sep-2023</Text>
                </View>

                <View className='flex-row justify-between bg-[#F5F5F5] p-1 rounded-sm mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Expiry date</Text>
                    <Text>19-Sep-2024</Text>
                </View>

                <View className='bg-[#F5F5F5] mt-4'>
                    <Text className='font-[gothici-Bold] text-center mt-4 mb-4' style={{ fontSize: 20 }}>Premium: Kes 184,828.00</Text>
                    <View className='flex-row justify-between p-2'>
                        <Text className='font-[gothici-Bold]'>Amount paid</Text>
                        <Text>Kes 0.00</Text>
                    </View>
                </View>

                <View className='flex-row justify-between'>
                    <Text className='font-[gothici-Bold] p-2'>Outstanding amount</Text>
                    <Text>Kes 184,828.00</Text>
                </View>
            </View>
        </View>
    )
}

export default QuoteDetail;