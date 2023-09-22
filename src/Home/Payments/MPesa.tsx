import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from "@expo/vector-icons"

const MPesa = () => {
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('')
    const api = "Q01721";
    const apiPaybill = "488496";
    const apiAmount = "62,842.00"


    const handleToggling = () => {
        setShow(!show)
    }
    return (
        <ScrollView>
            <View className=' mb-40'>
                {/**STK Push */}
                <View style={styles.introCard}>
                    <Text className='text-[#666666] font-[gothici-Bold]'>You are required to pay at least Kes 62,842.00 for your policy to be approved</Text>
                    <View>
                        <Text className='mb-1 mt-3 font-[gothici-Regular]'>Enter your Mpesa phone number</Text>
                        <TextInput
                            className='p-1 rounded-md flex-1'
                            style={{ borderWidth: 1 }}
                            onChangeText={text => setPhone(text)}
                            value={phone}
                            placeholder="0718477980"
                            keyboardType="default"
                        />
                    </View>
                    <View>
                        <Text className='mb-1 mt-3 font-[gothici-Regular]'>Enter amount to pay</Text>
                        <TextInput
                            className='p-1 rounded-md flex-1'
                            style={{ borderWidth: 1 }}
                            onChangeText={text => setAmount(text)}
                            value={amount}
                            placeholder="0718477980"
                            keyboardType="default"
                        />
                    </View>

                    <View className='item-center bg-[#302A29] p-2 mt-4 rounded-md w-24'>
                        <TouchableOpacity>
                            <Text className='text-center text-white font-["gothici-Bold"]'>PAY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/**Start Alternative */}
                <TouchableOpacity
                    onPress={() => handleToggling()}
                    className='flex-row justify-between bg-gray-200 ml-4 mr-4 pl-1 pr-1'>
                    <Text className='font-[gothici-Regular]'>Click here to see alternative</Text>
                    {!show ?
                        <Entypo name="chevron-small-up" size={24} color="black" />
                        :
                        <Entypo name="chevron-small-down" size={24} color="black" />
                    }
                </TouchableOpacity>
                {/**End Alternative */}
                {/**Paybill */}
                {show &&
                    <View style={styles.introCard}>
                        <Text className='font-[gothici-Regular] mb-1'>Alternatively, follow the steps below:</Text>
                        <Text className='font-[gothici-Regular] mb-1'>1. On M-Pesa menu, select<Text className='font-[gothici-Bold]'>Lipa na M-Pesa</Text></Text>
                        <Text className='font-[gothici-Regular] mb-1'>2. Choose <Text className='font-[gothici-Bold]'>Paybill</Text></Text>
                        <Text className='font-[gothici-Regular] mb-1'>3. Key in paybill number <Text className='font-[gothici-Bold]'>{apiPaybill}</Text></Text>
                        <Text className='font-[gothici-Regular] mb-1'>4. Enter <Text className='font-[gothici-Bold]'>{api}</Text> as the account number</Text>
                        <Text className='font-[gothici-Regular] mb-1'>5. Enter amount to pay (You are required to pay at least Kes <Text className='font-[gothici-Bold]'>{apiAmount}</Text> for your policy to be approved)</Text>
                        <Text className='font-[gothici-Regular] mb-1'>6. Submit</Text>
                    </View>
                }

                {/**Actions */}
                <View className='ml-4 mr-4 mt-2 '>
                    <Text className='font-[gothici-Regular]'>If you have already paid, confirm by clicking the button below:</Text>
                    <View className='item-center bg-[#302A29] p-3 mt-4 rounded-md '>
                        <TouchableOpacity>
                            <Text className='text-center text-white font-["gothici-Bold"]'>CONFIRM PAYMENT</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default MPesa

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