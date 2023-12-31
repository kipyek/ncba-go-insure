import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Header } from '../../Component/Header'
import DropDown from '../../Component/DropDown'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Fontisto, FontAwesome, MaterialIcons } from "@expo/vector-icons"
import Moment from 'moment';
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import HomeCss from '../HomeCss';
import { apis } from '../../Services';


const ClaimForm = ({ route }: any) => {
    const { item } = route?.params
    const navigation: any = useNavigation()
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [insuredItems, setInsuredItems] = useState([])
    const [date, setDate] = useState<any>(null);
    const [station, setStation] = useState('');
    const [refNumber, setRefNumber] = useState('');
    const [accident, setAccident] = useState('');
    const [detail, setDetail] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState(false);
    const [allInsuredItems, setAllInsuredItems] = useState<any>(null)
    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')
    const [error3, setError3] = useState('')
    const [error4, setError4] = useState('')
    const [error5, setError5] = useState('')
    const [error6, setError6] = useState('')
    const [error7, setError7] = useState('')

    useEffect(() => {
        handleInsuredItem()
    }, [selectedClaim])


    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirmDate = (date: any) => {
        setDate(date)

        hideDatePicker()
    }

    const handleReport = () => {
        setReport(!report)
    }

    const handleInsuredItem = async () => {
        await apis.get(`MotorQuotes/GetPolicy?id=${selectedClaim}`)
            .then(response => {
                const allData = response.data
                const data = response.data?.insuredItems
                setInsuredItems(data)
                setAllInsuredItems(allData)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
    }

    const handleClaimDetails = (id: any) => {
        apis.get(`Claims/ClaimDetails?id=${id}`)
            .then(response => {
                const data = response.data
                navigation.navigate("ClaimDocuments", { item: data, id: id })
                console.log("claims details", data)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
    }

    const handleSavings = () => {
        const startDate = allInsuredItems?.commencementDate;
        const start = startDate?.split("T")[0];
        const endDate = allInsuredItems?.expiryDate;
        const end = endDate?.split("T")[0]
        const targetDate = Moment(date).format('YYYY-MM-DD')
        if (targetDate >= start && targetDate <= end) {
            setIsLoading(true)
            const policyId = item[0]?.policyID
            const payload = {
                "id": 0,
                "claimDate": date,
                "claimNo": null,
                "policyNo": null,
                "customer": null,
                "dateOfLoss": date,
                "dateReported": new Date(),
                "claimDetails": detail,
                "natureOfLoss": null,
                "claimCausationId": 0,
                "claimCausation": null,
                "natureOfLossId": 0,
                "natureOfLossCode": null,
                "insuredItemId": selectedItem?.id,
                "registrationNo": null,
                "policyId": policyId,
                "product": null,
                "closureStatus": null,
                "claimAmount": 0,
                "estimatedClaimAmount": 0,
                "claimCausationCode": null,
                "reportedToPolice": report,
                "policeStationReported": report ? station : null,
                "obReferenceNo": report ? refNumber : null,
                "riskLocation": accident,
                "version": null,
                "driverFirstName": null,
                "driverMiddleName": null,
                "driverSurname": null,
                "driverLicenceNo": null,
                "driverLicenceClass": null,
                "driverNationalId": null,
                "injuriesIncurred": null,
                "vehicleMovability": null,
                "progresses": [],
                "documents": []
            }
            apis.post("Claims/SaveClaim", payload)
                .then(response => {
                    const data = response.data;
                    handleClaimDetails(data)
                    setIsLoading(false)
                    console.log("saving", data)
                })
                .catch(error => {
                    console.log(error.response.data.message)
                    setIsLoading(false)
                })
        } else {
            alert('Your selected date is not between the commencement and Expiry dates of your policy.');
        }
    }

    const handleSaving = () => {
        if (!selectedClaim) {
            setError1("Select policy to claim")
        } else if (!selectedItem) {
            setError2("Select insured item")
        } else if (!date) {
            setError3("Select when it occurred")
        } else if (!accident) {
            setError4("Enter where the accident occurred")
        } else if (!detail) {
            setError5("Type short description of what happen")
        } else if (!station && report) {
            setError6("Enter the name of police station")
        } else if (!refNumber && report) {
            setError7("Enter OB number")
        } else {
            handleSavings()
        }
    }

    return (
        <Fragment>
            <View className='flex-1'>
                <Header
                    label="Claims"
                    leftButton={{
                        child: <Ionicons name="arrow-back" size={24} color="black" />,
                        onPress: () => { navigation.goBack() }
                    }}
                />
                {/**Intro */}
                <View style={HomeCss.introCard}>
                    <Text className='font-[gothici-Regular]'>
                        Please enter details about your claim, A customer support agent will contact you as soon as possible.
                    </Text>
                    <Text className='font-[gothici-Regular]'>All fields mark with asterisk(*) are required.</Text>
                </View>

                {/**Fields */}
                <ScrollView>
                    <View className='ml-2 mr-2 mb-2'>
                        <View className='mb-2'>
                            <Text className=' mb-1 mt-3 font-[gothici-Regular]'>Select policy to claim*</Text>
                            <DropDown
                                label={"registrationNumber"}
                                value={"id"}
                                onchange={(item: any) => setSelectedClaim(item?.id)}
                                datas={item}
                                placeholder='---select policy---'
                            />
                            {!selectedClaim && error1 && <Text className='text-red-600'>{error1}</Text>}
                        </View>

                        <View className='mb-2'>
                            <Text className=' mb-1 mt-3 font-[gothici-Regular]'>Select insured item below*</Text>
                            <DropDown
                                label={"itemName"}
                                value={"id"}
                                onchange={(item: any) => setSelectedItem(item)}
                                datas={insuredItems}
                                placeholder=''
                            />
                            {!selectedItem && error2 && <Text className='text-red-600'>{error2}</Text>}
                        </View>

                        <View className=' mb-2'>
                            <Text className='mb-1 mt-3 font-[gothici-Regular]'>When did accident/loss occur?*</Text>
                            <View className='flex-row justify-between p-2 rounded-md' style={{ borderWidth: 1 }}>
                                {date ?
                                    <Text>{Moment(date).format('Do MMMM, YYYY')}</Text>
                                    :
                                    <Text className='text-gray-400'>Select when the accident occur</Text>
                                }
                                <Fontisto name="date" size={20} color="black" onPress={() => setDatePickerVisibility(true)} />
                            </View>
                            {!date && error3 && <Text className='text-red-600 mt-1'>{error3}</Text>}
                        </View>

                        <View>
                            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Where did accident/loss occur?*</Text>
                            <TextInput
                                className='p-1 rounded-md mt-1'
                                style={{ borderWidth: 1 }}
                                onChangeText={text => setAccident(text)}
                                value={accident}
                                placeholder="Enter the location"
                                keyboardType="default"
                            />
                            {!accident && error4 && <Text className='text-red-600 mt-1'>{error4}</Text>}
                        </View>

                        <View>
                            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Briefly describe how the accident/loss occurred and the extent of demage/loss*</Text>
                            <TextInput
                                className='p-1 rounded-md mt-1 h-36'
                                style={{ borderWidth: 1, textAlignVertical: 'top' }}
                                onChangeText={text => setDetail(text)}
                                value={detail}
                                multiline
                                placeholder="Give brief description"
                                keyboardType="default"
                            />
                            {!detail && error5 && <Text className='text-red-600 mt-1'>{error5}</Text>}
                        </View>

                        {/**Report */}
                        <View className='flex-row items-center mt-4 '>
                            <TouchableOpacity onPress={handleReport}>
                                {report ?
                                    <FontAwesome name="check-square-o" size={24} color="black" />
                                    :
                                    <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                                }
                            </TouchableOpacity>
                            <Text className='font-[gothici-Regular] ml-2 mr-4'>Have you reported to the police? If not report soonest possible (within 24hours)</Text>
                        </View>
                        {report ?
                            <View>
                                <View>
                                    <Text className='mb-1 mt-3 font-[gothici-Regular]'>Which police station did you report?*</Text>
                                    <TextInput
                                        className='p-1 rounded-md mt-1'
                                        style={{ borderWidth: 1 }}
                                        onChangeText={text => setStation(text)}
                                        value={station}
                                        placeholder="Enter the station"
                                        keyboardType="default"
                                    />
                                    {!station && error6 && <Text className='text-red-600 mt-1'>{error6}</Text>}
                                </View>
                                <View>
                                    <Text className='mb-1 mt-3 font-[gothici-Regular]'>OB reference number*</Text>
                                    <TextInput
                                        className='p-1 rounded-md mt-1'
                                        style={{ borderWidth: 1 }}
                                        onChangeText={text => setRefNumber(text)}
                                        value={refNumber}
                                        placeholder="Enter the OB number"
                                        keyboardType="default"
                                    />
                                    {!refNumber && error7 && <Text className='text-red-600 mt-1'>{error7}</Text>}
                                </View>
                            </View>
                            :
                            null
                        }

                        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                            {!isLoading ?
                                <TouchableOpacity onPress={() => handleSaving()}>
                                    <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT</Text>
                                </TouchableOpacity>
                                :
                                <Text className='text-center text-white font-["gothici-Bold"]'>Processing...</Text>
                            }
                        </View>

                    </View>
                </ScrollView>

            </View>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                display='default'
                pickerContainerStyleIOS={{ justifyContent: "center", paddingHorizontal: 150 }}
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
                minimumDate={new Date(new Date().getTime() - (366 * 24 * 60 * 60 * 1000))}
                maximumDate={new Date()}
            />
        </Fragment>

    )
}

export default ClaimForm