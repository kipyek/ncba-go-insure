import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import HomeCss from '../HomeCss';
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import { apis } from '../../Services';
import Humanize from 'humanize-plus';
import { companiesDetails } from '../../Component/util';
import apiHeaders from '../../Component/apiHeaders';

const IpfTerms = ({ item }: any) => {
    const payload = item;
    //console.log("IpfTerm", item)
    const headers = apiHeaders();
    const navigation: any = useNavigation();
    const [confirmed, setConfirmed] = useState(false);
    const [baseForm, setBaseForm] = useState(null);
    const [show, setShow] = useState(false);  //add to condition for checking whether amount and months are selected

    const handleConfirm = () => {
        setConfirmed(!confirmed)
    }

    const handleDownloadForm = () => {
        apis.get(`Common/IPFForm?id=1852`)
            .then(response => {
                const data = response.data
                console.log("IpfData", data)
                setBaseForm(data)
                navigation.navigate("IpfDocument", { item: data })
            }).catch(error => {
                console.log(error.response?.data?.message)
            })
    }

    const handleApplyIPF = () => {
        const payloads =
        {
            "quoteId": (payload?.item.quotationNo).toString(),
            "accountNo": "",
            "noOfInstallments": payload.value,
            "installmentAmount": payload.amount,
            "fileName": "",
            "fileContent": ""
        }
        apis.post("IPF/ApplyIPF", payloads, {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data
                handleDownloadForm()
                console.log("ApplyIPF", data)
            }).catch(error => {
                console.log("ApplyIPFs", error.response.data)
            })
    }
    return (
        <View>
            <View style={HomeCss.introCard}>
                <Text className='font-[gothici-Regular]'>You are about to apply an IPF of <Text className='font-[gothici-Bold]'>Kes {Humanize.formatNumber(payload.item.grossPremium, 2)}</Text></Text>
                <Text className='font-[gothici-Regular]'>Your monthly installment amount will be <Text className='font-[gothici-Bold]'>Kes {Humanize.formatNumber(payload.amount, 2)}</Text> payable in <Text className='font-[gothici-Bold]'>{payload.value}</Text> installments.</Text>
            </View>

            {/**Confirmation of read of terms and conditions */}
            <View className='flex-row mb-2'>
                <TouchableOpacity onPress={handleConfirm}>
                    {confirmed ?
                        <FontAwesome name="check-square-o" size={24} color="black" />
                        :
                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    }
                </TouchableOpacity>
                <Text className='font-[gothici-Regular] ml-2 mr-4'> I have read and understood <Text className=' font-bold'>terms and conditions</Text></Text>
            </View>

            {/**Button */}
            <View className=''>
                {confirmed ?
                    <View className='item-center bg-[#EEE017] p-3 mt-2 rounded-md w-32'>
                        {!show ?
                            <TouchableOpacity onPress={() => handleApplyIPF()}>
                                <Text className='text-center font-["gothici-Bold"]'>{companiesDetails.submission}</Text>
                            </TouchableOpacity>
                            :
                            <Text className='text-center text-white font-["gothici-Bold"]'>Processing...</Text>
                        }

                    </View>
                    :
                    null}
            </View>
        </View>
    )
}

export default IpfTerms

const styles = StyleSheet.create({})