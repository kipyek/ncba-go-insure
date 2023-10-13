import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AuthCss from '../AuthCss';
import { api } from '../../Services';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
    const navigation = useNavigation
    const [password, setPassword] = useState('');
    const [code, setCode] = useState<any>(null);

    const handleResetPassword = () => {
        const payload = {
            "Email": "",
            "Code": 98582,
            "Password": ""
        }
        api.post("authentication/Reset/Update", payload)
            .then(response => {
                const data = response.data
                console.log("success", data)
            }).catch(error => {
                console.log(error.response)
            })
    }
    return (
        <View >
            <View className='mt-14'>
                <View style={AuthCss.card}>
                    <Text className='font-["gothici-Regular"]' style={{ fontSize: 22 }}>Reset password</Text>
                    <Text className='font-["gothici-Regular"]' style={{ fontSize: 13 }}>Enter your code and preferred password</Text>
                </View>

                <View className='mr-2 ml-2 mt-6'>

                    <Text className='mb-1 font-[gothici-Regular]'>Enter Code</Text>
                    <TextInput
                        className='p-1 rounded-md '
                        style={{ borderWidth: 1 }}
                        onChangeText={text => setCode(text)}
                        value={code}
                        placeholder="Enter received Code"
                        keyboardType="default"
                    />

                    <Text className='mb-1 mt-4 font-[gothici-Regular]'>Enter your preferred password</Text>
                    <TextInput
                        className='p-1 rounded-md '
                        style={{ borderWidth: 1 }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Enter your Password"
                        keyboardType="default"
                    />

                    <View className='item-center bg-primary p-3 mt-4 rounded-md '>
                        <TouchableOpacity onPress={() => handleResetPassword()}>
                            <Text className='text-center text-white font-["gothici-Bold"]'>RESET</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default ResetPassword;