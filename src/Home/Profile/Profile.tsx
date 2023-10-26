import { View, Text, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React, { useState, Fragment } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { BottomModal, ModalContent } from 'react-native-modals';
import { Header } from '../../Component/Header';
import { Button } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import userData from '../../Component/UserData';
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Profile = () => {
  const navigation: any = useNavigation();
  const activeUser = userData()
  const [email, setEmail] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [userId, setUserId] = useState('')
  const [currentPass, setCurrentPassword] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPass, setConfirmPass] = useState('')
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPasswordShown, setIsPasswordShown] = useState(true);



  const handleSuccess = () => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Authentication' },
      ],
    }))
  }

  return (
    <Fragment>
      <View className='flex-1 bg-white'>
        <StatusBar backgroundColor='#87CEEB' />
        <Header
          label="Profile"
        />
        <View className='mt-4 mx-4 flex-1 justify-center'>
          <Image source={require("../../../assets/profile.jpg")}
            className='w-36 h-36 rounded-full self-center mb-4'
          />

          <View className='bg-gray-100 p-2 rounded-md justify-between flex-row'>
            <View>
              <Text className='text-sm font-[gothici-Regular] text-gray-300 ml-2'>Email</Text>
              <Text className='text-base font-[gothici-Bold] text-gray-500 ml-2'>{activeUser?.userEmail}</Text>
            </View>
            <Feather name="edit-3" size={24} color="black"
              style={{ alignSelf: 'center' }}
              onPress={() => setModalVisible(true)}
            />

          </View>

          <View className='bg-gray-100 p-2 rounded-md my-2 flex-row justify-between'>
            <View >
              <Text className='text-sm font-[gothici-Regular] text-gray-300 ml-2'>Phone Number</Text>
              <Text className='text-base font-[gothici-Bold] text-gray-500 ml-2'>{activeUser?.userPhone}</Text>
            </View>
            <Feather
              name="edit-3"
              size={24}
              color="black"
              style={{ alignSelf: 'center' }}
              onPress={() => setModalVisibles(true)}
            />
          </View>

          <TouchableOpacity
            className='bg-gray-100 p-2 rounded-md my-2 flex-row justify-between'
            onPress={() => setModalPassword(true)}
          >
            <View >
              <Text className=' text-base ml-2 font-[gothici-Bold]'>Change Password</Text>
            </View>
            <Feather
              name="chevron-right"
              size={24}
              color="black"
              style={{ alignSelf: 'center' }}

            />


          </TouchableOpacity>
          <TouchableOpacity
            className='bg-gray-100 p-2 rounded-md my-2 items-center flex-row'
            onPress={handleSuccess}
          >
            <MaterialIcons name="logout" size={24} color="red" />
            <Text className='text-base ml-2 text-red-400 font-[gothici-Bold]'>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
      {/* Update Email*/}
      <BottomModal
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        onHardwareBackPress={() => true}
        onSwipeOut={() => setModalVisible(false)}
      >
        <ModalContent>
          <TextInput
            className='border-2 h-10 rounded-xl px-2'
            placeholder="Enter preferred email"
            keyboardType="default"
            defaultValue={`${activeUser.userEmail}`}
            onChangeText={(text) => setEmail(text.trim())}
          />
          <View className='bottom-2 mt-2'>
            <View className='item-center bg-primary p-3 mt-4 rounded-md '>
              <TouchableOpacity>
                <Text className='text-center text-white font-["gothici-Bold"]'>CHANGE EMAIL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalContent>
      </BottomModal>

      {/* Update Phone*/}
      <BottomModal
        visible={modalVisibles}
        onTouchOutside={() => setModalVisibles(false)}
        onHardwareBackPress={() => true}
        onSwipeOut={() => setModalVisibles(false)}
      >
        <ModalContent>
          <TextInput
            className='border-2 h-10 rounded-xl px-2'
            placeholder="Phone Number"
            keyboardType="default"
            defaultValue={`${activeUser?.userPhone}`}
            onChangeText={(text) => setPhone(text.trim())}
          />
          <View className='bottom-2 mt-2'>
            <View className='item-center bg-primary p-3 mt-4 rounded-md '>
              <TouchableOpacity>
                <Text className='text-center text-white font-["gothici-Bold"]'>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalContent>
      </BottomModal>

      {/**Change Password */}
      <BottomModal
        visible={modalPassword}
        onTouchOutside={() => setModalPassword(false)}
        onHardwareBackPress={() => true}
        onSwipeOut={() => setModalPassword(false)}
      >
        <ModalContent>

          {/**Current Password */}
          <View>
            <View className=' rounded-md mt-2 flex-row justify-between'
              style={{ borderWidth: 1 }}>
              <TextInput
                style={{ width: Dimensions.get('window').width / 1.27, paddingVertical: 4 }}
                secureTextEntry={isPasswordShown}
                className='px-2'
                placeholder="Current password"
                keyboardType="default"
                onChangeText={(text) => setCurrentPassword(text.trim())}
              />
              <MaterialCommunityIcons name={isPasswordShown ? "eye-off" : "eye"} size={28} color={"black"}
                onPress={() => { isPasswordShown ? setIsPasswordShown(false) : setIsPasswordShown(true) }}
                style={{ paddingVertical: 5 }} />
            </View>
          </View>

          {/**New Password */}
          <View>
            <View className=' rounded-md mt-2 flex-row justify-between'
              style={{ borderWidth: 1 }}>
              <TextInput
                style={{ width: Dimensions.get('window').width / 1.27, paddingVertical: 4 }}
                secureTextEntry={isPasswordSecure}
                className='px-2'
                placeholder="New password"
                keyboardType="default"
                //defaultValue={userData.location}
                onChangeText={(text) => setConfirmPass(text.trim())}
              />
              <MaterialCommunityIcons name={isPasswordSecure ? "eye-off" : "eye"} size={28} color={"black"}
                onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                style={{ paddingVertical: 5 }} />
            </View>
          </View>

          {/**Confirm New Password */}
          <View>
            <View className=' rounded-md mt-2 flex-row justify-between'
              style={{ borderWidth: 1 }}>
              <TextInput
                style={{ width: Dimensions.get('window').width / 1.27, paddingVertical: 4 }}
                secureTextEntry={isPasswordSecure}
                className='px-2'
                placeholder="Confirm new password"
                keyboardType="default"
                //defaultValue={userData.location}
                onChangeText={(text) => setConfirmPass(text.trim())}
              />
              <MaterialCommunityIcons name={isPasswordSecure ? "eye-off" : "eye"} size={28} color={"black"}
                onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                style={{ paddingVertical: 5 }} />
            </View>
          </View>


          <View className='bottom-2 mt-2'>
            <View className='item-center bg-primary p-3 mt-4 rounded-md '>
              <TouchableOpacity>
                <Text className='text-center text-white font-["gothici-Bold"]'>UPDATE PASSWORD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </Fragment>
  )
}

export default Profile