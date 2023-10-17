import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { projectImages } from '../../Component/util'
import HomeCss from '../HomeCss'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../Component/Header'
import { Ionicons } from "@expo/vector-icons"

const ClaimSuccess = () => {
    const navigation: any = useNavigation()
    return (
        <View>
            <Header
                label={"Claim Submitted"}
                leftButton={{
                    child: <Ionicons name="arrow-back" size={24} color="black" />,
                    onPress: () => { navigation.goBack() }
                }}
            />
            <View className=' bg-ncba1 p-2'>
                <Text className='font-[gothici-Bold]'>All documents have been received successfully.
                    A staff will get back to you on progress of your claim.</Text>
            </View>
            <Image
                source={projectImages?.claimsuccess}
                style={HomeCss.homeImage}
            />
        </View>
    )
}

export default ClaimSuccess

const styles = StyleSheet.create({})