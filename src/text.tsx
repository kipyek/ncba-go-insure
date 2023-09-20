import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BottomModal, ModalContent } from 'react-native-modals';

const text = () => {
  const [modalVisibles, setModalVisibles] = useState(false);
  return (
    <View>
      <BottomModal
        visible={modalVisibles}
        onTouchOutside={() => setModalVisibles(false)}
        onHardwareBackPress={() => true}
        onSwipeOut={() => setModalVisibles(false)}
      >
        <ModalContent>
          <Text>This is it!!!!</Text>
        </ModalContent>
      </BottomModal>
    </View>
  )
}

export default text

const styles = StyleSheet.create({})