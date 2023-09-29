import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { Entypo } from "@expo/vector-icons"
import HomeCss from '../HomeCss';
import Toast from 'react-native-root-toast';
import { handleToastCopied } from '../../Component/Toast';

const MPesa = () => {
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('')
    const api = "Q01721";
    const apiPaybill = "488496";
    const apiAmount = "62,842.00"


    const handleToggling = () => {
        setShow(!show)
    };

    const copyPaybill = async (item: any) => {
        console.log(item)
        await Clipboard.setStringAsync(apiPaybill);
        handleToastCopied(item)
    };

    const copyAccount = async (item: any) => {
        await Clipboard.setStringAsync(api);
        handleToastCopied(item)
    };

    return (
        <ScrollView>
            <View className=' mb-40'>
                {/**STK Push */}
                {!show &&
                    <View style={HomeCss.introCard}>
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

                        <View className='item-center bg-primary p-2 mt-4 rounded-md w-24'>
                            <TouchableOpacity>
                                <Text className='text-center text-white font-["gothici-Bold"]'>PAY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
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
                    <View style={HomeCss.introCard}>
                        <Text className='font-[gothici-Regular] mb-1'>Alternatively, follow the steps below:</Text>
                        <Text className='font-[gothici-Regular] mb-1'>1. On M-Pesa menu, select <Text className='font-[gothici-Bold]'>Lipa na M-Pesa</Text></Text>
                        <Text className='font-[gothici-Regular] mb-1'>2. Choose <Text className='font-[gothici-Bold]'>Paybill</Text></Text>
                        <Text className='font-[gothici-Regular] mb-1'>3. Key in paybill number <Text className='font-[gothici-Bold] bg-gray-400' onPress={() => copyPaybill(apiPaybill)}>{apiPaybill}</Text></Text>
                        <Text className='font-[gothici-Regular] mb-1'>4. Enter <Text className='font-[gothici-Bold] bg-gray-400' onPress={() => copyPaybill(api)}>{api}</Text> as the account number</Text>
                        <Text className='font-[gothici-Regular] mb-1'>5. Enter amount to pay (You are required to pay at least Kes <Text className='font-[gothici-Bold]'>{apiAmount}</Text> for your policy to be approved)</Text>
                        <Text className='font-[gothici-Regular] mb-1'>6. Submit</Text>
                    </View>
                }

                {/**Actions */}
                <View className='ml-4 mr-4 mt-2 '>
                    <Text className='font-[gothici-Regular]'>If you have already paid, confirm by clicking the button below:</Text>
                    <View className='item-center bg-primary p-3 mt-4 rounded-md '>
                        <TouchableOpacity>
                            <Text className='text-center text-white font-["gothici-Bold"]'>CONFIRM PAYMENT</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default MPesa;