import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from '../../Component/Header';
import { Feather } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import QDetails from './QDetails';
import PaymentScreen from './PaymentScreen';
import { useNavigation } from '@react-navigation/native';
import DocScreen from './DocScreen';
import apiHeaders from '../../Component/apiHeaders';
import { apis } from '../../Services';
import userData from '../../Component/UserData';

const QuoteDetails = ({ route }: any) => {
    const { item } = route.params
    const headers = apiHeaders();
    const activeUser = userData()
    const document = item.documents
    const navigation: any = useNavigation()
    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(false)
    const [moves, setMoves] = useState(1)
    const [selectedDoc, setSelectedDoc] = useState<any>(null)
    const [selected, setSelected] = useState([])

    useEffect(() => {
        fetch()
    }, [activeUser?.userId, item])

    // useEffect(() => {
    //     //fetchDifference()
    // }, [selectedDoc])

    const fetchDifference = () => {
        const documents = selectedDoc?.documents
        const isBelowThreshold = (currentValue: any) => currentValue.fileName === null;
        console.log(documents.some(isBelowThreshold));
    }

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    const fetch = async () => {
        await apis.get(`Common/GetQuote?quoteId=${item?.id}`, {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data
                setSelectedDoc(data)
                console.log("Main screen data")
            }).catch(error => {
                console.log(error.response)
            })
    }

    const handleDocument = () => {
        fetch()
        setMoves(0)
        hideMenu()

    }

    const handleQDetails = () => {
        fetch()
        setMoves(2)
        hideMenu()
    }
    const handlePayments = () => {
        setMoves(1)
        hideMenu()
    }


    return (
        <View className='flex-1'>
            <Header
                label={moves === 1 ? "Payments" : moves === 2 ? "Quote Details" : "Upload Documents"}
                rightButton={{
                    child: <Feather
                        name="more-vertical"
                        size={24}
                        color="black"
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

                    <MenuItem onPress={() => handleQDetails()} >QUOTE DETAILS</MenuItem>
                    {!show && <MenuItem onPress={() => handlePayments()}>PAYMENTS</MenuItem>}
                </Menu>
            </View>

            {
                moves === 1 ?
                    <PaymentScreen item={item} />
                    :
                    <QDetails item={selectedDoc} />
            }


        </View>
    )
}

export default QuoteDetails