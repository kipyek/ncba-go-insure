import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Header } from '../../Component/Header'
import HomeCss from '../HomeCss'

const ClaimDocuments = () => {
    return (
        <View className='flex-1'>
            <Header
                label="Claims Documents"
            />
            <View style={HomeCss.introCard}>
                <View className='item-center bg-primary p-3 mt-4 rounded-md '>
                    <TouchableOpacity onPress={() => { }}>
                        <Text className='text-center text-white font-["gothici-Bold"]'>DOWNLOAD CLAIM FORM</Text>
                    </TouchableOpacity>
                </View>

                <View className='item-center bg-primary p-3 mt-2 rounded-md '>
                    <TouchableOpacity onPress={() => { }}>
                        <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT CLAIM DOCUMENTS</Text>
                    </TouchableOpacity>
                </View>

                <View className='item-center bg-primary p-3 mt-2 rounded-md '>
                    <TouchableOpacity onPress={() => { }}>
                        <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT DOCUMENTS LATER</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default ClaimDocuments;