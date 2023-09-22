import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { Fragment, useState } from 'react'
import { Header } from '../../Component/Header'
import DropDown from '../../Component/DropDown'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Fontisto, FontAwesome, MaterialIcons } from "@expo/vector-icons"
import Moment from 'moment';
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';

const data = [
    { label: 'Health', value: '1' },
    { label: 'Life', value: '2' },
    { label: 'Homeowner', value: '3' },
    { label: 'Car Insurance', value: '4' },
];

const ClaimForm = () => {
    const navigation: any = useNavigation()
    const [value, setValue] = useState('');
    const [date, setDate] = useState(null);
    const [station, setStation] = useState('');
    const [refNumber, setRefNumber] = useState('');
    const [accident, setAccident] = useState('');
    const [detail, setDetail] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [report, setReport] = useState(false);

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
                <View style={styles.introCard}>
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
                                label={"label"}
                                value={"value"}
                                onchange={(item: any) => setValue(item?.value)}
                                datas={data}
                                placeholder='---select policy---'
                            />
                        </View>

                        <View className='mb-2'>
                            <Text className=' mb-1 mt-3 font-[gothici-Regular]'>Select insured item below*</Text>
                            <DropDown
                                label={"label"}
                                value={"value"}
                                onchange={(item: any) => setValue(item?.value)}
                                datas={data}
                                placeholder=''
                            />
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
                        </View>

                        <View>
                            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Briefly describe how the accident/loss occurred and the extent of demage/loss*</Text>
                            <TextInput
                                className='p-1 rounded-md mt-1'
                                style={{ borderWidth: 1 }}
                                onChangeText={text => setDetail(text)}
                                value={detail}
                                placeholder="Enter the location"
                                keyboardType="default"
                            />
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
                                    <Text className='mb-1 mt-3 font-[gothici-Regular]'>Which polic station did you report?*</Text>
                                    <TextInput
                                        className='p-1 rounded-md mt-1'
                                        style={{ borderWidth: 1 }}
                                        onChangeText={text => setStation(text)}
                                        value={station}
                                        placeholder="Enter the station"
                                        keyboardType="default"
                                    />
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
                                </View>
                            </View>
                            :
                            null
                        }

                        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                            <TouchableOpacity onPress={() => navigation.navigate("ClaimDocuments")}>
                                <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT</Text>
                            </TouchableOpacity>
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
            />
        </Fragment>

    )
}

export default ClaimForm

const styles = StyleSheet.create({
    introCard: {
        backgroundColor: '#87CEEB',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    }
})