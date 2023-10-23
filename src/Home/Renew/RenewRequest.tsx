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

const datas = [
    { label: 'First time', value: '1' },
    { label: 'Renewal', value: '2' },
];

const RenewRequest = () => {
    const navigation: any = useNavigation()
    const [value, setValue] = useState(null);
    const [uid, setUid] = useState<any>('');
    const [vehicleCost, setVehicleCost] = useState('');
    const [windscreen, setWindScreen] = useState<any>(null);
    const [eunit, setEunit] = useState<any>(null);
    const [isLoading, setisLoading] = useState(false);
    const [capacity, setCapacity] = useState('');
    const [dateRange, setDateRange] = useState([]);
    const [coverType, setCoverType] = useState([]);
    const [vehicleUsed, setVehicleUsed] = useState([]);
    const [motorType, setMotorType] = useState([]);
    const [make, setMake] = useState([]);
    const [model, setModel] = useState([]);
    const [date, setDate] = useState('');
    const [selectedCoverType, setSelectedCoverType] = useState<any>(Object);
    const [selectedMotorType, setSelectedMotorType] = useState<any>('');
    const [selectedMake, setSelectedMake] = useState<any>('');
    const [selectedModel, setSelectedModel] = useState<any>('');
    const [selectedVehicleUsed, setSelectedVehicleUsed] = useState<any>(Object);

    const activeUser = userData();
    const dispatch = useDispatch()


    useEffect(() => {
        handleGenerateYears();
        handleCoverType();
        handleMotorType();
        handleMotorType();
        handleMake();
        setUid(uuid.v4())

    }, []);


    useEffect(() => {
        handleModel();
    }, [selectedMake?.id, selectedMotorType]);

    useEffect(() => {
        handleVehicleUsed()
    }, [selectedMotorType, selectedCoverType]);

    const handleQuote = () => {

        navigation.navigate("RenewList")
    };



    const handleMorethan15 = () => {
        Alert.alert('Warning!!',
            'We note that your vehicle is over 15 years old from the date of manufacture. Kindly note that Comprehensive covers are mostly issued for vehicles below 15 years of age unless the insurance is being renewed at the same insurer. To purchase comprehensive cover, please select your current insurer from the list on the next page, otherwise your cover may be downgraded to a third party cover.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Send to my email', onPress: () => console.log('OK Pressed') },
            ]);
    }

    const handleGenerateYears = () => {
        const currentYear = new Date().getFullYear();
        const years40YearsAgo: any = [];

        for (let year = currentYear - 34; year < currentYear; year++) {
            years40YearsAgo.push({ year: (year + 1).toString(), value: years40YearsAgo.length + 1 });
        }
        const reverse = years40YearsAgo.reverse()
        setDateRange(reverse)

    }

    const handleCoverType = () => {
        apis.get("Common/CoverTypes")
            .then(response => {
                const data = response.data
                setCoverType(data)
            }).catch(error => {
                console.log("error1", error.response?.data?.message)
            })
    }


    const handleMotorType = () => {
        apis.get("Common/ProductClasses")
            .then(response => {
                const data = response.data
                setMotorType(data)
            }).catch(error => {
                console.log("error2", error.response?.data?.message)
            })
    }

    const handleMake = () => {
        apis.get("MotorQuotes/Makes")
            .then(response => {
                const data = response.data
                setMake(data)
            }).catch(error => {
                console.log("error3", error.response?.data?.message)
            })
    }

    const handleVehicleUsed = () => {
        apis.get(`Common/ProductGroups?productClass=${selectedMotorType}&coverType=${selectedCoverType.id}`)
            .then(response => {
                const data = response.data;
                setVehicleUsed(data)
            }).catch(error => {
                console.log("error4", error.response?.data?.message)
            })
    }

    const handleModel = () => {
        apis.get(`MotorQuotes/Models?makeId=${selectedMake?.id}&prodClass=${selectedMotorType}`)
            .then(response => {
                const data = response.data
                setModel(data)
            }).catch(error => {
                console.log("error5", error.response.data.message)
            })
    }

    // const handleEncryption = async () => {
    //   const digest = await Crypto.digestStringAsync(
    //     Crypto.CryptoDigestAlgorithm.SHA256,
    //     'Digitex22'
    //   );
    //   setSe
    // }

    const selectedFields = {
        "yom": date,
        "make": selectedMake.description,
        "model": selectedModel.description,
        "coverTypeId": selectedCoverType.description,
        "vehicleValue": vehicleCost,
        "sessionId": uid,
        "quoteType": value,
        "capacity": capacity ? capacity : 0,
        "windscreenValue": windscreen,
        "entertainmentValue": eunit,
    }


    const handleGetQuote = () => {
        setisLoading(true)
        const payload = {
            "productClassId": 1,
            "productGroupId": selectedVehicleUsed.id,
            "coverTypeId": selectedCoverType.id,
            "vehicleValue": vehicleCost,
            "policyPeriod": 12,
            "countryCode": "254",
            "emailAddress": activeUser.userEmail,
            "phoneNumber": activeUser.userPhone,
            "sessionId": uid,
            "userID": activeUser.userId,
            "quoteType": value,
            "capacity": capacity ? capacity : 0,
            "windscreenValue": windscreen,
            "entertainmentValue": eunit,
            "productId": 0,
            "additionalBenefits": []
        }
        apis.post("MotorQuotes/GetMotorQuote", payload)
            .then(response => {
                const data = response.data
                //dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data })
                const datas = JSON.stringify(data)
                AsyncStorage.setItem('motorQuote', datas);
                AsyncStorage.setItem("quoteData", JSON.stringify(payload))
                AsyncStorage.setItem("filledData", JSON.stringify(selectedFields))
                handleQuote()
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
                                    placeholder="BENTLEY"
                                    editable={false}
                                />
                            </View>

                            <View className='flex-1 ml-1'>
                                <Text className='mb-2 font-[gothici-Regular]'>Model of the motor</Text>
                                <TextInput
                                    className='p-1 rounded-md '
                                    style={{ borderWidth: 1 }}
                                    placeholder="CONTINENTAL"
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
                                    placeholder="KJF453R"
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
                                    placeholder="1,500,000"
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
                                <TouchableOpacity onPress={() => handleQuote()}>
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