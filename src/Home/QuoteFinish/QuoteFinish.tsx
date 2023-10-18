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

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
    btoa: (input: string = '') => {
        let str = input;
        let output = '';

        for (let block = 0, charCode, i = 0, map = chars;
            str.charAt(i | 0) || (map = '=', i % 1);
            output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

            charCode = str.charCodeAt(i += 3 / 4);

            if (charCode > 0xFF) {
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }

            block = block << 8 | charCode;
        }

        return output;
    },
};

const QuoteFinish = ({ route }: any) => {
    const { item } = route.params;
    const activeUser = userData()
    const [security, setSecurity] = useState<any>(null)
    const [userSession, setUserSession] = useState<any>(null)
    const [visible, setVisible] = useState(false)
    const navigation: any = useNavigation();

    useEffect(() => {
        sendTest()
    }, [activeUser.userId])


    function sendTest() {
        let userId = activeUser.userId;
        let uid: any = uuid.v4();
        let base64 = Base64.btoa(uid);
        let userKey = base64 + 'Digitek22';

        let securityToken = encrypt(userId, userKey);
        setSecurity(securityToken)
        console.log(userId)
        let UserSessionId = base64;
        setUserSession(UserSessionId)
        console.log(securityToken, UserSessionId)

    }


    function encrypt(plainText: any, key: any) {
        key = CryptoJS.enc.Utf8.parse(key);
        key = CryptoJS.MD5(key)
        key.words.push(key.words[0], key.words[1]);
        var options = {
            mode: CryptoJS.mode.ECB
        };

        let textWordArray = CryptoJS.enc.Utf8.parse(plainText);
        let encrypted = CryptoJS.TripleDES.encrypt(textWordArray, key, options);
        let base64String = encrypted.toString();
        return base64String;
    }

    // const handleOnClick = () => {
    //     navigation.replace("QuoteRequest")

    // }

    const handleSubmitQuote = () => {
        setVisible(true)
        apis.get(`Common/GetQuote?quoteId=${item.quoteId}`, {
            headers: {
                "SecurityToken": security,
                "UserSessionId": userSession,
            },
        })
            .then(response => {
                const data = response.data
                navigation.navigate("QuoteDetails", { item: data })
                console.log("all data", data)
            }).catch(error => {
                console.log(error.response)
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