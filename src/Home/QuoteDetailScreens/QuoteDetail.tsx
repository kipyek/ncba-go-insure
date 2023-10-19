import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeCss from '../HomeCss';
import Humanize from 'humanize-plus';

const QuoteDetail = ({ item }: any) => {
    const data = item

    const OutstandingAmount = data?.totalPremium - data?.paidAmount
    return (
        <View className=' '>
            <View style={HomeCss.card}>
                <View className='flex-row justify-between bg-[#F5F5F5] p-1 rounded-sm mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Quote Number</Text>
                    <Text>{data?.quotationNo}</Text>
                </View>

                <View className='flex-row justify-between mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Product</Text>
                    <Text className='w-48'>{data?.product}</Text>
                </View>

                <View className='flex-row justify-between bg-[#F5F5F5] p-1 rounded-sm mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Insurer</Text>
                    <Text className='w-48'>{data?.insurer}</Text>
                </View>

                <View className='flex-row justify-between mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Commencement date</Text>
                    <Text className='w-36'>{data?.commencementDate}</Text>
                </View>

                <View className='flex-row justify-between bg-[#F5F5F5] p-1 rounded-sm mt-1'>
                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Expiry date</Text>
                    <Text>{data?.expiryDate}</Text>
                </View>

                <View className='bg-[#F5F5F5] mt-4'>
                    <Text className='font-[gothici-Bold] text-center mt-4 mb-4' style={{ fontSize: 20 }}>Premium: Kes {Humanize.formatNumber(data.totalPremium, 2)}</Text>
                    <View className='flex-row justify-between p-2'>
                        <Text className='font-[gothici-Bold]'>Amount paid</Text>
                        <Text>Kes {Humanize.formatNumber(data?.paidAmount, 2)}</Text>
                    </View>
                </View>

                <View className='flex-row justify-between'>
                    <Text className='font-[gothici-Bold] p-2'>Outstanding amount</Text>
                    <Text>Kes {Humanize.formatNumber(OutstandingAmount, 2)}</Text>
                </View>
            </View>
        </View>
    )
}

export default QuoteDetail;