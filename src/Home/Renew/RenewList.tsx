import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Header } from '../../Component/Header'
import Humanize from 'humanize-plus';
import HomeCss from '../HomeCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { apis } from '../../Services';
import { useSelector } from 'react-redux';
import { selectCapacity, selectFirstTime } from '../../../Slices/QuoteSlice';
import { Ionicons } from "@expo/vector-icons"

const RenewList = () => {
    const navigation: any = useNavigation()
    const [listData, setListData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('RenewMotorQuotes');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    setListData(parsedData)
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }
        fetchData()
    }, [])



    const handleApplicableBenefits = (item: any) => {
        apis.get(`Common/GetApplicableBenefits?productId=${item.productId}`)
            .then(response => {
                let data = response.data
                data.forEach((element: any) => {
                    element.checked = false
                });
                navigation.navigate("RenewBenefit", { item: item, benefits: data })
            }).catch(error => {
                console.log("Error", error.response?.data?.message)
            })
    }

    const Item = ({ item }: any) => (
        <View style={HomeCss.listCard} className='ml-3 mr-3 mb-1 mt-2'>
            <TouchableOpacity onPress={() => handleApplicableBenefits(item)}>
                <View className='flex-row items-center'>
                    <Image source={{ uri: item.insurerLogo }} className='w-28 h-28' resizeMode='contain' />
                    <View className='w-48 ml-4'>
                        <Text>Insurance company:</Text>
                        <Text className='font-[gothici-Bold]'>{item.insurerName}</Text>
                        <View className='flex-row mt-2'>
                            <Text>Premium: </Text>
                            <Text className='font-[gothici-Bold]'> {Humanize.formatNumber(item.grossPremium, 2)}</Text>
                        </View>
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

                <FlatList
                    data={listData}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item: any) => item.productId}
                    ListFooterComponent={<View style={{ height: 100 }}></View>}
                />
            </View>


        </Fragment>
    )
}

export default RenewList

const styles = StyleSheet.create({})