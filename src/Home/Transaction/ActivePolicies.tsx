import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import APolicies from '../../Component/APolicies'
import userData from '../../Component/UserData'
import { apis } from '../../Services'
import apiHeaders from '../../Component/apiHeaders'
import Humanize from 'humanize-plus';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Moment from 'moment';


const ActivePolicies = () => {
    const navigation: any = useNavigation()
    const headers = apiHeaders();
    const isFocused = useIsFocused();
    const activeUser = userData();
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState([])

    useEffect(() => {
        handleActiveQuote()
    }, [])

    useEffect(() => {
        handleActiveQuote()
    }, [activeUser.userId])

    const handleActiveQuote = async () => {
        await apis.get("Common/MyPolicies?isAgent=false", {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data
                data.sort((a: any, b: any) => b.id - a.id);
                setActive(data)
            }).catch(error => {
                console.log(error.response.data)
            })
    }

    const Item = ({ item }: any) => {
        const outStanding = (item.grossPremium) - (item.paidAmount)
        return (
            <APolicies
                Cdate={Moment(item?.commencementDate).format('Do MMMM YYYY')}
                Product={item.productName}
                Insurer={item.insurer}
                Reg={item.registrationNumber}
                Edate={Moment(item.expiryDate).format('Do MMMM YYYY')}
                Sinsured={Humanize.formatNumber(item.sumInsured, 2)}
                Gross={Humanize.formatNumber(item.grossPremium, 2)}
                ClaimClicked={() => alert(item.productId)}
                UploadClicked={() => alert("upload valuation")}
                RenewClicked={() => navigation.navigate("RenewRequest", { item: item })}
            />

        )
    }

    return (
        <View className='flex-1'>
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
                    placeholder="Enter text to search"
                />
            </View>


            {active.length < 1 &&
                <ActivityIndicator size="large" color="#00BFFF" />
            }

            {active &&
                <FlatList
                    data={active}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item: any) => item.productId}
                //contentContainerStyle={{ paddingBottom: 200 }}
                //    ListFooterComponent={<View style={{ height: Dimensions.get('window').height }}></View>}
                />
            }

        </View>
    )
}

export default ActivePolicies;