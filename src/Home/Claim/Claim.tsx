import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '../../Component/Header'
import { useNavigation } from '@react-navigation/native'
import HomeCss from '../HomeCss'
import { StatusBar } from 'expo-status-bar'
import userData from '../../Component/UserData'
import { apis } from '../../Services'
import apiHeaders from '../../Component/apiHeaders'

const Claim = () => {
  const navigation: any = useNavigation();
  const activeUser = userData();
  const headers = apiHeaders();
  const [allPolicies, setAllPolicies] = useState([])


  useEffect(() => {
    handleAllPolicies()
  }, [])

  useEffect(() => {
    handleAllPolicies()
  }, [activeUser.userId])

  const handleAllPolicies = () => {
    apis.get("Common/AllMyPolicies?isAgent=false", {
      headers: {
        "SecurityToken": headers.securityToken,
        "UserSessionId": headers.sessionId,
      },
    })

      .then(response => {
        const data = response.data
        setAllPolicies(data)
      }).catch(error => {
        console.log(error.response.data)
      })
  }

  const handleMoveNext = () => {
    handleAllPolicies();
    navigation.navigate("ClaimForm", { item: allPolicies })
  }

  return (
    <View className='flex-1'>
      <StatusBar backgroundColor='#87CEEB' />
      <Header
        label="Claims"

      />
      <View className='item-center bg-primary p-4 rounded-md '>
        <TouchableOpacity onPress={() => handleMoveNext()}>
          <Text className='text-center text-white font-["gothici-Bold"]'>Click Here to Book a Claim</Text>
        </TouchableOpacity>
      </View>
      <Image source={require("../../../assets/images/claimlanding.png")} style={HomeCss.claimImage} />


    </View>

  )
}

export default Claim;