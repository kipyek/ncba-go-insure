import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import APolicies from '../../Component/APolicies'
import userData from '../../Component/UserData'
import { apis } from '../../Services'
import apiHeaders from '../../Component/apiHeaders'
import Humanize from 'humanize-plus';

const ActivePolicies = () => {
    const activeUser = userData();
    const headers = apiHeaders();
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState<any>(null)

    useEffect(() => {
        handleActiveQuote()
    }, [activeUser.userId])

    const handleActiveQuote = async () => {
        setVisible(true)
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
                //console.log("I am re-rendering", data)
            }).catch(error => {
                console.log(error.response.data)
            }).finally(() => {
                setVisible(false)
            })
    }

    const Item = ({ item }: any) => {
        const outStanding = (item.grossPremium) - (item.paidAmount)
        return (
            <APolicies
                Cdate={item.commencementDate}
                Product={item.productName}
                Insurer={item.insurer}
                Reg={item.registrationNumber}
                Edate={item.expiryDate}
                Sinsured={Humanize.formatNumber(item.sumInsured, 2)}
                Gross={Humanize.formatNumber(item.grossPremium, 2)}
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
            <FlatList
                data={active}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item: any) => item.quotationNo}
            //contentContainerStyle={{ paddingBottom: 200 }}
            //    ListFooterComponent={<View style={{ height: Dimensions.get('window').height }}></View>}
            />

        </View>
    )
}

export default ActivePolicies;