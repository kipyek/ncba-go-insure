import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import HomeCss from '../HomeCss';
import Humanize from 'humanize-plus';
import StepperComponet from '../../Component/StepperComponet';
import { Header } from '../../Component/Header';
import { Ionicons } from "@expo/vector-icons"
import { apis } from '../../Services';
import userData from '../../Component/UserData';
import uuid from 'react-native-uuid';
import CryptoJS from 'crypto-js';
import { companiesDetails } from '../../Component/util';
import apiHeaders from '../../Component/apiHeaders';

const QuoteFinish = ({ route }: any) => {
    const { item } = route.params;
    const activeUser = userData();
    const headers = apiHeaders()
    const [visible, setVisible] = useState(false)
    const navigation: any = useNavigation();


    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e: any) => {
                e.preventDefault();
            }),
        [navigation]
    );

    const handleSubmitQuote = () => {
        setVisible(true)
        apis.get(`Common/GetQuote?quoteId=${item.quoteId}`, {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data
                const doc = data?.documents
                const hasNullContent = doc.some((i: any) => i.fileName === null);
                if (hasNullContent === false) {
                    navigation.replace("QuoteDetails", { item: data })
                } else {
                    navigation.navigate("Details", { item: data })
                }

            }).catch(error => {
                console.log(error.response?.data)
            }).finally(() => {
                setVisible(false)
            })
    }

    return (
        <View>
            <Header
                label={"Get Quote"}
                leftButton={{
                    child: <Ionicons name="arrow-back" size={24} color="black" />,
                    onPress: () => { navigation.navigate("Quote") }
                }}
            />
            <StepperComponet currentPage={4} />
            <View style={HomeCss.introCard}>
                <Text className='font-[gothici-Regular]'>Your quotation number is <Text className='font-bold font-[gothici-Regular]'>{item?.quoteNo}</Text> and total payable is <Text className='font-bold font-[gothici-Regular]'>Kes {Humanize.formatNumber(item?.premiumAmount, 2)}</Text></Text>
                <Text className='font-[gothici-Regular]'>Please click on  <Text className='font-bold font-[gothici-Regular]'>{companiesDetails.submission}</Text> to proceed to buy the cover. If you wish to quote for another vehicle, please click on <Text className='font-bold font-[gothici-Regular]'>"NEW QUOTE"</Text></Text>

                <View className='flex-row justify-between'>
                    <View className='item-center bg-[#EEE017] p-1 mt-4 rounded-md w-32'>
                        {!visible ?
                            <TouchableOpacity onPress={() => handleSubmitQuote()}>
                                <Text className='text-center font-["gothici-Bold"]'>{companiesDetails.submission}</Text>
                            </TouchableOpacity>
                            :
                            <Text className='text-center font-["gothici-Bold"] text-white'>Processing...</Text>
                        }
                    </View>
                    <View className='item-center bg-primary p-1 mt-4 rounded-md w-32'>
                        <TouchableOpacity onPress={() => navigation.navigate("Quote")}>
                            <Text className='text-center text-white font-["gothici-Bold"]'>NEW QUOTE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default QuoteFinish;