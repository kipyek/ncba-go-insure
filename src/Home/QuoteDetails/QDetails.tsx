import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Box } from '../../Component/Theme'
import CustomTabs from '../../Component/CustomTabs';
import { CoverDetail, Documents, QuoteDetail } from '../QuoteDetailScreens';

const QDetails = () => {
    const [tabSelected, setTabSelected] = useState(1);
    const onTabSelected = (value: React.SetStateAction<number>) => {
        setTabSelected(value)
    }

    const api = "Q01721"
    const apiStatus = "NOT PAID"
    return (
        <View className=''>
            <View className=''>
                <View style={styles.introCard} className='flex-row justify-between'>
                    <Text className='font-[gothici-Regular]' style={{ fontSize: 18 }}>Quote details ({api})</Text>
                    <View className='bg-red-500 rounded-md p-1'>
                        <Text className='text-white font-[gothici-Bold]'>{apiStatus}</Text>
                    </View>
                </View>
                <CustomTabs
                    selectionMode={1}
                    option1="Quote Details"
                    option2="Cover Details"
                    option3="Documents"
                    onSelectSwitch={onTabSelected}

                />
                {tabSelected === 1 ? <QuoteDetail /> : tabSelected === 2 ? <CoverDetail /> : <Documents />}
            </View>
        </View>
    )
}

export default QDetails

const styles = StyleSheet.create({
    introCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
})