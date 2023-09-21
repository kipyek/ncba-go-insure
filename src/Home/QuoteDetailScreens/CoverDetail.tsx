import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { Fragment, useState } from 'react';
import { Entypo } from "@expo/vector-icons";
import { Cover } from '../../../DummyData/Data';
import { BottomModal, ModalContent } from 'react-native-modals';

const CoverDetail = () => {
    const [show, setShow] = useState(false);
    const [showPremium, setShowPremium] = useState(false);
    const [modalVisibles, setModalVisibles] = useState(false);

    const handleToggling = () => {
        setShow(!show)
        setShowPremium(false)
    }

    const handlePremium = () => {
        setShow(false)
        setShowPremium(!showPremium)
    }
    return (
        <Fragment>
            <View>
                <View className='ml-4 mr-4'>
                    {/**start of Insurance company logic*/}
                    <View className='flex-row items-center'>
                        <Image source={require("../../../assets/images/uap.jpg")} className='w-32 h-32 mr-4' />
                        <View className=' w-48'>
                            <Text className='font-[gothici-Regular]'>UAP Insurance Company Ltd </Text>
                            <Text className='font-[gothici-Bold]'>MOTOR PSV - SELF DRIVE COMPREHENSIVE</Text>
                        </View>
                    </View>

                    {/**start of Your Details logic*/}
                    <View className='bg-gray-200 pb-2 pr-1 pl-1 mt-4'>
                        <TouchableOpacity
                            onPress={() => handleToggling()}
                            className='flex-row justify-between items-center'>
                            <Text>YOUR DETAILS</Text>
                            {!show ?
                                <Entypo name="chevron-small-up" size={24} color="black" />
                                :
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            }
                        </TouchableOpacity>
                        {/**Your Details */}
                        {show &&
                            <View>
                                <View className='flex-row justify-between gap-1 mt-2'>
                                    <View className='flex-1'>
                                        <Text className='font-[gothici-Regular]'>Policy holder name</Text>
                                        <TextInput
                                            className='p-1 rounded-md'
                                            style={{ borderWidth: 1 }}
                                            //onChangeText={text => setPassword(text)}
                                            //value={password}
                                            editable={false}
                                            placeholder="Denis Kipyegon"
                                            keyboardType="default"
                                        />
                                    </View>

                                    <View className=''>
                                        <Text className='font-[gothici-Regular]'>Mobile number</Text>
                                        <TextInput
                                            className='p-1 rounded-md'
                                            style={{ borderWidth: 1 }}
                                            //onChangeText={text => setPass(text)}
                                            //value={pass}
                                            editable={false}
                                            placeholder="0719345756"
                                            keyboardType="default"
                                        />
                                    </View>
                                </View>


                                <View className='mt-2'>
                                    <Text className='font-[gothici-Regular]'>Email address</Text>
                                    <TextInput
                                        className='p-1 rounded-md'
                                        style={{ borderWidth: 1 }}
                                        //onChangeText={text => setPass(text)}
                                        //value={pass}
                                        editable={false}
                                        placeholder="d.kipyek@gmail.com"
                                        keyboardType="default"
                                    />
                                </View>

                                <View className='flex-row justify-between gap-1 mt-2'>
                                    <View className='flex-1'>
                                        <Text className='font-[gothici-Regular]'>Cover period</Text>
                                        <TextInput
                                            className='p-1 rounded-md'
                                            style={{ borderWidth: 1 }}
                                            //onChangeText={text => setPassword(text)}
                                            //value={password}
                                            editable={false}
                                            placeholder="21-Sep-2023 to 19-Sep-2024"
                                            keyboardType="default"
                                        />
                                    </View>

                                    <View className=''>
                                        <Text className='font-[gothici-Regular]'>Vehicle reg No</Text>
                                        <TextInput
                                            className='p-1 rounded-md'
                                            style={{ borderWidth: 1 }}
                                            //onChangeText={text => setPass(text)}
                                            //value={pass}
                                            editable={false}
                                            placeholder="KAZ 123W"
                                            keyboardType="default"
                                        />
                                    </View>

                                </View>
                            </View>
                        }
                    </View>

                    {/**start of Premium logic*/}
                    <View className='bg-gray-200 pb-2 pr-1 pl-1 mt-2'>
                        <TouchableOpacity
                            onPress={() => handlePremium()}
                            className='flex-row justify-between items-center'>
                            <Text>PREMIUM COMPUTATIONS</Text>
                            {!showPremium ?
                                <Entypo name="chevron-small-up" size={24} color="black" />
                                :
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            }
                        </TouchableOpacity>

                        {/**Premium Computations */}
                        {showPremium &&
                            <View>
                                <View className='flex-row justify-between rounded-sm mt-1'>
                                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Basic premium:</Text>
                                    <Text className='font-[gothici-Regular]'>Kes 184,000</Text>
                                </View>

                                <View className='flex-row justify-between mt-1'>
                                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Extensions:</Text>
                                    <Text className='font-[gothici-Regular]'>Kes 0</Text>
                                </View>

                                <View className='flex-row justify-between mt-1'>
                                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Total premium:</Text>
                                    <Text className='font-[gothici-Regular]'>Kes 184,000</Text>
                                </View>

                                <View className='flex-row justify-between mt-1'>
                                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Levies:</Text>
                                    <Text className='font-[gothici-Regular]'>Kes 828</Text>
                                </View>

                                <View className='flex-row justify-between mt-1'>
                                    <Text className='font-[gothici-Bold]' style={{ fontSize: 16 }}>Gross premium: </Text>
                                    <Text className='font-[gothici-Regular]'>Kes 184,828</Text>
                                </View>
                            </View>
                        }
                    </View>

                    {/**start of Premium logic*/}
                    <View className='bg-gray-200 pb-2 pr-1 pl-1 mt-2'>
                        <TouchableOpacity
                            onPress={() => setModalVisibles(true)}
                            className='flex-row justify-between items-center'>
                            <Text>READ COVER SUMMARY</Text>
                            {!showPremium ?
                                <Entypo name="chevron-small-up" size={24} color="black" />
                                :
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            }
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
            {/**Cover Summary */}
            <BottomModal
                visible={modalVisibles}
                onTouchOutside={() => setModalVisibles(false)}
                onHardwareBackPress={() => true}
                onSwipeOut={() => setModalVisibles(false)}
            >
                <ModalContent>
                    <View style={{ borderWidth: 1, width: 50, alignSelf: 'center', marginBottom: 12, borderColor: 'gray' }} />
                    <View>
                        {Cover.map(i =>
                            <View key={i.title}>
                                <Text className='text-center mt-1 mb-1 font-[gothici-Bold]'>{i.title}</Text>
                                <Text>{i.body}</Text>
                            </View>
                        )}
                    </View>
                </ModalContent>
            </BottomModal>
        </Fragment>

    )
}

export default CoverDetail

const styles = StyleSheet.create({})