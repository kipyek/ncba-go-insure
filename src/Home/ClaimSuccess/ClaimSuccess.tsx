import { StyleSheet, Text, View, ImageBackground } from 'react-native'
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
                    onPress: () => { navigation.navigate("Main") }
                }}
            />
            <ImageBackground
                source={projectImages?.claimsuccess}
                style={HomeCss.homeImage}
                resizeMode='cover'
            >
                <View className=' bg-ncba1 p-2 mt-2 ml-4 mr-4 rounded-md'>
                    <Text className='font-[gothici-Bold]'>All documents have been received successfully.
                        Our staff will reach out to you on progress of your claim.</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default ClaimSuccess

const styles = StyleSheet.create({})