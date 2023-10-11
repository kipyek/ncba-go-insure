import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Box } from '../../Component/Theme'
import CustomTabs from '../../Component/CustomTabs';
import { CoverDetail, Documents, QuoteDetail } from '../QuoteDetailScreens';
import HomeCss from '../HomeCss';

const QDetails = (item: any) => {
    const [tabSelected, setTabSelected] = useState(1);
    const onTabSelected = (value: React.SetStateAction<number>) => {
        setTabSelected(value)
    }

    const api = item?.item.quotationNo
    const apiStatus = item?.item.status
    return (
        <View className=''>
            <View className=''>
                <View style={HomeCss.introCard} className='flex-row justify-between'>
                    <Text className='font-[gothici-Regular]' style={{ fontSize: 18 }}>Quote details ({item?.item.quotationNo})</Text>
                    <View className='bg-red-500 rounded-md p-1'>
                        <Text className='text-white font-[gothici-Bold]'>{apiStatus}</Text>
                    </View>
                </View>
                <CustomTabs
                    selectionMode={1}
                    option1="Documents"
                    option2="Cover Details"
                    option3="Quote Details"
                    onSelectSwitch={onTabSelected}

                />
                {tabSelected === 1 ? <Documents item={item} /> : tabSelected === 2 ? <CoverDetail item={item} /> : <QuoteDetail item={item} />}
            </View>
        </View>
    )
}

export default QDetails;