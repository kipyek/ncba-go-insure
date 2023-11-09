//This is one of the custom tabs
import { Text, TouchableOpacity, View, ScrollView, Platform, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { Box } from '../../Component/Theme';
import HomeCss from '../HomeCss';
import * as ImagePicker from 'expo-image-picker';
import { BottomModal, ModalContent } from 'react-native-modals';
import * as DocumentPicker from 'expo-document-picker';
import userData from '../../Component/UserData';
import { apis } from '../../Services';
import { Ionicons } from "@expo/vector-icons"
import { cacheDirectory, copyAsync, getInfoAsync, makeDirectoryAsync, EncodingType, readAsStringAsync } from 'expo-file-system';
import { Header } from '../../Component/Header';
import { useNavigation } from '@react-navigation/native';
import apiHeaders from '../../Component/apiHeaders';



const ClaimsDocumentsScreen = ({ route }: any) => {
    const { item, id } = route.params;
    const doc = item?.documents
    const headers = apiHeaders()
    const navigation: any = useNavigation()
    const activeUser = userData()
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [selectedFile, setSelectedFile] = useState(Object);
    const [updatedDocs, setUpdatedDocs] = useState(doc);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    useEffect(() => {
        handleClaimDetails()
    }, [])

    const document = updatedDocs

    const handleOptions = (i: any) => {
        setModalVisible(true)
        setSelectedFile(i)
        setSelectedDoc(null)
    }

    const handleClaimDetails = () => {
        setVisible(true)
        apis.get(`Claims/ClaimDetails?id=${id}`, {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data.documents
                setUpdatedDocs(data)
                const hasNullContent = data.some((i: any) => i.fileName === null);
                if (hasNullContent === false) {
                    navigation.navigate("ClaimSuccess")
                }
                console.log("checking null", hasNullContent)
            })
            .catch(error => {
                console.log(error.response.data.message)
            }).finally(() => {
                setVisible(false)
            })
    }

    //converting to base64
    async function convertUriToBase64(uri: any, result: any) {
        if (Platform.OS === 'ios') {
            const response = await fetch(uri);
            const blob = await response.blob();
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(blob);
            });
            return base64;
        } else if (Platform.OS === 'android') {
            const base64 = await readAsStringAsync(uri, { encoding: EncodingType.Base64 });

            const payload = {
                "docName": base64,
                "docId": result.name,
                "fileName": selectedFile.documentType,
                "fileId": selectedFile.id
            };
            handleDocUpload(payload)
            return base64;

        }
    }

    {/**With the uri provided by documentSelection.uri I am copying the file with the name (documentSelection.name) to a cache directory: */ }
    const createCacheFile = async (result: any) => {
        if (!(await getInfoAsync(cacheDirectory + "uploads/")).exists) {
            await makeDirectoryAsync(cacheDirectory + "uploads/");
        }
        const cacheFilePath = cacheDirectory + "uploads/" + result.name;
        await copyAsync({ from: result.uri, to: cacheFilePath });
        return cacheFilePath;
    }

    const pickImage = async () => {
        let result: any = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
        });
        const file = await createCacheFile(result);
        convertUriToBase64(file, result)

        setModalVisible(false)

    };

    const handleCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: false,
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            let uri = result.assets[0].uri

            const lastItem = uri.substring(uri.lastIndexOf('/') + 1)

            const payload = {
                "docName": result.assets[0].base64,
                "docId": lastItem,
                "fileName": selectedFile.documentType,
                "fileId": selectedFile.id
            };
            handleDocUpload(payload)
            setModalVisible(false)
            setUploaded(!uploaded)
        }
    }


    const handleDocUpload = (items: any) => {
        setVisible(true)
        const payload = {
            "documentRefId": items.fileId,
            "documentName": items.fileName,
            "fileName": items.docId,
            "fileContent": items.docName
        }
        apis.post("Claims/UploadClaimDocument", payload, {
            headers: {
                "SecurityToken": headers.securityToken,
                "UserSessionId": headers.sessionId,
            },
        })
            .then(response => {
                const data = response.data
                handleClaimDetails()
                console.log("Submiting....", data)
                // navigation.navigate("QuoteDetails", { item: data })
            }).catch(error => {
                console.log(error.response?.data?.message)
            }).finally(() => {
                handleClaimDetails()
                setVisible(false)
            })
    }

    const Item = ({ i }: any) => {
        return (
            <Box className='mt-1 ml-4 mr-4'>

                <View style={HomeCss.container1} className='mt-2 ' key={i.id}>
                    {i.fileName !== null &&
                        <View>
                            <Text className='text-center'>{i.documentType}</Text>
                            <Text className='text-center'>Uploaded</Text>
                        </View>
                    }

                    {i.fileName === null &&
                        <View style={HomeCss.uploadBtnContainer1}>

                            {selectedFile.documentType === i.documentType && visible ?
                                < Text className='text-center text-2xl'> Loading...</Text>
                                :
                                <TouchableOpacity onPress={() => handleOptions(i)} style={HomeCss.uploadBtn} >
                                    <Text className='font-[gothici-Regular]'>{i.documentType}</Text>
                                    <AntDesign name="plus" size={20} color="black" />
                                </TouchableOpacity>
                            }
                        </View>
                    }
                </View>

            </Box>
        )
    }

    return (
        <Fragment>
            <View>
                <Header
                    label="Claims Documents"
                    leftButton={{
                        child: <Ionicons name="arrow-back" size={24} color="black" />,
                        onPress: () => { navigation.goBack() }
                    }}
                />
                <View className=' mt-2'>
                    <Text className='font-[gothici-Regular] mr-4 ml-4'>Upload all required documents first before you can proceed to next steps</Text>
                    <View className='flex-1 justify-center items-center mt-6'>
                        {document.length < 1 &&
                            <ActivityIndicator size="large" color="#00BFFF" />
                        }
                    </View>

                    <FlatList
                        data={document}
                        renderItem={({ item }) => <Item i={item} />}
                        keyExtractor={(item: any) => item.documentRefId}
                    //contentContainerStyle={{ paddingBottom: 200 }}
                    // ListFooterComponent={<View style={{ height: Dimensions.get('window').height }}></View>}
                    />

                </View>
            </View>

            <BottomModal
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(false)}
                onHardwareBackPress={() => true}
                onSwipeOut={() => setModalVisible(false)}
            >
                <ModalContent>
                    <View style={{ borderWidth: 1, width: 50, alignSelf: 'center', marginBottom: 12, borderColor: 'gray' }} />

                    <View>
                        {/**All data here */}
                        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                            <TouchableOpacity onPress={() => pickImage()}>
                                <Text className='text-center text-white font-["gothici-Bold"]'>Upload Document</Text>
                            </TouchableOpacity>
                        </View>
                        {/**All data here */}
                        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                            <TouchableOpacity onPress={() => handleCamera()}>
                                <Text className='text-center text-white font-["gothici-Bold"]'>Open Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalContent>
            </BottomModal>
        </Fragment>
    )
}

export default ClaimsDocumentsScreen;