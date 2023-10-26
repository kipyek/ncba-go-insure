import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import HomeCss from '../HomeCss';
import { Header } from '../../Component/Header';
import StepperComponet from '../../Component/StepperComponet';
import Humanize from 'humanize-plus';
import { BottomModal, ModalContent } from 'react-native-modals';
import { useNavigation } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { apis } from '../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userData from '../../Component/UserData';


const RenewBenefit = ({ route }: any) => {
    let { item, benefits } = route?.params

    const navigation: any = useNavigation();

    const [listData, setListData] = useState([])
    const [listDatas, setListDatas] = useState(Object)
    const [coverNotes, setCoverNotes] = useState([]);
    const [selectedBenefits, setSelectedBenefits] = useState([])
    const [allBenefits, setAllBenefits] = useState<any>([])
    const [addedBenefits, setAddedBenefits] = useState(Object)
    const [currentSelected, setCurrentSelected] = useState(Object)
    const [selectKey, setSelectKey] = useState(Math.random())
    const [show, setShow] = useState(false);
    const [unify, setUnify] = useState(item);
    const [selection, setSelection] = useState(benefits);
    const [modalVisibles, setModalVisibles] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const levy = (unify.stampDuty) + (unify?.trainingLevy) + (unify?.phcf)


    useEffect(() => {
        handleNotes()
    }, []);

    useEffect(() => {
        setSelectedBenefits([])
        let bens: any = [];
        selection.forEach((element: any) => {

            if (element.benefitId === currentSelected.benefitId) {
                element = currentSelected
            }

            if (element.checked) {
                let benefit = {
                    "benefit": element.benefitName,
                    "benefitId": element.benefitId,
                    "noOfInsured": 0,
                    "premium": 0
                }

                bens.push(benefit)

            }
        })
        setSelectedBenefits(bens)
        setSelection(selection)

    }, [selectKey])

    useEffect(() => {
        handleAddBenefit()
    }, [selectedBenefits])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('RenewQuoteDatas');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    setListDatas(parsedData)
                    //console.log("outgoing data", parsedData)
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('motorQuote');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    setListData(parsedData)
                    //console.log("incoming data", parsedData)
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }
        fetchData()
    }, []);



    const handleToggle = (item: any) => {
        item.checked = !item.checked
        setCurrentSelected(item)
        setSelectKey(Math.random())


    }

    const handleAddBenefit = () => {
        const payload = {
            "productId": item?.productId,
            "policyPeriod": 12,
            "basicPremium": item?.basicPremium,
            "sumInsured": item?.sumInsured,
            "capacity": listDatas?.capacity,
            "quoteType": listDatas?.quoteType,
            "additionalBenefits": selectedBenefits
        }
        apis.post("Common/AddBenefits", payload)
            .then(response => {
                const data = response.data
                const datas = data.additionalBenefits
                setAllBenefits(datas)
                setAddedBenefits(data)
                setUnify(data)
                console.log("Add benefits", data)
            }).catch(error => {
                console.log("error", error.response?.data?.message)
            })
    }

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


    const Item = ({ item }: any) => (
        <View className='pl-1 pr-1'>
            <TouchableOpacity onPress={() => handleToggle(item)} key={item.benefitId}>
                <View className='bg-gray-200 mt-2'>
                    <View className='flex-1 flex-row justify-between  '>
                        <Text className='text-center font-["gothici-Bold"]'>{item?.benefitName}</Text>



                        <View className=''>
                            {item.checked == true ?
                                <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" />
                                :
                                <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                            }
                        </View>
                    </View>
                    <View>
                        {allBenefits.map((i: any) => (
                            <View>
                                {item.benefitId === i.benefitId &&
                                    <View>
                                        <Text>Premium: {i.premium}</Text>
                                    </View>}
                            </View>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );

    return (
        <Fragment>
            <View>
                <Header
                    label={"Get Quote"}
                    leftButton={{
                        child: <Ionicons name="arrow-back" size={24} color="black" />,
                        onPress: () => { navigation.goBack() }
                    }}
                />
                <ScrollView>
                    <View className='mb-52'>
                        <View style={HomeCss.introCard}>
                            <Text className='font-[gothici-Regular]'>Please review the details of your quote including the scope of the cover under Cover Summary. To buy the cover, click "NEXT"</Text>
                        </View>

                        {/**Start of Applicable Benefits */}
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            className='flex-row justify-between bg-gray-200 ml-4 mr-4 pl-1 pr-1'>
                            <Text className='font-[gothici-Bold]'>Click here to see applicable benefits</Text>
                            {!show ?
                                <Entypo name="chevron-small-up" size={24} color="black" />
                                :
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            }
                        </TouchableOpacity>

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
                                    <Text className='font-bold ml-14'>Kes {Humanize.formatNumber(unify?.extensions, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text>Total premium:</Text>
                                    <Text className='font-bold ml-2'>Kes {Humanize.formatNumber(item?.totalPremium, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text>Levies:</Text>
                                    <Text className='font-bold ml-16'>Kes {Humanize.formatNumber(levy, 2)}</Text>
                                </View>
                                <View className='flex-row mt-2 justify-between bg-gray-200'>
                                    <Text className='font-bold '>Gross premium:</Text>
                                    <Text className='font-bold ml-2'>Kes {Humanize.formatNumber(unify.grossPremium, 2)}</Text>
                                </View>

                                <View className='flex-row justify-between mt-4'>
                                    <View className='item-center bg-primary p-2 mt-4 rounded-md w-36'>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Text className='text-center text-white font-["gothici-Bold"]'>BACK</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className='item-center bg-primary p-2 mt-4 rounded-md w-36'>
                                        <TouchableOpacity onPress={() => navigation.navigate("RenewConfirm", { item: item, addedBenefits: addedBenefits, allBenefits: allBenefits })} >
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

            {/**Applicable Benefits */}
            <BottomModal
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(false)}
                onHardwareBackPress={() => true}
                onSwipeOut={() => setModalVisible(false)}
            >
                <ModalContent>
                    <View style={{ borderWidth: 1, width: 50, alignSelf: 'center', marginBottom: 12, borderColor: 'gray' }} />
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className='justify-end items-center self-end mb-2 bg-primary rounded-full w-10 p-2'
                    >
                        <Text className='text-white'>Ok</Text>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            data={selection}
                            renderItem={({ item }) => <Item item={item} />}
                            keyExtractor={(item: any) => item.benefitId}
                        />
                    </View>
                </ModalContent>
            </BottomModal>
        </Fragment>


    )
}

export default RenewBenefit;