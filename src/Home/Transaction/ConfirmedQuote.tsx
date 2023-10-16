import { Dimensions, FlatList, TextInput, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CQuote from '../../Component/CQuote'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import apiHeaders from '../../Component/apiHeaders'
import { apis } from '../../Services'
import userData from '../../Component/UserData'
import Humanize from 'humanize-plus';

const ConfirmedQuote = () => {
    const navigation: any = useNavigation();
    const headers = apiHeaders();
    const activeUser = userData();
    console.log(headers)
    const [visible, setVisible] = useState(false);
    const [confirmedQuotes, setConfirmedQuotes] = useState([])

    useEffect(() => {
        handleConfirmQuote()
    }, [activeUser.userId])

    const handleConfirmQuote = async () => {
        setVisible(true)
        await apis.get("Common/MyQuotes?isAgent=false", {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })

            .then(response => {
                const data = response.data
                data.sort((a: any, b: any) => b.id - a.id);
                setConfirmedQuotes(data)
                //console.log("I am re-rendering", sorted)
            }).catch(error => {
                console.log(error.response.data)
            }).finally(() => {
                setVisible(false)
            })
    }


    const Item = ({ item }: any) => {
        const outStanding = (item.grossPremium) - (item.paidAmount)
        return (
            <CQuote
                Quote={item.quotationNo}
                Product={item.product}
                Insurer={item.insurer}
                Reg={item.registrationNo}
                Gross={`Kes ${Humanize.formatNumber(item.grossPremium, 2)}`}
                Amount={`Kes ${Humanize.formatNumber(item.paidAmount, 2)}`}
                Oustanding={`Kes ${Humanize.formatNumber(outStanding, 2)}`}
                onPress={() => { }} //It should have id of particular details
            />

        )
    }

    return (
        <View className='flex-1'>
            <StatusBar backgroundColor='#87CEEB' />
            <View className='mr-4 ml-4 mt-2'>
                <TextInput
                    style={{
                        height: 40,
                        borderRadius: 10,
                        paddingLeft: 20,
                        marginBottom: 10,
                        backgroundColor: 'grey',
                    }}
                    //   onChangeText={(text) => {
                    //     searchFilterFunction(text)
                    //     UpdateSearch(text)
                    //   }}
                    //value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search by Quote No"
                />

            </View>
            <FlatList
                data={confirmedQuotes}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item: any) => item.quotationNo}
            //contentContainerStyle={{ paddingBottom: 200 }}
            //    ListFooterComponent={<View style={{ height: Dimensions.get('window').height }}></View>}
            />

        </View>
    )
}

export default ConfirmedQuote;