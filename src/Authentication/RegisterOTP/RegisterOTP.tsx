import { Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import AuthCss from '../AuthCss'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { api } from '../../Services'

const validationSchema = Yup.object().shape({
    code: Yup
        .string()
        .required('Code is required'),
});

const RegisterOTP = ({ route }: any) => {
    const { item } = route.params
    console.log("Registration email", item)
    const navigation: any = useNavigation()
    const [isLoading, setisLoading] = useState(false)

    const handleRegisterOTP = (values: any) => {
        setisLoading(true)
        const payload = {
            "Email": item,
            "OTP": values.code
        }
        console.log(payload)

        api.post("authentication/VerifyAccount", payload)
            .then(response => {
                const data = response.data
                navigation.navigate("Login")
                //alert(data.message)
            }).catch(error => {
                console.log("Error in", error.response)
            }).finally(() =>
                setisLoading(false)
            )
    }
    return (
        <View className='bg-white flex-1'>
            <View className='mt-14 ml-4' style={AuthCss.card}>
                <Text className='font-["gothici-Regular"] text-[#333333]' style={{ fontSize: 20 }}>Welcome to NCBA Go Insure</Text>
                <Text className='font-["gothici-Regular"]' style={{ fontSize: 12 }}>Enter your authenticator code sent to your phone number and email</Text>
            </View>

            <Formik
                initialValues={{ code: '' }}
                validationSchema={validationSchema}
                onSubmit={values => handleRegisterOTP(values)}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <View className='mr-4 ml-4 mt-10'>
                        <TextInput
                            className='p-1 rounded-md '
                            style={{ borderWidth: 1 }}
                            onChangeText={handleChange("code")}
                            onBlur={handleBlur("code")}
                            placeholder="Enter the OTP code sent to your phone"
                            keyboardType="phone-pad"
                        />


                        <View className='item-center bg-primary p-3 mt-6 rounded-md'>
                            {!isLoading ?
                                <TouchableOpacity onPress={() => handleSubmit()}>
                                    <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT</Text>
                                </TouchableOpacity>
                                :
                                <Text className='text-center text-white font-["gothici-Bold"]'>Processing...</Text>
                            }

                        </View>

                    </View>
                )}
            </Formik>


        </View>

    )
}

export default RegisterOTP;