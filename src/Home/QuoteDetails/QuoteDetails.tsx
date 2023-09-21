import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Header } from '../../Component/Header';
import { Feather } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import QDetails from './QDetails';
import PaymentScreen from './PaymentScreen';
import { useNavigation } from '@react-navigation/native';
import DocScreen from './DocScreen';

const QuoteDetails = () => {
    const navigation: any = useNavigation()
    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(true)
    const [moves, setMoves] = useState(0)

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    const handleQDetails = () => {
        setMoves(1)
        hideMenu()
    }
    const handlePayments = () => {
        setMoves(2)
        hideMenu()
    }

    return (
        <View>
            <Header
                label={moves === 2 ? "Payments" : "Quote Details"}
                rightButton={{
                    child: <Feather
                        name="more-vertical"
                        size={24} color="black"
                        onPress={() => showMenu()}
                    />
                }}
            />

            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Menu
                    visible={visible}
                    onRequestClose={hideMenu}
                    style={{}}
                >
                    {!show && <MenuItem onPress={() => hideMenu()}>UPLOAD DOCUMENTS</MenuItem>}
                    <MenuItem onPress={() => handleQDetails()} >QUOTE DETAILS</MenuItem>
                    {show && <MenuItem onPress={() => handlePayments()}>PAYMENTS</MenuItem>}
                </Menu>
            </View>

            {
                moves === 1 ?
                    <QDetails />
                    :
                    moves === 2 ?
                        <PaymentScreen />
                        :
                        <DocScreen />
            }


        </View>
    )
}

export default QuoteDetails

const styles = StyleSheet.create({})