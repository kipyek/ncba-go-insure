import { ActivityIndicator, FlatList, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import PPaymentComponent from '../../Component/PPaymentComponent'
import apiHeaders from '../../Component/apiHeaders'
import { apis } from '../../Services'
import userData from '../../Component/UserData'
import Humanize from 'humanize-plus';

const PPayment = () => {
    const headers = apiHeaders();
    const activeUser = userData();
    const [pending, setPending] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false)

    useEffect(() => {
        handlePendingPayment()
    }, [])

    useEffect(() => {
        handlePendingPayment()
    }, [activeUser?.userId])

    const handlePendingPayment = async () => {
        setIsLoading(true)
        await apis.get("Common/PendingPayments?isAgent=false", {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data
                data.sort((a: any, b: any) => b.id - a.id);
                setPending(data)
            }).catch(error => {
                console.log(error.response.data)
            }).finally(() => {
                setIsLoading(false)
            })
    }



    const Item = ({ item }: any) => {
        return (
            <PPaymentComponent
                description={item?.description}
                DNumber={item?.noteNo}
                PNumber={item?.policy?.policyID}
                IssuedDate={item?.dateIssued}
                RId={item?.policy?.registrationNumber}
                AOustanding={Humanize.formatNumber(item?.outstanding)}
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

            {isLoading &&
                <ActivityIndicator size="large" color="#00BFFF" />
            }

            {pending &&
                <FlatList
                    data={pending}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item: any) => item.id}
                //contentContainerStyle={{ paddingBottom: 200 }}
                //    ListFooterComponent={<View style={{ height: Dimensions.get('window').height }}></View>}
                />
            }

        </View>
    )
}

export default PPayment;