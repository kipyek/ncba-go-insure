import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { BottomModal, ModalContent } from 'react-native-modals';
import { Header } from '../../Component/Header';
import { Button } from '@rneui/themed';

const Profile = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [userData, setUserData] = useState(Object);
  const [userId, setUserId] = useState('')
  const [currentPass, setCurrentPassword] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPass, setConfirmPass] = useState('')
  const [userName, setUserName] = useState('')
  const [location, setLocation] = useState('')

  return (
    <Fragment>
      <View className='flex-1 bg-white'>
        <Header
          label="Profile"
        />
        <View className='mt-4 mx-4 flex-1 justify-center'>
          <Image source={require("../../../assets/profile.jpg")}
            className='w-36 h-36 rounded-full self-center mb-4'
          />

          <View className='bg-gray-100 p-2 rounded-md justify-between flex-row'>
            <View>
              <Text className='text-sm font-semibold text-gray-300 ml-2'>Email</Text>
              <Text className='text-base font-bold text-gray-500 ml-2'>d.kipyek@gmail.com</Text>
            </View>
            <Feather name="edit-3" size={24} color="black"
              style={{ alignSelf: 'center' }}
              onPress={() => setModalVisible(true)}
            />

          </View>

          <View className='bg-gray-100 p-2 rounded-md my-2 flex-row justify-between'>
            <View >
              <Text className='text-sm font-semibold text-gray-300 ml-2'>Phone Number</Text>
              <Text className='text-base font-bold text-gray-500 ml-2'>0712345678</Text>
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
              <Text className='text-sm font-semibold ml-2'>Change Password</Text>
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
            onPress={() => { }}
          >
            <MaterialIcons name="logout" size={24} color="red" />
            <Text className='font-bold text-lg ml-2 text-red-400'>Logout</Text>
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
            //defaultValue={userData.userName}
            onChangeText={(text) => setUserName(text.trim())}
          />
          <View className='bottom-2 mt-2'>
            <View className='item-center bg-[#302A29] p-3 mt-4 rounded-md '>
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
            //defaultValue={userData.location}
            onChangeText={(text) => setLocation(text.trim())}
          />
          <View className='bottom-2 mt-2'>
            <View className='item-center bg-[#302A29] p-3 mt-4 rounded-md '>
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
          <TextInput
            className='border-2 h-10 rounded-xl px-2 mb-2'
            placeholder="Current Password"
            keyboardType="default"
            //defaultValue={userData.location}
            onChangeText={(text) => setCurrentPassword(text.trim())}
          />
          <TextInput
            className='border-2 h-10 rounded-xl px-2 mb-2'
            placeholder="New Password"
            keyboardType="default"
            //defaultValue={userData.location}
            onChangeText={(text) => setPassword(text.trim())}
          />
          <TextInput
            className='border-2 h-10 rounded-xl px-2'
            placeholder="Confirm new password"
            keyboardType="default"
            //defaultValue={userData.location}
            onChangeText={(text) => setConfirmPass(text.trim())}
          />
          <View className='bottom-2 mt-2'>
            <View className='item-center bg-[#302A29] p-3 mt-4 rounded-md '>
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