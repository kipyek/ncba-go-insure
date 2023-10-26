import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import DropDown from '../../Component/DropDown'
import { Alert } from 'react-native';
import HomeCss from '../HomeCss';
import { apis } from '../../Services';
import userData from '../../Component/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import StepperComponet from '../../Component/StepperComponet'
import { Header } from '../../Component/Header'
import Humanize from 'humanize-plus';
import { setFirstTime, setCapacitys } from '../../../Slices/QuoteSlice';
import apiHeaders from '../../Component/apiHeaders';

const datas = [
    { label: 'First time', value: '1' },
    { label: 'Renewal', value: '2' },
];

const RenewRequest = ({ route }: any) => {
    const { item } = route.params
    const navigation: any = useNavigation();
    const headers = apiHeaders();
    const [value, setValue] = useState(null);
    const [uid, setUid] = useState<any>('');
    const [vehicleCost, setVehicleCost] = useState('');
    const [windscreen, setWindScreen] = useState<any>(null);
    const [eunit, setEunit] = useState<any>(null);
    const [motor, setMotor] = useState<any>(Object);
    const [renewalData, setRenewalData] = useState<any>(Object);
    const [isLoading, setisLoading] = useState(false);
    const [capacity, setCapacity] = useState('');
    const [selectedCoverType, setSelectedCoverType] = useState<any>(Object);
    const [selectedVehicleUsed, setSelectedVehicleUsed] = useState<any>(Object);

    const activeUser = userData();

    useEffect(() => {
        setUid(uuid.v4())
    }, []);

    useEffect(() => { handleRenewals() }, [activeUser.userId])

    function FIndMotor(vehicle: any) {
        return vehicle.registrationNumber !== null;
    }

    const handleCheck = () => {
        if (vehicleCost === '') {
            alert("Input estimated vehicle value")
        } else {
            handleGetQuote()
        }
    }


    const handleRenewals = () => {
        apis.get(`Common/GenerateRenewal?policyId=${item.policyID}&isAgent=false`, {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data;
                const datas = data.policy.insuredItems
                const vehicle = datas.find(FIndMotor);
                setRenewalData(data)
                setMotor(vehicle)
                AsyncStorage.setItem('renewData', JSON.stringify(vehicle));
            })
            .catch(error => {
                console.log(error.response?.data)
            })
    };


    const selectedFields = {
        "windscreenValue": windscreen ? windscreen : renewalData.generatedQuoteRequest?.windscreenValue,
        "entertainmentValue": eunit ? eunit : renewalData.generatedQuoteRequest?.entertainmentValue,
        "sessionId": uid,
    }


    const handleGetQuote = () => {
        setisLoading(true)
        const payload = {
            "productClassId": 1,
            "productGroupId": renewalData.generatedQuoteRequest?.productGroupId,
            "coverTypeId": renewalData.generatedQuoteRequest?.coverTypeId,
            "vehicleValue": vehicleCost,
            "policyPeriod": 12,
            "countryCode": "254",
            "emailAddress": activeUser.userEmail,
            "phoneNumber": activeUser.userPhone,
            "sessionId": uid,
            "userID": activeUser.userId,
            "quoteType": renewalData.generatedQuoteRequest?.quoteType,
            "capacity": renewalData.generatedQuoteRequest?.capacity,
            "windscreenValue": windscreen ? windscreen : renewalData.generatedQuoteRequest?.windscreenValue,
            "entertainmentValue": eunit ? eunit : renewalData.generatedQuoteRequest?.entertainmentValue,
            "productId": 0,
            "additionalBenefits": []
        }
        console.log("request request", payload)
        apis.post("MotorQuotes/GetMotorQuote", payload)
            .then(response => {
                const data = response.data
                //dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data })
                const datas = JSON.stringify(data)
                AsyncStorage.setItem('RenewMotorQuotes', datas);
                AsyncStorage.setItem("RenewQuoteDatas", JSON.stringify(payload))
                AsyncStorage.setItem("RenewUserData", JSON.stringify(selectedFields))

                navigation.navigate("RenewList")
                console.log("request requestssss", payload)
            }).catch(error => {
                console.log("error", error.response?.data)
            }).finally(() =>
                setisLoading(false)
            )
    }


    return (
        <View className='flex-1 bg-white'>
            <StatusBar backgroundColor='#87CEEB' />
            <Header
                label={"Get Quote"}
            />


            <ScrollView >
                <View className=' mb-5 ml-1 mr-1 mt-2'>
                    <Text className='font-[gothici-Bold] text-xl ml-2 mr-2'>Vehicle Details</Text>

                    <View className='ml-2 mr-2 mt-4'>
                        {/**Make and model */}
                        <View className='flex-row justify-between'>
                            <View className='flex-1 mr-1'>
                                <Text className='mb-2 font-[gothici-Regular]'>Make of the motor</Text>
                                <TextInput
                                    className='p-1 rounded-md '
                                    style={{ borderWidth: 1 }}
                                    placeholder={motor?.make}
                                    editable={false}
                                />
                            </View>

                            <View className='flex-1 ml-1'>
                                <Text className='mb-2 font-[gothici-Regular]'>Model of the motor</Text>
                                <TextInput
                                    className='p-1 rounded-md '
                                    style={{ borderWidth: 1 }}
                                    placeholder={motor?.model}
                                    editable={false}
                                />
                            </View>


                        </View>
                        {/**Registration Number and Estimated value */}
                        <View className='flex-row justify-between mt-6'>
                            <View className='flex-1 mr-1'>
                                <Text className='mb-2 font-[gothici-Regular]'>Vehicle registration</Text>
                                <TextInput
                                    className='p-1 rounded-md '
                                    style={{ borderWidth: 1 }}
                                    placeholder={motor?.registration}
                                    editable={false}
                                />
                            </View>

                            <View className='flex-1 ml-1'>
                                <Text className='mb-2 font-[gothici-Regular]'>Vehicle value*</Text>
                                <TextInput
                                    className='p-1 rounded-md flex-1'
                                    style={{ borderWidth: 1 }}
                                    onChangeText={text => setVehicleCost(text)}
                                    value={vehicleCost}
                                    placeholder="0"
                                    keyboardType="phone-pad"
                                />
                            </View>


                        </View>
                        {/**WindScreen and Eunit */}
                        <View className='flex-row justify-between mt-6'>
                            <View className='flex-1 mr-1'>
                                <Text className='mb-2 font-[gothici-Regular]'>Windscreen value*</Text>
                                <TextInput
                                    className='p-1 rounded-md flex-1'
                                    style={{ borderWidth: 1 }}
                                    onChangeText={text => setWindScreen(text)}
                                    value={windscreen}
                                    placeholder="50,000"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View className='flex-1 ml-1'>
                                <Text className='mb-2 font-[gothici-Regular]'>E-unit value*</Text>
                                <TextInput
                                    className='p-1 rounded-md flex-1'
                                    style={{ borderWidth: 1 }}
                                    onChangeText={text => setEunit(text)}
                                    value={eunit}
                                    placeholder="30,000"
                                    keyboardType="numeric"
                                />
                            </View>

                        </View>



                        <View className='item-center bg-primary p-4 mt-8 rounded-md '>
                            {!isLoading ?
                                <TouchableOpacity onPress={() => handleCheck()}>
                                    <Text className='text-center text-white font-["gothici-Bold"]'>GET QUOTE</Text>
                                </TouchableOpacity>
                                :
                                <Text className='text-center text-white font-["gothici-Bold"]'>Getting quote...</Text>
                            }
                        </View>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default RenewRequest

const styles = StyleSheet.create({})