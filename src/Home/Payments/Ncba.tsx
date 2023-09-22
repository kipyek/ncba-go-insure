import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Ncba = () => {
    const api = "Q01721"
    return (
        <View>
            <View style={styles.introCard}>
                <Text className='font-[gothici-Bold] mb-3'>Pay from NCBA Account</Text>
                <Text className='font-[gothici-Regular] mb-1'>Please follow the steps below:</Text>
                <Text className='font-[gothici-Regular] mb-1'>1. Go to your NCBA NOW mobile banking app and log in.</Text>
                <Text className='font-[gothici-Regular] mb-1'>2. Click on <Text className='font-[gothici-Bold]'>"More"</Text> and scroll down to the <Text className='font-[gothici-Bold]'>"Insurance"</Text> tab.</Text>
                <Text className='font-[gothici-Regular] mb-1'>3. Click on <Text className='font-[gothici-Bold]'>"Insurance"</Text> and select the account to pay from.</Text>
                <Text className='font-[gothici-Regular] mb-1'>4. Input <Text className='font-[gothici-Bold]'>{api}</Text> in the field labelled <Text className='font-[gothici-Bold]'>"Debit Note or Quote Number"</Text> and click <Text className='font-[gothici-Bold]'>"Validate"</Text></Text>
                <Text className='font-[gothici-Regular] mb-1'>5. Confirm your details. If okay, proceed to enter amount and click <Text className='font-[gothici-Bold]'>"OK"</Text></Text>
                <Text className='font-[gothici-Regular] mb-1'>6. Click on "Confirm Payment"</Text>
            </View>
            <View className='ml-4 mr-4 mt-2 '>
                <Text className='font-[gothici-Regular]'>If you have already paid, confirm by clicking the button below:</Text>
                <View className='item-center bg-[#302A29] p-3 mt-4 rounded-md '>
                    <TouchableOpacity>
                        <Text className='text-center text-white font-["gothici-Bold"]'>CONFIRM PAYMENT</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Ncba

const styles = StyleSheet.create({
    introCard: {
        backgroundColor: '#87CEEB',
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