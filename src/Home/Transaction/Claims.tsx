import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ClaimComponent from '../../Component/ClaimComponent'
import { apis } from '../../Services'
import userData from '../../Component/UserData'
import apiHeaders from '../../Component/apiHeaders'
import Moment from 'moment';

const Claims = () => {
    const headers = apiHeaders();
    const activeUser = userData();
    console.log("headersactive", headers)
    const [availableClaims, setAvailableClaims] = useState([])

    useEffect(() => {
        handleClaims()
    }, [activeUser.userId])


    const handleClaims = () => {
        apis.get("Claims/ActiveClaimsClient?isAgent=false", {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data
                data.sort((a: any, b: any) => b.id - a.id);
                setAvailableClaims(data)
                console.log(availableClaims)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })

    }

    const Item = ({ item }: any) => {
        return (
            <ClaimComponent
                RNumber={item.registrationNo ? item.registrationNo : "---"}
                CNumber={item.claimNo}
                PNumber={item.policyNo ? item.policyNo : "---"}
                CDate={Moment(item.claimDate).format('Do MMMM YYYY')}
                PType={item.product}
                RLocation={item.riskLocation}
                Status={item.closureStatus}
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
                data={availableClaims}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item: any) => item.id}
            //contentContainerStyle={{ paddingBottom: 200 }}
            //    ListFooterComponent={<View style={{ height: Dimensions.get('window').height }}></View>}
            />
        </View>
    )
}

export default Claims;