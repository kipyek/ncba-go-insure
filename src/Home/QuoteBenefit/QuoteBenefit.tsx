import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import HomeCss from '../HomeCss';
import { Header } from '../../Component/Header';
import StepperComponet from '../../Component/StepperComponet';
import Humanize from 'humanize-plus';
import { BottomModal, ModalContent } from 'react-native-modals';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, Feather } from "@expo/vector-icons"
import { apis } from '../../Services';

const Additionals = [
    {
        name: "Capsicum",
        price: 1.2
    },
    {
        name: "Paneer",
        price: 2.0
    },
    {
        name: "Red Paprika",
        price: 2.5
    },
]

const QuoteBenefit = ({ onNextStepPressSelection, handleBackStep, route }: any) => {
    const { item, benefits } = route?.params
    const navigation: any = useNavigation();
    const [total, setTotal] = useState(0);
    const [coverNotes, setCoverNotes] = useState([]);
    const [selected, setSelected] = useState([])
    const [show, setShow] = useState(false);
    const [modalVisibles, setModalVisibles] = useState(false);
    const [checkedState, setCheckedState] = useState(
        new Array(Additionals.length).fill(false)
    );


    useEffect(() => {
        handleNotes()
    }, [])
    const handleNext = () => {
        onNextStepPressSelection()
    };

    const handleBack = () => {
        handleBackStep()
    }
    const handleToggling = () => {
        setShow(!show)
    };

    const handleOptional = (position: any) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    return sum + Additionals[index].price;
                }
                return sum;
            },
            0
        );
        setTotal(totalPrice);
    };

    const handleNotes = () => {
        apis.get(`Common/CoverNotesWithInsured?productId=${item?.productId}&benefits=${""}&windScreen=${item?.windscreenPremium}&entertainmentUnit=${item?.entertainmentPremium}`)
            .then(response => {
                const data = response.data
                setCoverNotes(data)
                console.log("123", data)
            }).catch(error => {
                console.log(error.response?.data?.message)
            })
    }

    const handleSelection = (value: any) => {
        const updatedData: any = selected.filter((selected) => {
            //return selected.benefitId === value.benefitId
        })
        const data: any = [...selected, value]
        setSelected(data)
    }

    const Item = ({ item }: any) => (
        <View className='bg-gray-200 ml-4 mr-4 pl-1 pr-1 '>
            <TouchableOpacity onPress={() => handleSelection(item)}>
                <View className='flex-1 flex-row justify-between bg-gray-200 mt-2 '>
                    <Text className='text-center font-["gothici-Bold"]'>{item?.benefitName}</Text>
                    <View className=''>
                        {selected === item ?
                            <FontAwesome name="circle" size={20} color="#0066F6" />
                            :
                            <Feather name="circle" size={20} color="black" />
                        }
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );

    const renderApplicableBenefits = () => {
        return (
            show && <FlatList
                data={benefits}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item: any) => item.benefitId}
            />
        )
    }



    return (
        <Fragment>
            <View>
                <Header
                    label={"Get Quote"}
                />
                <StepperComponet currentPage={2} />
                <ScrollView>
                    <View className='mb-52'>
                        <View style={HomeCss.introCard}>
                            <Text className='font-[gothici-Regular]'>Please review the details of your quote including the scope of the cover under Cover Summary. To buy the cover, click "NEXT"</Text>
                        </View>

                        {/**Start of Applicable Benefits */}
                        <TouchableOpacity
                            onPress={() => handleToggling()}
                            className='flex-row justify-between bg-gray-200 ml-4 mr-4 pl-1 pr-1'>
                            <Text className='font-[gothici-Regular]'>Click here to see applicable benefits</Text>
                            {!show ?
                                <Entypo name="chevron-small-up" size={24} color="black" />
                                :
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            }
                        </TouchableOpacity>

                        {renderApplicableBenefits()}

                        <View style={HomeCss.card}>
                            <View className='item-center bg-primary p-1 mb-2 w-32  justify-end rounded-md '>
                                <TouchableOpacity onPress={() => setModalVisibles(true)}>
                                    <Text className='text-center text-white font-["gothici-Bold"]'>Cover Summary</Text>
                                </TouchableOpacity>
                            </View>
                            <View className='flex-row items-center'>
                                <Image source={{ uri: item.insurerLogo }} className='w-24 h-24' resizeMode='contain' />
                                <View className='w-48 ml-4 mb-2'>
                                    <Text>{item?.insurerName}</Text>
                                    <Text className='font-[gothici-Bold]'>{item?.productName}</Text>
                                    {/* <View className='item-center bg-primary p-2 mt-4 rounded-md '>
                                        <TouchableOpacity>
                                            <Text className='text-center text-white font-["gothici-Bold"]'>SEND TO MY EMAIL</Text>
                                        </TouchableOpacity>
                                    </View> */}

                                </View>

                            </View>

                            <View style={{ borderWidth: 0.6, opacity: 0.5, borderColor: 'grey' }} />
                            {/**Start of Additional selections */}
                            <View>
                                {/* {Additionals.map(({ name, price }, index) => {
        <View>
          <Text>{name}{price}</Text>
        </View>
      })} */}
                            </View>
                            {/**End of Additional selections */}
                            {/**Pricing */}
                            <View>
                                <View className='flex-row mt-4 justify-between bg-gray-200'>
                                    <Text>Basic premium:</Text>
                                    <Text className='font-bold ml-2'>Kes {Humanize.formatNumber(item?.basicPremium, 2)}</Text>
                                </View>

                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text>Windscreen:</Text>
                                    <Text className='font-bold ml-2'>Kes {Humanize.formatNumber(item?.windscreenPremium, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text>Entertainment unit:</Text>
                                    <Text className='font-bold ml-2'>Kes {Humanize.formatNumber(item?.entertainmentPremium, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text>Extensions:</Text>
                                    <Text className='font-bold ml-14'>Kes {Humanize.formatNumber(item?.extensions, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text>Total premium:</Text>
                                    <Text className='font-bold ml-2'>Kes {Humanize.formatNumber(item?.totalPremium, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text>Levies:</Text>
                                    <Text className='font-bold ml-16'>Kes {Humanize.formatNumber(item?.trainingLevy, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text className='font-bold '>Gross premium:</Text>
                                    <Text className='font-bold ml-2'>Kes {Humanize.formatNumber(item?.grossPremium, 2)}</Text>
                                </View>

                                <View className='flex-row justify-between mt-4'>
                                    <View className='item-center bg-primary p-2 mt-4 rounded-md w-36'>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Text className='text-center text-white font-["gothici-Bold"]'>BACK</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className='item-center bg-primary p-2 mt-4 rounded-md w-36'>
                                        <TouchableOpacity onPress={() => navigation.navigate("QuoteConfirm")} >
                                            <Text className='text-center text-white font-["gothici-Bold"]'>NEXT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </ScrollView>
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
                        {coverNotes.map((i: any) =>
                            <View key={i.description}>
                                <Text className='text-center mt-1 mb-1 font-[gothici-Bold]'>{i.description}</Text>
                                {i.coverNoteItems.map((item: any) =>
                                    <Text key={item.name}>{item.name}</Text>
                                )}
                            </View>
                        )}
                    </View>
                </ModalContent>
            </BottomModal>
        </Fragment>


    )
}

export default QuoteBenefit;