import { Text, TextInput, TouchableOpacity, View, ScrollView, } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'moment';
import { Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DropDown from '../../Component/DropDown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Header } from '../../Component/Header';
import StepperComponet from '../../Component/StepperComponet';
import { useNavigation } from '@react-navigation/native';
import { apis } from '../../Services';
import userData from '../../Component/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { companiesDetails } from '../../Component/util';

const QuoteConfirm = ({ route }: any) => {
    const { item, addedBenefits, allBenefits } = route.params

    const navigation: any = useNavigation()
    const activeUser = userData();

    const [number, setNumber] = useState("");
    const [date, setDate] = useState<any>(null);
    const [expiryDate, setExpiryDate] = useState<any>(null);
    const [referral, setReferral] = useState([]);
    const [payPoints, setPayPoints] = useState([]);
    const [selectedReferral, setSelectedReferral] = useState(null);
    const [selectedPayPoints, setSelectedPayPoints] = useState(null);
    const [policyDate, setPolicyDate] = useState<any>(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibles, setDatePickerVisibilitys] = useState(false);
    const [finance, setFinance] = useState(false)
    const [visible, setVisible] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [listData, setListData] = useState<any>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('filledData');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    setListData(parsedData)
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }
        fetchData();
        handleReferral();
        handlePaypoints()
    }, [])

    const handlefinance = () => {
        setFinance(!finance)
    }

    const handleConfirm = () => {
        setConfirmed(!confirmed)
    }

    const hideDatePickerPolicy = () => {
        setDatePickerVisibilitys(false)
    }

    const handleConfirmPolicy = (date: any) => {
        setPolicyDate(date)
        hideDatePickerPolicy()
    }

    const handleNext = () => {
        handleConfirmQUote()
    }



    const handleReferral = () => {
        apis.get("Common/ReferralSources")
            .then(response => {
                const data = response.data
                setReferral(data)
            }).catch(error => {
                console.log(error.response?.data?.message)
            })
    }

    const handlePaypoints = () => {
        apis.get("Common/Paypoints")
            .then(response => {
                const data = response.data
                setPayPoints(data)
            }).catch(error => {
                console.log(error.response?.data?.message)
            })
    }

    const handleConfirmQUote = () => {
        setVisible(true)
        const payload = {
            "commencementDate": policyDate,
            "expiryDate": policyDate,
            "productId": item?.productId,
            "sumInsured": addedBenefits?.sumInsured,
            "basicPremium": addedBenefits?.basicPremium,
            "extensions": addedBenefits?.extensions,
            "phcf": addedBenefits?.phcf,
            "stampDuty": addedBenefits?.stampDuty,
            "trainingLevy": addedBenefits?.trainingLevy,
            "whTax": addedBenefits?.whTax,
            "grossPremium": addedBenefits?.grossPremium,
            "customerId": 0,
            "userID": activeUser.userId,
            "sessionId": listData?.sessionId,
            "referralSource": selectedReferral ? selectedReferral : 0,
            "customer": {
                "surname": activeUser.surname,
                "firstName": activeUser.firstName,
                "otherNames": activeUser.otherName,
                "mobileNo": activeUser.userPhone,
                "emailAddress": activeUser.userEmail,
                "physicalAddress": "",
                "clientType": 0,
                "dateOfBirth": activeUser.dob,
                "idNumber": activeUser.userId,
                "gender": "",
                "pin": activeUser.pin,
                "id": 0,
                "idType": 0,
                "customerType": 1
            },
            "policyId": 0,
            "branchId": 0,
            "additionalBenefits": allBenefits,
            "phoneNumber": activeUser?.userPhone,
            "registrationNo": number, //registration number
            "make": listData?.make,
            "model": listData?.model,
            "yom": listData?.yom,
            "agentId": "",
            "isClient": true,
            "windscreen": listData.windscreenValue,
            "entertainment": listData.entertainmentValue,
            "windscreenPremium": addedBenefits?.windscreenPremium,
            "entertainmentPremium": addedBenefits?.entertainmentPremium,
            "isFinanced": finance,
            "paypoint": selectedPayPoints ? selectedPayPoints : 0,
            "insurerId": item?.insurerId

        }
        console.log("Quote payload", payload)
        apis.post("MotorQuotes/ConfirmQuoteClient", payload)
            .then(response => {
                const data = response.data
                navigation.navigate("QuoteFinish", { item: data })
                console.log("confirmed data", data)
            }).catch(error => {
                console.log("error", error.response.data)
            }).finally(() =>
                setVisible(false)
            )
    }




    return (
        <Fragment>
            <View>
                <Header
                    label={"Get Quote"}
                />
                <StepperComponet currentPage={3} />

                <ScrollView >
                    <View className='ml-4 mr-4 mb-52'>
                        <View className=''>
                            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Please provide the vehicle registration number.</Text>
                            <TextInput
                                className='p-1 rounded-md flex-1'
                                style={{ borderWidth: 1 }}
                                onChangeText={text => setNumber(text)}
                                value={number}
                                placeholder="e.g KAA 123A"
                                keyboardType="default"
                            />
                        </View>

                        <View className='mt-2 mb-2'>
                            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Select policy start date</Text>
                            <View className='flex-row justify-between p-2 rounded-md' style={{ borderWidth: 1 }}>
                                {policyDate ?
                                    <Text>{Moment(policyDate).format('Do MMMM, YYYY')}</Text>
                                    :
                                    <Text className='text-gray-400'>Select policy start date</Text>
                                }
                                <Fontisto name="date" size={20} color="black" onPress={() => setDatePickerVisibilitys(true)} />
                            </View>
                        </View>


                        <View className='mt-2 '>
                            <Text className=' font-[gothici-Regular]'>Please tell us more about yourself.</Text>
                            <Text className=' font-[gothici-Regular]'>If you already have an account, please click </Text>
                            <Text className=' font-[gothici-Regular]'>here to login</Text>
                        </View>

                        {/**Start of Condition for financing */}
                        <View className='mt-4 mb-2'>
                            <View className='flex-row items-center mb-2'>
                                <TouchableOpacity onPress={handlefinance}>
                                    {finance ?
                                        <FontAwesome name="check-square-o" size={24} color="black" />
                                        :
                                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                                    }

                                </TouchableOpacity>
                                <Text className='font-[gothici-Regular] ml-2 mr-4'>Select the box if the vehicle is financed by a financial institution or used as security for a loan.</Text>
                            </View>

                            {finance ?
                                <View>
                                    <Text className=' mt-1 font-[gothici-Regular]'>Select the financial institution here</Text>
                                    <DropDown
                                        label={"description"}
                                        value={"id"}
                                        onchange={(item: any) => setSelectedPayPoints(item?.id)}
                                        datas={payPoints}
                                        placeholder=''
                                    />
                                </View>
                                : null
                            }
                        </View>
                        {/**End of Condition for financing */}

                        <View className='mb-2'>
                            <Text className=' mb-1 mt-3 font-[gothici-Regular]'>How did you hear about us?</Text>
                            <DropDown
                                label={"description"}
                                value={"id"}
                                onchange={(item: any) => setSelectedReferral(item?.id)}
                                datas={referral}
                                placeholder=''
                            />
                        </View>

                        {/**Confirmation of information */}
                        <View className='flex-row mb-2'>
                            <TouchableOpacity onPress={handleConfirm}>
                                {confirmed ?
                                    <FontAwesome name="check-square-o" size={24} color="black" />
                                    :
                                    <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                                }
                            </TouchableOpacity>
                            <Text className='font-[gothici-Regular] ml-2 mr-4'>I confirm that the information provided here is accurate</Text>
                        </View>


                        {/**Buttons */}
                        <View className='flex-row justify-between'>
                            <View className='item-center bg-primary p-2 mt-3 rounded-md w-32'>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text className='text-center text-white font-["gothici-Bold"]'>BACK</Text>
                                </TouchableOpacity>
                            </View>
                            {confirmed ?
                                <View className='item-center bg-[#EEE017] p-3 mt-2 rounded-md w-32'>
                                    {!visible ?
                                        <TouchableOpacity onPress={handleNext}>
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
                </ScrollView>
            </View>

            <DateTimePicker
                isVisible={isDatePickerVisibles}
                mode="date"
                display='default'
                pickerContainerStyleIOS={{ justifyContent: "center", paddingHorizontal: 150 }}
                onConfirm={handleConfirmPolicy}
                onCancel={hideDatePickerPolicy}
                minimumDate={new Date()}
            />

            {/* <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                display='default'
                pickerContainerStyleIOS={{ justifyContent: "center", paddingHorizontal: 150 }}
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            /> */}
        </Fragment>
    )
}

export default QuoteConfirm;